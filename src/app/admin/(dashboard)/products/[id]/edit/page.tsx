import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth-guard";
import { getCategories, getProductById } from "@/lib/data";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "প্রোডাক্ট এডিট" };

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]/edit">) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getCategories()]);
  if (!product) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
            <ArrowLeft className="size-4" aria-hidden /> সব প্রোডাক্ট
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold text-brand-950">প্রোডাক্ট এডিট করুন</h1>
          <p className="mt-1 text-muted-foreground">পরিবর্তন সেভ করলেই ওয়েবসাইটে আপডেট হয়ে যাবে।</p>
        </div>
        <Link
          href={`/products/${product.id}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          <ExternalLink className="size-4" aria-hidden /> ওয়েবসাইটে দেখুন
        </Link>
      </div>

      <ProductForm
        categories={categories.map((category) => ({ id: category.id, name: category.name }))}
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
        }}
      />

      <section className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-5 ring-1 ring-red-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-display text-lg font-bold text-red-700">প্রোডাক্টটি মুছে ফেলুন</h2>
          <p className="mt-1 text-sm text-muted-foreground">মুছে ফেললে এটি ওয়েবসাইট থেকে চিরতরে সরে যাবে।</p>
        </div>
        <DeleteProductButton id={product.id} name={product.name} />
      </section>
    </div>
  );
}
