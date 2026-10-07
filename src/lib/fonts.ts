import { Baloo_Da_2, Dancing_Script, Galada, Hind_Siliguri, Poppins } from "next/font/google";

/**
 * Font loading strategy:
 * - Only the Bangla files of the two main fonts are preloaded, because the
 *   first screen needs them. Every other file loads when text first uses it.
 * - display: "swap" everywhere, so text is never invisible while fonts load.
 * - Only the weights the design actually uses are included.
 */

/** Bangla display font for headlines (variable font: one file covers every weight). */
export const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  variable: "--font-baloo",
  display: "swap",
});

/** Bangla body font, highly legible at paragraph sizes (regular + semibold). */
export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600"],
  variable: "--font-hind",
  display: "swap",
});

/** Latin font for the English wordmark, phone numbers and email addresses. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

/** Brush-style Bangla accent, echoing the hand-painted lettering in the posters. */
export const galada = Galada({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-galada",
  display: "swap",
  preload: false,
});

/** Latin script accent (e.g. "Color Your Imagination"). One static weight keeps the file small. */
export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dancing",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  balooDa2.variable,
  hindSiliguri.variable,
  poppins.variable,
  galada.variable,
  dancingScript.variable,
].join(" ");
