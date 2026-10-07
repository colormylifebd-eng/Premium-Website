import type { ReactNode } from "react";
import { MIN_PRICE } from "@/lib/constants";
import { getCategories, getProductCount } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CtaSection } from "@/components/home/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { CategoryFilter } from "@/components/products/category-filter";

/** Shared by /products and /products/category/[slug], so the filter pill animates between them. */
export default async function CatalogLayout({ children }: { children: ReactNode }) {
  const [categories, total] = await Promise.all([getCategories(), getProductCount()]);

  return (
    <>
      <PageHero
        eyebrow="কালেকশন"
        title={<>হাতে তৈরি <span className="text-gradient-sky">মিনিয়েচার</span> কালেকশন</>}
        description={`মূল্য শুরু ${formatPrice(MIN_PRICE)} থেকে। পছন্দের মডেলটি বেছে নিয়ে সরাসরি WhatsApp-এ অর্ডার করুন।`}
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "প্রোডাক্ট" }]}
      />
      <section className="relative z-10 -mt-9 pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <CategoryFilter
            total={total}
            items={categories.map((category) => ({
              slug: category.slug,
              name: category.name,
              count: category._count.products,
            }))}
          />
          <div className="mt-12">{children}</div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
