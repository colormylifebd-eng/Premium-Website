"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PackageOpen, PenLine, Plus, Search } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteProductButton } from "./delete-product-button";

export type AdminProductRow = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  updatedLabel: string;
};

export function AdminProductList({ products, categories }: { products: AdminProductRow[]; categories: { id: string; name: string }[] }) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter(
      (product) =>
        (categoryId === "all" || product.categoryId === categoryId) &&
        (!needle || product.name.toLowerCase().includes(needle))
    );
  }, [products, query, categoryId]);

  if (products.length === 0) {
    return (
      <div className="rounded-[1.75rem] bg-white px-6 py-16 text-center ring-1 ring-border">
        <PackageOpen className="mx-auto size-12 text-brand-300" aria-hidden />
        <h2 className="mt-4 font-display text-xl font-bold text-brand-950">এখনো কোনো প্রোডাক্ট নেই</h2>
        <p className="mt-1 text-muted-foreground">প্রথম প্রোডাক্টটি যোগ করলেই এটি ওয়েবসাইটে দেখা যাবে।</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/admin/products/new">
            <Plus className="size-5" aria-hidden /> নতুন প্রোডাক্ট যোগ করুন
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <section aria-label="প্রোডাক্ট তালিকা" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="নাম দিয়ে খুঁজুন..."
            aria-label="প্রোডাক্ট খুঁজুন"
            className="h-11 pl-10"
          />
        </div>
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          aria-label="ক্যাটাগরি অনুযায়ী দেখুন"
          className="h-11 rounded-lg border border-border bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">সব ক্যাটাগরি</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-white px-6 py-10 text-center text-muted-foreground ring-1 ring-border">
          এই খোঁজের সাথে মেলে এমন কোনো প্রোডাক্ট নেই।
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((product) => (
            <li key={product.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-border sm:gap-4 sm:p-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-20">
                <Image src={product.imageUrl} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-brand-950">{product.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <Badge variant="secondary">{product.categoryName}</Badge>
                  <span className="font-semibold text-brand-700">{formatPrice(product.price)}</span>
                </div>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block">সর্বশেষ আপডেট: {product.updatedLabel}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <PenLine className="size-4" aria-hidden />
                    <span className="sr-only sm:not-sr-only">এডিট</span>
                    <span className="sr-only">: {product.name}</span>
                  </Link>
                </Button>
                <DeleteProductButton id={product.id} name={product.name} compact />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
