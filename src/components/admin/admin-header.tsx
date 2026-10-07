import Link from "next/link";
import { ExternalLink, LogOut, Plus } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { Logo } from "@/components/shared/logo";

export function AdminHeader({ email }: { email?: string | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo tone="dark" href="/admin" tagline="never" />
          <span className="hidden rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 sm:inline">অ্যাডমিন</span>
        </div>
        <nav aria-label="অ্যাডমিন মেনু" className="flex items-center gap-1 sm:gap-2">
          <Link href="/admin/products/new" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 md:inline-flex">
            <Plus className="size-4" aria-hidden /> নতুন প্রোডাক্ট
          </Link>
          <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">
            <ExternalLink className="size-4" aria-hidden />
            <span className="hidden sm:inline">ওয়েবসাইট</span>
            <span className="sr-only sm:hidden">ওয়েবসাইট দেখুন</span>
          </Link>
          <span className="mx-1 hidden max-w-48 truncate text-sm text-muted-foreground lg:inline">{email}</span>
          <form action={signOutAction}>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
              <LogOut className="size-4" aria-hidden />
              <span className="hidden sm:inline">লগ আউট</span>
              <span className="sr-only sm:hidden">লগ আউট</span>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
