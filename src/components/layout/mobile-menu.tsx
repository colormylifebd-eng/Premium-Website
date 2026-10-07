"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { BRAND, NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { FacebookIcon, WhatsAppIcon } from "@/components/shared/brand-icons";

const pathIsActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Full-width sheet menu for phones, built on the native <dialog> element:
 * the browser handles focus trapping, the Escape key and returning focus,
 * so no dialog library is shipped to the public site.
 */
export function MobileMenu({ tone }: { tone: "light" | "dark" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  // Closing fires the dialog's "close" event, which resets `open`.
  const close = () => dialogRef.current?.close();

  // Close the menu if the page changes some other way (e.g. the back button).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        aria-label="মেনু খুলুন"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={clsx(
          "grid size-11 place-items-center rounded-full transition-colors md:hidden",
          tone === "dark" ? "bg-brand-950 text-white" : "bg-white/10 text-white ring-1 ring-white/20"
        )}
      >
        <Menu className="size-5" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClose={() => {
          setOpen(false);
          // Safari doesn't focus buttons on tap, so return focus explicitly for keyboard and screen-reader users.
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          // A click on the <dialog> itself (not on its content) is a click on the backdrop.
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-x-3 top-3 bottom-auto m-0 h-auto max-h-[calc(100dvh-1.5rem)] w-auto max-w-none overflow-y-auto rounded-[2rem] border-0 bg-brand-950 p-0 text-white shadow-2xl ring-1 ring-white/10 backdrop:bg-[rgb(8_19_49/0.6)] backdrop:backdrop-blur-[8px] open:animate-in open:fade-in-0 open:slide-in-from-top-4 open:duration-300"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <Logo tone="light" onClick={close} />
            <button
              type="button"
              onClick={close}
              aria-label="মেনু বন্ধ করুন"
              className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/15"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <h2 id="mobile-menu-title" className="sr-only">
            মেনু
          </h2>

          <nav aria-label="মোবাইল মেনু" className="mt-8">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, index) => {
                const active = pathIsActive(pathname, link.href);
                return (
                  <li
                    key={link.href}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
                    style={{ animationDelay: `${100 + index * 60}ms` }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={clsx(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-bold transition-colors",
                        active ? "bg-white text-brand-950" : "hover:bg-white/5"
                      )}
                    >
                      {link.label}
                      <ArrowUpRight className="size-5 opacity-60" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 font-semibold text-brand-950"
            >
              <span className="grid size-10 place-items-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon className="size-5" />
              </span>
              WhatsApp-এ অর্ডার করুন
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-3 py-3 text-sm font-semibold ring-1 ring-white/10"
              >
                <FacebookIcon className="size-4 text-[#69a6ff]" />
                ফেসবুক পেজ
              </a>
              <a
                href={`tel:${BRAND.phonePrimary}`}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-3 py-3 text-sm font-semibold ring-1 ring-white/10"
              >
                <Phone className="size-4 text-sky-300" aria-hidden />
                কল করুন
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
