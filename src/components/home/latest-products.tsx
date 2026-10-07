import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductWithCategory } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductGrid } from "@/components/products/product-grid";

export function LatestProducts({ products }: { products: ProductWithCategory[] }) {
  return (
    <section className="cv-auto relative pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="নতুন সংযোজন"
            title={<>সদ্য তৈরি <span className="text-gradient-brand">মিনিয়েচার</span></>}
            description="পছন্দ হলে অর্ডার বাটনে চাপ দিন, সরাসরি WhatsApp-এ কথা হবে।"
          />
          <Link
            href="/products"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-brand-800 shadow-sm ring-1 ring-brand-900/10 transition hover:ring-brand-300"
          >
            সব প্রোডাক্ট দেখুন
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
