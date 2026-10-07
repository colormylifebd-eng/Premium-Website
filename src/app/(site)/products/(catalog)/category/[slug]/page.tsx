import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import { CATEGORY_IMAGES } from "@/lib/images";
import { CatalogEmpty } from "@/components/products/catalog-empty";
import { CatalogHeading } from "@/components/products/catalog-heading";
import { ProductGrid } from "@/components/products/product-grid";

// Categories are fixed, so every category page is built ahead of time.
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);
  if (!category) return {};
  const description = `${category.description}। Color My Life এর হাতে তৈরি ${category.name}।`;
  return {
    title: category.name,
    description,
    alternates: { canonical: `/products/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${BRAND.name}`,
      description,
      images: [{ url: CATEGORY_IMAGES[category.slug], alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/products/category/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  if (products.length === 0) {
    return <CatalogEmpty message={`${category.name} এ এখনো কোনো মডেল যোগ করা হয়নি`} />;
  }

  return (
    <>
      <CatalogHeading title={category.name} description={category.description ?? ""} count={products.length} />
      <ProductGrid products={products} />
    </>
  );
}
