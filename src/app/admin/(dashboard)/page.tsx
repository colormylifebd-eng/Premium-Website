import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth-guard";
import { getCategories, getProducts } from "@/lib/data";
import { formatDate, toBanglaNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { FlashToast } from "@/components/admin/flash-toast";
import { AdminProductList } from "@/components/admin/product-list";

export const metadata: Metadata = { title: "প্রোডাক্ট" };

export default async function AdminDashboardPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const [{ notice }, products, categories] = await Promise.all([searchParams, getProducts(), getCategories()]);

  return (
    <div className="space-y-8">
      <FlashToast notice={typeof notice === "string" ? notice : undefined} />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-600">ড্যাশবোর্ড</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-brand-950">প্রোডাক্ট ম্যানেজমেন্ট</h1>
          <p className="mt-1 text-muted-foreground">
            মোট {toBanglaNumber(products.length)}টি প্রোডাক্ট ওয়েবসাইটে দেখানো হচ্ছে।
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/admin/products/new">
            <Plus className="size-5" aria-hidden /> নতুন প্রোডাক্ট
          </Link>
        </Button>
      </div>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border">
            <p className="text-sm text-muted-foreground">{category.name}</p>
            <p className="mt-1 font-display text-2xl font-bold text-brand-950">{toBanglaNumber(category._count.products)}</p>
          </li>
        ))}
      </ul>

      <AdminProductList
        categories={categories.map((category) => ({ id: category.id, name: category.name }))}
        products={products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          categoryName: product.category.name,
          updatedLabel: formatDate(product.updatedAt),
        }))}
      />
    </div>
  );
}
