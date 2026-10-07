import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Read-only queries shared by the public site and the admin panel.
 * React's cache() dedupes calls within a single request (e.g. a page
 * and its generateMetadata both asking for the same product).
 */

export const getCategories = cache(async () =>
  prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  })
);

export const getCategoryBySlug = cache(async (slug: string) =>
  prisma.category.findUnique({ where: { slug } })
);

export const getProducts = cache(async () =>
  prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  })
);

export const getProductCount = cache(async () => prisma.product.count());

export const getProductsByCategory = cache(async (categoryId: string) =>
  prisma.product.findMany({
    where: { categoryId },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  })
);

export const getLatestProducts = cache(async (limit: number) =>
  prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  })
);

export const getProductById = cache(async (id: string) =>
  prisma.product.findUnique({ where: { id }, include: { category: true } })
);

export const getRelatedProducts = cache(
  async (categoryId: string, excludeId: string, limit = 3) =>
    prisma.product.findMany({
      where: { categoryId, NOT: { id: excludeId } },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { category: true },
    })
);

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>[number];
export type CategoryWithCount = Awaited<ReturnType<typeof getCategories>>[number];
