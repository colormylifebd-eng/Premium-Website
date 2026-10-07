"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { deleteStoredImage, isAllowedProductImage } from "@/lib/storage";
import { normalizePriceInput, productSchema, type ProductInput } from "@/lib/validations";

export type ProductFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ProductInput, string>>;
};

const FIELDS = ["name", "description", "price", "categoryId", "imageUrl"] as const;
const ID_PATTERN = /^[a-z0-9]{20,40}$/;
const SERVER_ERROR = "সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: normalizePriceInput(formData.get("price")),
    categoryId: formData.get("categoryId"),
    imageUrl: formData.get("imageUrl"),
  });
}

function invalid(fieldErrors: Record<string, string[] | undefined>): ProductFormState {
  const errors: ProductFormState["fieldErrors"] = {};
  for (const field of FIELDS) {
    const message = fieldErrors[field]?.[0];
    if (message) errors[field] = message;
  }
  return {
    status: "error",
    message: "ফর্মে কিছু ভুল আছে। চিহ্নিত ঘরগুলো ঠিক করে আবার সেভ করুন।",
    fieldErrors: errors,
  };
}

/** Checks the parts zod can't: the image comes from our storage and the category exists. */
async function checkReferences(data: ProductInput): Promise<ProductFormState | null> {
  if (!isAllowedProductImage(data.imageUrl)) {
    return invalid({ imageUrl: ["ছবিটি সঠিকভাবে আপলোড হয়নি। আবার ছবি আপলোড করুন।"] });
  }
  const category = await prisma.category.findUnique({ where: { id: data.categoryId }, select: { id: true } });
  return category ? null : invalid({ categoryId: ["সঠিক ক্যাটাগরি নির্বাচন করুন।"] });
}

/** Public pages are statically cached; refresh all of them after any catalog change. */
function refreshSite() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}

async function removeImageIfUnused(url: string) {
  const usage = await prisma.product.count({ where: { imageUrl: url } });
  if (usage === 0) await deleteStoredImage(url);
}

export async function createProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return invalid(z.flattenError(parsed.error).fieldErrors);

  try {
    const problem = await checkReferences(parsed.data);
    if (problem) return problem;
    await prisma.product.create({ data: parsed.data });
  } catch (error) {
    console.error("[products] create failed", error);
    return { status: "error", message: SERVER_ERROR };
  }

  refreshSite();
  redirect("/admin?notice=created");
}

export async function updateProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id !== "string" || !ID_PATTERN.test(id)) {
    return { status: "error", message: "প্রোডাক্টটি খুঁজে পাওয়া যায়নি।" };
  }
  const parsed = parseForm(formData);
  if (!parsed.success) return invalid(z.flattenError(parsed.error).fieldErrors);

  try {
    const problem = await checkReferences(parsed.data);
    if (problem) return problem;
    const existing = await prisma.product.findUnique({ where: { id }, select: { imageUrl: true } });
    if (!existing) {
      return { status: "error", message: "প্রোডাক্টটি খুঁজে পাওয়া যায়নি। হয়তো এটি আগেই মুছে ফেলা হয়েছে।" };
    }
    await prisma.product.update({ where: { id }, data: parsed.data });
    if (existing.imageUrl !== parsed.data.imageUrl) await removeImageIfUnused(existing.imageUrl);
  } catch (error) {
    console.error("[products] update failed", error);
    return { status: "error", message: SERVER_ERROR };
  }

  refreshSite();
  redirect("/admin?notice=updated");
}

/**
 * Deletes a product and its uploaded photo. When `redirectToList` is set
 * (deleting from the edit page) the admin is sent back to the product list.
 */
export async function deleteProduct(
  id: string,
  redirectToList = false
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  if (typeof id !== "string" || !ID_PATTERN.test(id)) {
    return { ok: false, error: "প্রোডাক্টটি খুঁজে পাওয়া যায়নি।" };
  }

  try {
    const product = await prisma.product.findUnique({ where: { id }, select: { imageUrl: true } });
    if (!product) return { ok: false, error: "প্রোডাক্টটি আগেই মুছে ফেলা হয়েছে।" };
    await prisma.product.delete({ where: { id } });
    await removeImageIfUnused(product.imageUrl);
  } catch (error) {
    console.error("[products] delete failed", error);
    return { ok: false, error: SERVER_ERROR };
  }

  refreshSite();
  if (redirectToList) redirect("/admin?notice=deleted");
  return { ok: true };
}
