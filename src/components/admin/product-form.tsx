"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Image as ImageIcon, LoaderCircle, Save } from "lucide-react";
import { createProduct, updateProduct, type ProductFormState } from "@/actions/products";
import { formatPrice, toAsciiDigits, toBanglaNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldError, FormMessage } from "./form-parts";
import { ImageUploader } from "./image-uploader";

type CategoryOption = { id: string; name: string };
type ProductValues = { id: string; name: string; description: string; price: number; imageUrl: string; categoryId: string };

const INITIAL_STATE: ProductFormState = { status: "idle" };

export function ProductForm({ categories, product }: { categories: CategoryOption[]; product?: ProductValues }) {
  const [state, formAction, pending] = useActionState(product ? updateProduct : createProduct, INITIAL_STATE);
  // Controlled fields keep what the owner typed if the server reports an error.
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  const errors = state.fieldErrors ?? {};
  const numericPrice = Number(toAsciiDigits(price).replace(/\D/g, ""));
  const categoryName = categories.find((category) => category.id === categoryId)?.name;
  const describe = (field: keyof typeof errors, hint?: string) =>
    [errors[field] ? `${field}-error` : null, hint].filter(Boolean).join(" ") || undefined;

  return (
    <form action={formAction} className="grid items-start gap-6 lg:grid-cols-[1fr_19rem]">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} />
      <input type="hidden" name="categoryId" value={categoryId} />

      <div className="space-y-7 rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-border sm:p-8">
        {state.status === "error" && state.message && <FormMessage type="error">{state.message}</FormMessage>}

        <div className="space-y-2">
          <Label htmlFor="product-image">প্রোডাক্টের ছবি</Label>
          <ImageUploader
            id="product-image"
            value={imageUrl}
            onChange={setImageUrl}
            onUploadingChange={setUploading}
            invalid={Boolean(errors.imageUrl)}
            describedBy={describe("imageUrl")}
          />
          <FieldError id="imageUrl-error">{errors.imageUrl}</FieldError>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">প্রোডাক্টের নাম</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={120}
            required
            placeholder="যেমন: গ্রাম বাংলার টং দোকান"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className="h-11"
          />
          <FieldError id="name-error">{errors.name}</FieldError>
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">মূল্য (টাকা)</Label>
            <div className="relative">
              <span aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">৳</span>
              <Input
                id="price"
                name="price"
                inputMode="numeric"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                placeholder="৮৫০০"
                aria-invalid={Boolean(errors.price)}
                aria-describedby={describe("price", "price-hint")}
                className="h-11 pl-8"
              />
            </div>
            <p id="price-hint" className="text-xs text-muted-foreground">
              {numericPrice > 0 ? `ওয়েবসাইটে দেখাবে: ${formatPrice(numericPrice)}` : "বাংলা বা ইংরেজি সংখ্যায় লিখতে পারেন"}
            </p>
            <FieldError id="price-error">{errors.price}</FieldError>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">ক্যাটাগরি</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category" className="h-11" aria-invalid={Boolean(errors.categoryId)} aria-describedby={describe("categoryId")}>
                <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="categoryId-error">{errors.categoryId}</FieldError>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">বিবরণ</Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
            required
            placeholder="মডেলটির সাইজ, উপকরণ ও বিশেষত্ব লিখুন..."
            aria-invalid={Boolean(errors.description)}
            aria-describedby={describe("description", "description-count")}
          />
          <p id="description-count" className="text-right text-xs text-muted-foreground">
            {toBanglaNumber(description.length)} / ২,০০০ অক্ষর
          </p>
          <FieldError id="description-error">{errors.description}</FieldError>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" size="lg">
            <Link href="/admin">বাতিল</Link>
          </Button>
          <Button type="submit" size="lg" disabled={pending || uploading}>
            {pending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
                সেভ হচ্ছে...
              </>
            ) : (
              <>
                <Save className="size-4" aria-hidden />
                {product ? "পরিবর্তন সেভ করুন" : "প্রোডাক্ট সেভ করুন"}
              </>
            )}
          </Button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24" aria-label="প্রিভিউ">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">ওয়েবসাইটে যেমন দেখাবে</p>
        <div className="rounded-[1.75rem] bg-white p-2.5 shadow-lg ring-1 ring-border">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-brand-50">
            {imageUrl ? (
              <Image src={imageUrl} alt="" fill sizes="304px" className="object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-brand-300">
                <ImageIcon className="size-12" aria-hidden />
              </div>
            )}
            {categoryName && (
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
                {categoryName}
              </span>
            )}
            {numericPrice > 0 && (
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3.5 py-1.5 font-display text-lg font-bold leading-none text-brand-800 shadow-md">
                {formatPrice(numericPrice)}
              </span>
            )}
          </div>
          <div className="px-2.5 pb-2.5 pt-4">
            <p className={cn("font-display text-xl font-bold leading-snug", name ? "text-brand-950" : "text-muted-foreground")}>
              {name || "প্রোডাক্টের নাম"}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {description || "এখানে বিবরণের প্রথম অংশ দেখাবে।"}
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
