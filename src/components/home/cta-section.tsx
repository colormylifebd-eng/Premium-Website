import Image from "next/image";
import { MIN_PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { SITE_IMAGES } from "@/lib/images";
import { FacebookButton, WhatsAppButton } from "@/components/shared/cta-buttons";
import { Magnetic } from "@/components/shared/motion";
import { Reveal } from "@/components/shared/reveal";

/** Closing call to action used at the bottom of most pages. */
export function CtaSection() {
  return (
    // No content-visibility here: the shining WhatsApp button animates forever, and
    // animations inside skipped sections force style recalculation on every frame.
    <section className="px-4 pb-24 sm:px-8">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand-900 px-6 py-16 text-center text-white shadow-2xl sm:px-12 sm:py-20">
        <Image src={SITE_IMAGES.villageSkyline1} alt="" fill sizes="(min-width: 1152px) 1152px, 100vw" className="-z-20 object-cover opacity-35" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-br from-brand-950/95 via-brand-900/80 to-brand-700/70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark" />

        <p className="font-brush text-2xl text-accent-200 sm:text-3xl">ইউনিক কিছু খুঁজছেন?</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.3] sm:text-5xl">
          আপনার কালেকশনে একটি <span className="text-gradient-sky">ইউনিক সংযোজন</span> হোক
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
          পছন্দের মডেল বেছে নিন অথবা নিজের আইডিয়া জানান, আমরা হাতে তৈরি করে দেব। মূল্য শুরু {formatPrice(MIN_PRICE)} থেকে।
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <WhatsAppButton variant="light" />
          </Magnetic>
          <FacebookButton tone="light" label="ফেসবুকে আরও কাজ দেখুন" />
        </div>
      </Reveal>
    </section>
  );
}
