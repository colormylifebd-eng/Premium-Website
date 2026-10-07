import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-950 px-5 py-16 text-center text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[120px]" />
      <Logo tone="light" />
      <p className="mt-12 font-display text-8xl font-extrabold leading-tight sm:text-9xl">
        <span className="text-gradient-sky">৪০৪</span>
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-3 max-w-md text-brand-100/80">আপনি যে পেজটি খুঁজছেন সেটি সরিয়ে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 font-semibold text-brand-950 transition hover:bg-brand-50">
          হোমে ফিরে যান
        </Link>
        <Link
          href="/products"
          className="group inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold ring-1 ring-white/25 transition hover:bg-white/10"
        >
          কালেকশন দেখুন
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </main>
  );
}
