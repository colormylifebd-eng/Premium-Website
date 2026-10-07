import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { BRAND } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/images";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const description =
  "Color My Life (CML): বাংলাদেশের হাতে তৈরি মিনিয়েচার ব্র্যান্ড। গ্রাম বাংলার টং দোকান, ভিলেজ মডেল, কাস্টম বাড়ির মডেল ও গিফট আইটেম, সম্পূর্ণ হাতের কাজে।";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND.name} | হাতে তৈরি মিনিয়েচার আর্ট`,
    template: `%s | ${BRAND.name}`,
  },
  description,
  keywords: [
    "miniature bangladesh",
    "handmade miniature",
    "miniature village model",
    "custom house model",
    "diorama bangladesh",
    "Color My Life",
    "মিনিয়েচার",
  ],
  openGraph: {
    title: `${BRAND.name} | হাতে তৈরি মিনিয়েচার আর্ট`,
    description,
    siteName: BRAND.name,
    locale: "bn_BD",
    type: "website",
    images: [
      { url: SITE_IMAGES.studioDiorama, width: 1071, height: 1469, alt: "Color My Life এর হাতে তৈরি মিনিয়েচার ডায়োরামা" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#081331",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-scroll-behavior="smooth" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col overflow-x-hidden font-body antialiased">{children}</body>
    </html>
  );
}
