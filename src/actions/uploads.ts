"use server";

import { requireAdmin } from "@/lib/auth-guard";
import {
  canUseLocalStorage,
  detectImageExtension,
  getCloudinaryConfig,
  MAX_UPLOAD_BYTES,
  saveLocalUpload,
  signCloudinaryUpload,
} from "@/lib/storage";

export type UploadTarget =
  | { provider: "cloudinary"; uploadUrl: string; fields: Record<string, string> }
  | { provider: "local" }
  | { provider: "unavailable"; message: string };

/** Tells the browser where to upload a product photo. Admins only. */
export async function prepareImageUpload(): Promise<UploadTarget> {
  await requireAdmin();
  const signed = signCloudinaryUpload();
  if (signed) return { provider: "cloudinary", ...signed };
  if (canUseLocalStorage()) return { provider: "local" };
  return {
    provider: "unavailable",
    message: "ছবি আপলোডের জন্য Cloudinary সেটআপ করা হয়নি। ওয়েবসাইটের ডেভেলপারের সাথে যোগাযোগ করুন।",
  };
}

/** Saves an (already compressed) photo to local disk. Used when Cloudinary isn't configured. */
export async function uploadImageLocally(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  if (getCloudinaryConfig() || !canUseLocalStorage()) {
    return { error: "এই সার্ভারে লোকাল আপলোড চালু নেই।" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "কোনো ছবি পাওয়া যায়নি।" };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "ছবিটি অনেক বড়। ৮ MB এর ছোট ছবি দিন।" };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = detectImageExtension(bytes);
  if (!extension) return { error: "শুধু JPG, PNG বা WEBP ছবি আপলোড করা যাবে।" };

  return { url: await saveLocalUpload(bytes, extension) };
}
