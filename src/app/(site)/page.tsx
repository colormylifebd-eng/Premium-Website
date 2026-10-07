import type { Metadata } from "next";
import { BRAND, MIN_PRICE } from "@/lib/constants";
import { getCategories, getLatestProducts } from "@/lib/data";
import { SITE_IMAGES } from "@/lib/images";
import { getSiteUrl } from "@/lib/site-url";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturesBento } from "@/components/home/features-bento";
import { Hero } from "@/components/home/hero";
import { LatestProducts } from "@/components/home/latest-products";
import { MaterialsMarquee } from "@/components/home/materials-marquee";
import { OrderProcess } from "@/components/home/order-process";
import { WorkGallery } from "@/components/home/work-gallery";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [categories, latestProducts] = await Promise.all([getCategories(), getLatestProducts(6)]);
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: BRAND.name,
          url: siteUrl,
          logo: `${siteUrl}${SITE_IMAGES.logo}`,
          image: `${siteUrl}${SITE_IMAGES.studioDiorama}`,
          telephone: BRAND.phonePrimary,
          email: BRAND.email,
          priceRange: `৳${MIN_PRICE}+`,
          address: {
            "@type": "PostalAddress",
            streetAddress: BRAND.streetAddressEn,
            addressLocality: "Dhaka",
            addressCountry: "BD",
          },
          sameAs: [BRAND.facebookUrl],
        }}
      />
      <Hero />
      <MaterialsMarquee />
      <CategoryShowcase categories={categories} />
      {latestProducts.length > 0 && <LatestProducts products={latestProducts} />}
      <FeaturesBento />
      <WorkGallery />
      <OrderProcess />
      <CtaSection />
    </>
  );
}
