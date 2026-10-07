"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import { clsx } from "clsx";
import { Logo } from "@/components/shared/logo";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { MobileMenu } from "./mobile-menu";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Transparent over the dark page heroes, turns into a floating glass pill on scroll. */
export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={clsx(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pl-2.5 pr-2 transition-all duration-500 sm:pl-3",
          scrolled
            ? "bg-white/85 shadow-[0_10px_40px_-12px_rgba(8,19,49,0.25)] ring-1 ring-brand-900/5 backdrop-blur-xl"
            : "ring-1 ring-transparent"
        )}
      >
        <Logo tone={scrolled ? "dark" : "light"} tagline="desktop" />

        <nav aria-label="প্রধান মেনু" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative isolate block rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors duration-300",
                      active
                        ? scrolled ? "text-white" : "text-brand-950"
                        : scrolled ? "text-brand-950/75 hover:text-brand-700" : "text-white/80 hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className={clsx("absolute inset-0 -z-10 rounded-full", scrolled ? "bg-brand-600" : "bg-white")}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "hidden h-11 items-center gap-2 rounded-full pl-1.5 pr-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex",
              scrolled ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-white text-brand-950 hover:bg-brand-50"
            )}
          >
            <span className="grid size-8 place-items-center rounded-full bg-whatsapp text-white">
              <WhatsAppIcon className="size-4" />
            </span>
            অর্ডার করুন
            <span className="sr-only"> WhatsApp-এ (নতুন ট্যাবে খুলবে)</span>
          </a>
          <MobileMenu tone={scrolled ? "dark" : "light"} />
        </div>
      </div>
    </header>
  );
}
