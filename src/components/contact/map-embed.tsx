"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Click-to-load Google Map. The embed pulls in roughly 450 KB of Google
 * scripts, so it only loads when the visitor asks for it (kind to mobile data).
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        ref={(node) => node?.focus()}
        title={title}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`}
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-80 w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative isolate grid h-full min-h-80 w-full place-items-center overflow-hidden bg-brand-50 p-6 text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-400"
    >
      <span aria-hidden className="absolute inset-0 -z-10 bg-grid-light" />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,99,221,0.2),transparent_70%)]"
      />
      <span className="flex flex-col items-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/30 animate-float motion-reduce:animate-none">
          <MapPin className="size-8" aria-hidden />
        </span>
        <span className="mt-5 font-display text-xl font-bold text-brand-950">ম্যাপে আমাদের অবস্থান দেখুন</span>
        <span className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-brand-700">
          চাপ দিলে Google Maps লোড হবে
        </span>
      </span>
    </button>
  );
}
