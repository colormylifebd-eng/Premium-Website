import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { authConfig } from "@/auth.config";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

// bcrypt hash of a random throwaway string. Unknown emails are still checked
// against it so response time doesn't reveal which emails have accounts.
const DUMMY_HASH = "$2b$12$wOCAPYW.r3GzxFxvvBpkiu79InwsSXKGf4NNL5FIIVntFfuvFKesS";

class AccountLockedError extends CredentialsSignin {
  code = "locked";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
        token.tv = (user as { tokenVersion?: number }).tokenVersion ?? 0;
        return token;
      }
      if (!token.sub) return null;
      // A password reset bumps tokenVersion, which invalidates older sessions.
      const admin = await prisma.adminUser.findUnique({
        where: { id: token.sub },
        select: { tokenVersion: true },
      });
      if (!admin || admin.tokenVersion !== token.tv) return null;
      return token;
    },
  },
  logger: {
    error(error) {
      // A wrong password is expected behaviour, not a server error.
      if (error instanceof CredentialsSignin) return;
      console.error(error);
    },
  },
  providers: [
    Credentials({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin) {
          await compare(password, DUMMY_HASH);
          return null;
        }
        if (admin.lockedUntil && admin.lockedUntil > new Date()) throw new AccountLockedError();

        if (!(await compare(password, admin.passwordHash))) {
          const failed = admin.failedLoginCount + 1;
          const lock = failed >= MAX_FAILED_ATTEMPTS;
          await prisma.adminUser.update({
            where: { id: admin.id },
            data: {
              failedLoginCount: lock ? 0 : failed,
              lockedUntil: lock ? new Date(Date.now() + LOCK_DURATION_MS) : admin.lockedUntil,
            },
          });
          if (lock) throw new AccountLockedError();
          return null;
        }

        if (admin.failedLoginCount > 0 || admin.lockedUntil) {
          await prisma.adminUser.update({
            where: { id: admin.id },
            data: { failedLoginCount: 0, lockedUntil: null },
          });
        }
        return { id: admin.id, email: admin.email, name: admin.name, tokenVersion: admin.tokenVersion };
      },
    }),
  ],
});
