import { ArrowUpRight } from "lucide-react";
import { BRAND, buildWhatsAppLink } from "@/lib/constants";
import { clsx } from "clsx";
import { FacebookIcon, WhatsAppIcon } from "./brand-icons";

const WHATSAPP_VARIANTS = {
  brand: "bg-brand-600 text-white shadow-[0_14px_34px_-12px_rgba(29,71,184,0.75)] hover:bg-brand-700",
  light: "bg-white text-brand-950 shadow-[0_14px_40px_-14px_rgba(143,211,255,0.7)] hover:bg-brand-50",
} as const;

type WhatsAppButtonProps = {
  label?: string;
  product?: { name: string; url?: string };
  variant?: keyof typeof WHATSAPP_VARIANTS;
  className?: string;
};

/** The main "Order" call to action. Opens a WhatsApp chat with a pre-filled message. */
export function WhatsAppButton({
  label = "WhatsApp-এ অর্ডার করুন",
  product,
  variant = "brand",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(product)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-2 pr-6 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2",
        WHATSAPP_VARIANTS[variant],
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/45 to-transparent animate-shine motion-reduce:hidden"
      />
      <span className="relative grid size-10 place-items-center rounded-full bg-whatsapp text-white shadow-sm">
        <WhatsAppIcon className="size-5" />
      </span>
      <span className="relative">{label}</span>
      <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
    </a>
  );
}

/** Link to the client's Facebook page. */
export function FacebookButton({
  label = "ফেসবুক পেজ",
  tone = "dark",
  className,
}: {
  label?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <a
      href={BRAND.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group/fb inline-flex h-14 items-center gap-3 rounded-full pl-2 pr-6 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
        tone === "light"
          ? "text-white ring-1 ring-white/25 hover:bg-white/10"
          : "bg-white text-brand-950 shadow-sm ring-1 ring-brand-900/10 hover:ring-brand-300",
        className
      )}
    >
      <span className="grid size-10 place-items-center rounded-full bg-[#1877F2] text-white">
        <FacebookIcon className="size-5" />
      </span>
      {label}
      <ArrowUpRight
        aria-hidden
        className="size-4 opacity-60 transition-transform group-hover/fb:-translate-y-0.5 group-hover/fb:translate-x-0.5"
      />
      <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
    </a>
  );
}
