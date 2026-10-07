import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth-guard";
import { AuthCard } from "@/components/admin/auth-card";
import { LoginForm } from "@/components/admin/auth-forms";

export const metadata: Metadata = { title: "লগইন" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const session = await getAdminSession();
  if (session?.user?.id) redirect("/admin");

  const params = await searchParams;
  const callbackUrl = typeof params.callbackUrl === "string" ? params.callbackUrl : undefined;
  const notice = params.reset === "success" ? "পাসওয়ার্ড পরিবর্তন হয়েছে। নতুন পাসওয়ার্ড দিয়ে লগইন করুন।" : undefined;
  const sessionError = typeof params.error === "string" ? "সেশনের মেয়াদ শেষ হয়েছে, আবার লগইন করুন।" : undefined;

  return (
    <AuthCard
      title="অ্যাডমিন লগইন"
      description="প্রোডাক্ট যোগ, এডিট বা মুছে ফেলতে লগইন করুন।"
      footer={<Link href="/" className="hover:text-white">← ওয়েবসাইটে ফিরে যান</Link>}
    >
      <LoginForm callbackUrl={callbackUrl} notice={notice} initialError={sessionError} />
    </AuthCard>
  );
}
