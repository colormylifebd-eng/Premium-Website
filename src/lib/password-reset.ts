import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";
import { sendPasswordResetEmail } from "@/lib/email";

const TOKEN_TTL_MS = 30 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;

/** Only a SHA-256 hash of the token is stored, so a database leak can't be used to reset passwords. */
function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/** Emails a reset link if the address belongs to an admin. Silently does nothing otherwise. */
export async function requestPasswordReset(email: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return;

  // A link sent less than a minute ago is still valid; don't spam the inbox.
  const issuedAt = admin.resetTokenExpiry ? admin.resetTokenExpiry.getTime() - TOKEN_TTL_MS : 0;
  if (Date.now() - issuedAt < RESEND_COOLDOWN_MS) return;

  const token = randomBytes(32).toString("hex");
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { resetTokenHash: hashToken(token), resetTokenExpiry: new Date(Date.now() + TOKEN_TTL_MS) },
  });

  await sendPasswordResetEmail(admin.email, `${getSiteUrl()}/admin/reset-password?token=${token}`);
}

export async function isResetTokenValid(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return false;
  const admin = await prisma.adminUser.findFirst({
    where: { resetTokenHash: hashToken(token), resetTokenExpiry: { gt: new Date() } },
    select: { id: true },
  });
  return Boolean(admin);
}

/**
 * Sets a new password using a valid reset token. The token is single-use,
 * and bumping tokenVersion signs out every existing session.
 */
export async function resetPasswordWithToken(token: string, newPassword: string) {
  const tokenHash = hashToken(token);
  const admin = await prisma.adminUser.findFirst({
    where: { resetTokenHash: tokenHash, resetTokenExpiry: { gt: new Date() } },
    select: { id: true },
  });
  if (!admin) return false;

  const result = await prisma.adminUser.updateMany({
    where: { id: admin.id, resetTokenHash: tokenHash },
    data: {
      passwordHash: await hash(newPassword, 12),
      resetTokenHash: null,
      resetTokenExpiry: null,
      tokenVersion: { increment: 1 },
      failedLoginCount: 0,
      lockedUntil: null,
    },
  });
  return result.count === 1;
}
