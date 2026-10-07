import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Reads /public/images/logo.png as a data URL so the favicon and Apple
 * touch icon are always generated from whatever logo file is in place.
 */
export async function getLogoDataUrl() {
  const bytes = await readFile(path.join(process.cwd(), "public", "images", "logo.png"));
  const mime = bytes[0] === 0xff && bytes[1] === 0xd8 ? "image/jpeg" : "image/png";
  return `data:${mime};base64,${bytes.toString("base64")}`;
}
