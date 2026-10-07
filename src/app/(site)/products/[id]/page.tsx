import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, House, Phone, Search, Wallet } from "lucide-react";
import { BRAND, ORDER_POLICIES } from "@/lib/constants";
import { getProductById, getRelatedProducts } from "@/lib/data";
import { formatPrice, truncate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { WhatsAppButton } from "@/components/shared/cta-buttons";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ImageLens } from "@/components/products/image-lens";
import { ProductGrid } from "@/components/products/product-grid";

const POLICY_ICONS = { wallet: Wallet, clock: Clock, house: House } as const;

// Existing products are pre-built; new ones are rendered on first visit and then cached.
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "প্রোডাক্ট পাওয়া যায়নি" };
  const description = truncate(product.description, 160);
  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | ${BRAND.name}`,
      description,
      images: [{ url: product.imageUrl, alt: product.name }],
    },
  };
}

function absoluteUrl(url: string) {
  return url.startsWith("/") ? `${getSiteUrl()}${url}` : url;
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id, 3);
  const productUrl = `${getSiteUrl()}/products/${product.id}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: absoluteUrl(product.imageUrl),
          category: product.category.nameEn,
          brand: { "@type": "Brand", name: BRAND.name },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "BDT",
            availability: "https://schema.org/InStock",
            url: productUrl,
          },
        }}
      />

      <section className="relative isolate overflow-hidden bg-brand-950 pb-20 pt-32 text-white sm:pt-36">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)]" />
          <div className="absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[110px]" />
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "হোম", href: "/" },
              { label: "প্রোডাক্ট", href: "/products" },
              { label: product.category.name, href: `/products/category/${product.category.slug}` },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="relative -mt-12 pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-3 shadow-[0_30px_70px_-30px_rgba(8,19,49,0.45)] ring-1 ring-brand-900/5">
              <ImageLens src={product.imageUrl} alt={product.name} />
            </div>
            <p className="mt-3 hidden items-center justify-center gap-2 text-sm text-muted-foreground lg:flex">
              <Search className="size-4" aria-hidden />
              খুঁটিনাটি দেখতে ছবির উপর মাউস রাখুন
            </p>
          </div>

          <div className="lg:pt-16">
            <Link
              href={`/products/category/${product.category.slug}`}
              className="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 transition hover:bg-brand-100"
            >
              {product.category.name}
            </Link>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.3] text-brand-950 sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-4xl font-bold text-brand-700">{formatPrice(product.price)}</p>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/80 sm:text-lg">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton product={{ name: product.name, url: productUrl }} />
              <a
                href={`tel:${BRAND.phonePrimary}`}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-900 shadow-sm ring-1 ring-brand-900/10 transition hover:ring-brand-300"
              >
                <Phone className="size-4" aria-hidden />
                কল করুন
              </a>
            </div>

            <div className="mt-10 rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-brand-900/5 sm:p-7">
              <h2 className="font-display text-lg font-bold text-brand-950">অর্ডারের আগে জেনে নিন</h2>
              <ul className="mt-4 space-y-4">
                {ORDER_POLICIES.map((policy) => {
                  const Icon = POLICY_ICONS[policy.icon];
                  return (
                    <li key={policy.title} className="flex gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-950">
                          {policy.title}: <span className="text-brand-700">{policy.highlight}</span>
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{policy.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="cv-auto pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow={product.category.name}
              title={<>একই ক্যাটাগরির <span className="text-gradient-brand">আরও মডেল</span></>}
            />
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
