import { buildWhatsAppLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/shared/brand-icons";

/** Floating WhatsApp order button, visible on every public page. */
export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp-এ অর্ডার করুন (নতুন ট্যাবে খুলবে)"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-950 opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        WhatsApp-এ অর্ডার করুন
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-110">
        <span aria-hidden className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring motion-reduce:hidden" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
