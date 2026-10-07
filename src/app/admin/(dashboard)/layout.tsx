import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth-guard";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f2f6fc]">
      <AdminHeader email={session.user?.email} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
