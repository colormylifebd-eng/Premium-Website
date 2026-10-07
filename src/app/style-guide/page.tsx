import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Not a real page: keep it out of search results on preview/staging deploys
// too (production already 404s below).
export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

// Full class names are listed so Tailwind can find them (it can't see `bg-brand-${n}`).
const BRAND_SWATCHES = [
  ["50", "bg-brand-50"], ["100", "bg-brand-100"], ["200", "bg-brand-200"], ["300", "bg-brand-300"],
  ["400", "bg-brand-400"], ["500", "bg-brand-500"], ["600", "bg-brand-600"], ["700", "bg-brand-700"],
  ["800", "bg-brand-800"], ["900", "bg-brand-900"], ["950", "bg-brand-950"],
];
const ACCENT_SWATCHES = [
  ["50", "bg-accent-50"], ["100", "bg-accent-100"], ["200", "bg-accent-200"], ["300", "bg-accent-300"],
  ["400", "bg-accent-400"], ["500", "bg-accent-500"], ["600", "bg-accent-600"], ["700", "bg-accent-700"],
  ["800", "bg-accent-800"], ["900", "bg-accent-900"],
];

/** Development-only design system reference. Returns 404 in production. */
export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto max-w-5xl space-y-12 p-8">
      <h1 className="font-display text-4xl font-bold text-brand-700">CML ডিজাইন সিস্টেম</h1>
      {[{ title: "Brand blue", swatches: BRAND_SWATCHES }, { title: "Wood accent", swatches: ACCENT_SWATCHES }].map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 font-display text-xl font-semibold">{group.title}</h2>
          <div className="flex flex-wrap gap-2">
            {group.swatches.map(([label, className]) => (
              <div key={label} className="text-center">
                <div className={`size-16 rounded-lg border border-border ${className}`} />
                <span className="font-latin text-xs">{label}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className="space-y-3">
        <p className="font-display text-5xl font-extrabold text-brand-800">গ্রাম বাংলার টং দোকান</p>
        <p className="font-brush text-3xl text-accent-600">এখন আপনার ঘরে</p>
        <p className="font-body text-lg leading-relaxed">হাতের তৈরি এই মিনিয়েচার গ্রামের দোকানটি নিয়ে আসুক আপনার ঘরে গ্রাম বাংলার এক টুকরো ভালোবাসা।</p>
        <p className="font-script text-2xl text-brand-600">Miniature • Art • Craft • Dream</p>
      </section>
      <section className="flex flex-wrap items-center gap-3">
        <Button>ডিফল্ট</Button>
        <Button variant="secondary">সেকেন্ডারি</Button>
        <Button variant="outline">আউটলাইন</Button>
        <Button variant="destructive">ডিলিট</Button>
        <Badge>ভিলেজ মডেল</Badge>
        <Badge variant="secondary">গিফট আইটেম</Badge>
      </section>
    </main>
  );
}
