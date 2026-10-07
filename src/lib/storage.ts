import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

/**
 * Product image storage.
 * - Production (Vercel): Cloudinary. The browser uploads directly with a
 *   short-lived signature, so large photos never pass through our server.
 * - Local development / self-hosting: files saved in ./.uploads and served
 *   by /api/uploads/[file].
 */

const UPLOAD_DIR = path.join(process.cwd(), ".uploads");
const LOCAL_PREFIX = "/api/uploads/";
const LOCAL_FILE = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.(jpg|png|webp)$/;
const PUBLIC_IMAGE = /^\/images\/[\w-]+\.(jpe?g|png|webp)$/i;
const CLOUDINARY_FOLDER = "color-my-life/products";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const MIME_TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;
export type ImageExtension = keyof typeof MIME_TYPES;

export function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

/** Vercel's filesystem is read-only, so local storage only works elsewhere. */
export function canUseLocalStorage() {
  return !process.env.VERCEL;
}

/** Creates the fields for a signed, direct-from-browser Cloudinary upload. */
export function signCloudinaryUpload() {
  const config = getCloudinaryConfig();
  if (!config) return null;
  const timestamp = String(Math.round(Date.now() / 1000));
  const signature = cloudinary.utils.api_sign_request(
    { folder: CLOUDINARY_FOLDER, timestamp },
    config.apiSecret
  );
  return {
    uploadUrl: `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    fields: { api_key: config.apiKey, folder: CLOUDINARY_FOLDER, timestamp, signature },
  };
}

/** Identifies JPEG / PNG / WEBP files by their magic bytes, not their name. */
export function detectImageExtension(bytes: Uint8Array): ImageExtension | null {
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "png";
  }
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end));
  if (bytes.length > 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  return null;
}

export async function saveLocalUpload(bytes: Uint8Array, extension: ImageExtension) {
  const fileName = `${randomUUID()}.${extension}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, fileName), bytes);
  return `${LOCAL_PREFIX}${fileName}`;
}

export async function readLocalUpload(fileName: string) {
  if (!LOCAL_FILE.test(fileName)) return null;
  try {
    const data = await readFile(path.join(UPLOAD_DIR, fileName));
    const extension = fileName.split(".").pop() as ImageExtension;
    return { data: new Uint8Array(data), contentType: MIME_TYPES[extension] };
  } catch {
    return null;
  }
}

function cloudinaryPublicId(url: string, cloudName: string) {
  try {
    const { hostname, pathname } = new URL(url);
    const prefix = `/${cloudName}/image/upload/`;
    if (hostname !== "res.cloudinary.com" || !pathname.startsWith(prefix)) return null;
    const rest = pathname.slice(prefix.length).replace(/^v\d+\//, "");
    return decodeURIComponent(rest.replace(/\.[a-z0-9]+$/i, ""));
  } catch {
    return null;
  }
}

/** Only images from our own storage (or the bundled sample photos) may be saved on a product. */
export function isAllowedProductImage(url: string) {
  if (PUBLIC_IMAGE.test(url)) return true;
  if (url.startsWith(LOCAL_PREFIX)) return LOCAL_FILE.test(url.slice(LOCAL_PREFIX.length));
  const config = getCloudinaryConfig();
  return Boolean(config && url.startsWith("https://") && cloudinaryPublicId(url, config.cloudName));
}

/** Best-effort cleanup of an image that is no longer used. Never throws. */
export async function deleteStoredImage(url: string) {
  try {
    if (url.startsWith(LOCAL_PREFIX)) {
      const fileName = url.slice(LOCAL_PREFIX.length);
      if (LOCAL_FILE.test(fileName)) await unlink(path.join(UPLOAD_DIR, fileName));
      return;
    }
    const config = getCloudinaryConfig();
    const publicId = config ? cloudinaryPublicId(url, config.cloudName) : null;
    if (!config || !publicId) return;
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
      secure: true,
    });
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (error) {
    console.warn("[storage] Could not delete image", url, error);
  }
}
