import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { MotionProvider } from "@/components/shared/motion";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-white px-4 py-2 font-semibold text-brand-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        মূল কনটেন্টে যান
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </MotionProvider>
  );
}
