import type { Metadata } from "next";
import Link from "next/link";
import { isResetTokenValid } from "@/lib/password-reset";
import { AuthCard } from "@/components/admin/auth-card";
import { ResetPasswordForm } from "@/components/admin/auth-forms";
import { FormMessage } from "@/components/admin/form-parts";

export const metadata: Metadata = {
  title: "নতুন পাসওয়ার্ড",
  // Keep the secret token in the URL from leaking to other sites.
  referrer: "no-referrer",
};

export default async function ResetPasswordPage({ searchParams }: PageProps<"/admin/reset-password">) {
  const { token } = await searchParams;
  const valid = typeof token === "string" && (await isResetTokenValid(token));
  const backToLogin = <Link href="/admin/login" className="hover:text-white">← লগইন পেজে ফিরে যান</Link>;

  if (!valid) {
    return (
      <AuthCard title="লিংকটি আর কার্যকর নয়" footer={backToLogin}>
        <FormMessage type="error">
          রিসেট লিংকটির মেয়াদ শেষ হয়ে গেছে, আগেই ব্যবহার করা হয়েছে অথবা লিংকটি সঠিক নয়।
        </FormMessage>
        <Link
          href="/admin/forgot-password"
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-600 font-semibold text-white transition hover:bg-brand-700"
        >
          নতুন রিসেট লিংক নিন
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="নতুন পাসওয়ার্ড সেট করুন" description="সেভ করার পর সব ডিভাইস থেকে লগ আউট হয়ে যাবে।" footer={backToLogin}>
      <ResetPasswordForm token={token} />
    </AuthCard>
  );
}
