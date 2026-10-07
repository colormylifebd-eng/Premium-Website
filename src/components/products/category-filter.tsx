"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { toBanglaNumber } from "@/lib/format";
import { clsx } from "clsx";

type FilterItem = { slug: string; name: string; count: number };

/** Category chips. Each one is a real, statically generated page; the pill animates between them. */
export function CategoryFilter({ items, total }: { items: FilterItem[]; total: number }) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/products/category/") ? pathname.split("/")[3] : "all";
  const options = [
    { slug: "all", name: "সব মডেল", count: total, href: "/products" },
    ...items.map((item) => ({ ...item, href: `/products/category/${item.slug}` })),
  ];

  return (
    <nav aria-label="ক্যাটাগরি অনুযায়ী দেখুন" className="scrollbar-none -mx-5 overflow-x-auto px-5 py-2 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1.5 rounded-full bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(8,19,49,0.35)] ring-1 ring-brand-900/5 sm:mx-auto">
        {options.map((option) => {
          const active = option.slug === activeSlug;
          return (
            <li key={option.slug}>
              <Link
                href={option.href}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative isolate flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5",
                  active ? "text-white" : "text-brand-900/70 hover:text-brand-700"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="category-pill"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-brand-600 shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {option.name}
                <span className={clsx("rounded-full px-2 py-0.5 text-xs", active ? "bg-white/20" : "bg-brand-50 text-brand-700")}>
                  {toBanglaNumber(option.count)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
