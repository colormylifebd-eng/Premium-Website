import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth-guard";
import { getCategories } from "@/lib/data";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "নতুন প্রোডাক্ট" };

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
          <ArrowLeft className="size-4" aria-hidden /> সব প্রোডাক্ট
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-brand-950">নতুন প্রোডাক্ট যোগ করুন</h1>
        <p className="mt-1 text-muted-foreground">ছবি, নাম, মূল্য ও বিবরণ দিয়ে সেভ করলেই প্রোডাক্টটি ওয়েবসাইটে দেখা যাবে।</p>
      </div>
      <ProductForm categories={categories.map((category) => ({ id: category.id, name: category.name }))} />
    </div>
  );
}
