import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/constants";
import type { ProductWithCategory } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { WhatsAppIcon } from "@/components/shared/brand-icons";
import { TiltCard } from "@/components/shared/motion";

/**
 * Product tile with a 3D hover tilt. The title is a "stretched" link so the
 * whole card opens the detail page, while the order button opens WhatsApp.
 */
export function ProductCard({ product }: { product: ProductWithCategory }) {
  const href = `/products/${product.id}`;
  const orderHref = buildWhatsAppLink({ name: product.name, url: `${getSiteUrl()}${href}` });

  return (
    <TiltCard maxTilt={6} className="group rounded-[1.75rem]">
      <article className="relative flex h-full flex-col rounded-[1.75rem] bg-white p-2.5 shadow-[0_18px_45px_-20px_rgba(8,19,49,0.28)] ring-1 ring-brand-900/5 transition-shadow duration-500 group-hover:shadow-[0_32px_60px_-22px_rgba(29,71,184,0.45)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-brand-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-950/50 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur">
            {product.category.name}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3.5 py-1.5 font-display text-lg font-bold leading-none text-brand-800 shadow-md">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-4">
          <h3 className="font-display text-xl font-bold leading-snug text-brand-950">
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[1.75rem] focus-visible:after:ring-2 focus-visible:after:ring-brand-500"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <span aria-hidden className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              বিস্তারিত দেখুন
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex h-10 items-center gap-2 rounded-full bg-brand-600 pl-1.5 pr-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
            >
              <span className="grid size-7 place-items-center rounded-full bg-whatsapp">
                <WhatsAppIcon className="size-4" />
              </span>
              অর্ডার
              <span className="sr-only">: {product.name}, WhatsApp-এ (নতুন ট্যাবে খুলবে)</span>
            </a>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
