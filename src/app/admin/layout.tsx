import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: { default: "অ্যাডমিন প্যানেল", template: "%s | CML অ্যাডমিন" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors closeButton position="top-center" toastOptions={{ className: "font-body" }} />
    </>
  );
}
