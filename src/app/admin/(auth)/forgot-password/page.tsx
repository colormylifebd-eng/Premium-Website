import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/admin/auth-card";
import { ForgotPasswordForm } from "@/components/admin/auth-forms";

export const metadata: Metadata = { title: "পাসওয়ার্ড রিসেট" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="পাসওয়ার্ড ভুলে গেছেন?"
      description="অ্যাডমিন ইমেইলটি লিখুন। আমরা নতুন পাসওয়ার্ড সেট করার একটি লিংক পাঠাব।"
      footer={<Link href="/admin/login" className="hover:text-white">← লগইন পেজে ফিরে যান</Link>}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
