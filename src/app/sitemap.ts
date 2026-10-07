import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  const latestChange = products[0]?.updatedAt;

  return [
    { url: `${base}/`, lastModified: latestChange, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: latestChange, changeFrequency: "weekly", priority: 0.9 },
    ...CATEGORIES.map((category) => ({
      url: `${base}/products/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${base}/products/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
