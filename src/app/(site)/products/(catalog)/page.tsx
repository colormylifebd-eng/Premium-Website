import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { CatalogEmpty } from "@/components/products/catalog-empty";
import { CatalogHeading } from "@/components/products/catalog-heading";
import { ProductGrid } from "@/components/products/product-grid";

export const metadata: Metadata = {
  title: "প্রোডাক্ট কালেকশন",
  description:
    "Color My Life এর হাতে তৈরি মিনিয়েচার কালেকশন: ভিলেজ মডেল, টং দোকান, কাস্টম বাড়ির মডেল ও গিফট আইটেম। মূল্য শুরু ৮,৫০০ টাকা থেকে।",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return <CatalogEmpty message="নতুন মডেল খুব শীঘ্রই আসছে" />;
  }

  return (
    <>
      <CatalogHeading
        title="সব মিনিয়েচার মডেল"
        description="নতুন তৈরি করা মডেলগুলো সবার আগে দেখানো হচ্ছে।"
        count={products.length}
      />
      <ProductGrid products={products} />
    </>
  );
}
