"use client";

import { RefreshCw } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { buildWhatsAppLink } from "@/lib/constants";

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-950 px-5 pb-16 pt-32 text-center text-white">
      <div className="max-w-md">
        <h1 className="font-display text-3xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
        <p className="mt-3 text-brand-100/80">পেজটি লোড করা যায়নি। আবার চেষ্টা করুন, অথবা সরাসরি WhatsApp-এ যোগাযোগ করুন।</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-950 transition hover:bg-brand-50"
          >
            <RefreshCw className="size-4" aria-hidden />
            আবার চেষ্টা করুন
          </button>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold ring-1 ring-white/25 transition hover:bg-white/10"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
