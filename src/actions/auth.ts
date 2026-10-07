"use server";

import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { requestPasswordReset, resetPasswordWithToken } from "@/lib/password-reset";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from "@/lib/validations";

export type AuthFormState = {
  error?: string;
  success?: string;
  email?: string;
  fieldErrors?: { password?: string; confirmPassword?: string };
};

const ADMIN_PATH = /^\/admin(\/|$)/;
const AUTH_PAGE = /^\/admin\/(login|forgot-password|reset-password)(\/|$)/;

/** Only allow redirects back into the admin area, never to another site. */
function safeRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value) return "/admin";
  try {
    const url = new URL(value, "http://localhost");
    if (!ADMIN_PATH.test(url.pathname) || AUTH_PAGE.test(url.pathname)) return "/admin";
    return `${url.pathname}${url.search}`;
  } catch {
    return "/admin";
  }
}

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? rawEmail : "";
  const parsed = loginSchema.safeParse({ email: rawEmail, password: formData.get("password") });
  if (!parsed.success) return { error: "সঠিক ইমেইল ও পাসওয়ার্ড লিখুন।", email };

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: safeRedirectPath(formData.get("callbackUrl")),
    });
  } catch (error) {
    if (error instanceof CredentialsSignin && error.code === "locked") {
      return {
        error: "অনেকবার ভুল পাসওয়ার্ড দেওয়ায় অ্যাকাউন্টটি ১৫ মিনিটের জন্য লক করা হয়েছে। পরে চেষ্টা করুন অথবা পাসওয়ার্ড রিসেট করুন।",
        email,
      };
    }
    if (error instanceof CredentialsSignin) return { error: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।", email };
    if (error instanceof AuthError) return { error: "লগইন করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।", email };
    throw error; // includes the successful-login redirect
  }
  return {};
}

export async function signOutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function requestPasswordResetAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "সঠিক ইমেইল ঠিকানা লিখুন।" };

  try {
    await requestPasswordReset(parsed.data.email);
  } catch (error) {
    console.error("[password-reset] Could not send the reset email", error);
    return {
      error: "এই মুহূর্তে ইমেইল পাঠানো যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।",
      email: parsed.data.email,
    };
  }

  // Same message whether or not the account exists, so emails can't be probed.
  return {
    success:
      "এই ইমেইলে অ্যাডমিন অ্যাকাউন্ট থাকলে পাসওয়ার্ড রিসেটের লিংক পাঠানো হয়েছে। ইনবক্স ও স্প্যাম ফোল্ডার দেখুন। লিংকটি ৩০ মিনিট কার্যকর থাকবে।",
  };
}

export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      error: fieldErrors.token?.[0] ?? "চিহ্নিত ঘরগুলো ঠিক করুন।",
      fieldErrors: {
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      },
    };
  }

  const updated = await resetPasswordWithToken(parsed.data.token, parsed.data.password);
  if (!updated) {
    return {
      error: "রিসেট লিংকটির মেয়াদ শেষ হয়ে গেছে অথবা লিংকটি সঠিক নয়। নতুন লিংকের জন্য আবার অনুরোধ করুন।",
    };
  }
  redirect("/admin/login?reset=success");
}
