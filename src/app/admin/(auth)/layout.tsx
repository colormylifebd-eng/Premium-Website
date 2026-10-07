import type { ReactNode } from "react";

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 px-4 py-12">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      {children}
    </main>
  );
}
