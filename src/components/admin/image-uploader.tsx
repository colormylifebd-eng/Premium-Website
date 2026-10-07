"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, RefreshCw } from "lucide-react";
import { prepareImageUpload, uploadImageLocally } from "@/actions/uploads";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SOURCE_BYTES = 20 * 1024 * 1024;
const MAX_DIMENSION = 2000;

class UploadError extends Error {}

/**
 * Resizes to max 2000px and re-encodes as JPEG in the browser. Phone photos
 * shrink from several MB to a few hundred KB, upload faster on mobile data,
 * and lose their EXIF metadata (including GPS location).
 */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
  if (!blob) throw new Error("Could not encode the image");
  return blob;
}

async function uploadBlob(blob: Blob): Promise<string> {
  const target = await prepareImageUpload();
  if (target.provider === "unavailable") throw new UploadError(target.message);

  const body = new FormData();
  body.append("file", blob, "product.jpg");

  if (target.provider === "local") {
    const result = await uploadImageLocally(body);
    if ("error" in result) throw new UploadError(result.error);
    return result.url;
  }

  for (const [key, value] of Object.entries(target.fields)) body.append(key, value);
  const response = await fetch(target.uploadUrl, { method: "POST", body });
  const json = (await response.json().catch(() => null)) as { secure_url?: string; error?: { message?: string } } | null;
  if (!response.ok || !json?.secure_url) {
    throw new UploadError(json?.error?.message ? `Cloudinary: ${json.error.message}` : "ছবি আপলোড করা যায়নি।");
  }
  return json.secure_url;
}

type ImageUploaderProps = {
  id: string;
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  invalid?: boolean;
  describedBy?: string;
};

export function ImageUploader({ id, value, onChange, onUploadingChange, invalid, describedBy }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("শুধু JPG, PNG বা WEBP ছবি দিন।");
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setError("ছবিটি ২০ MB এর বেশি বড়। একটু ছোট ছবি দিন।");
      return;
    }

    setUploading(true);
    onUploadingChange?.(true);
    try {
      onChange(await uploadBlob(await compressImage(file)));
    } catch (uploadError) {
      setError(
        uploadError instanceof UploadError
          ? uploadError.message
          : "ছবি আপলোড করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।"
      );
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const openPicker = () => inputRef.current?.click();

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void handleFile(event.dataTransfer.files[0]);
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
          dragging ? "border-brand-500 bg-brand-50" : invalid ? "border-destructive/60 bg-red-50/40" : "border-brand-200 bg-brand-50/40"
        )}
      >
        {value ? (
          <div className="relative aspect-[4/3] w-full bg-white sm:aspect-[16/10]">
            <Image src={value} alt="প্রোডাক্টের ছবির প্রিভিউ" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-contain" />
          </div>
        ) : (
          <button type="button" onClick={openPicker} className="flex w-full flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-brand-100">
              <ImagePlus className="size-7" aria-hidden />
            </span>
            <span className="font-semibold text-brand-950">ছবি বেছে নিন</span>
            <span className="text-sm text-muted-foreground">মোবাইলের গ্যালারি বা কম্পিউটার থেকে, অথবা এখানে টেনে আনুন</span>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-sm">
            <p role="status" className="flex items-center gap-2 font-semibold text-brand-700">
              <LoaderCircle className="size-5 animate-spin" aria-hidden />
              ছবি আপলোড হচ্ছে...
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        aria-describedby={describedBy}
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {value && (
          <Button type="button" variant="outline" size="sm" onClick={openPicker} disabled={uploading}>
            <RefreshCw className="size-4" aria-hidden />
            ছবি পরিবর্তন করুন
          </Button>
        )}
        <p className="text-xs text-muted-foreground">JPG, PNG বা WEBP। বড় ছবি স্বয়ংক্রিয়ভাবে ছোট করে আপলোড হবে।</p>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
