/**
 * Seeds the database with:
 * 1. The fixed product categories (safe to re-run; keeps them in sync).
 * 2. The initial admin account from ADMIN_EMAIL / ADMIN_PASSWORD.
 * 3. A few sample products, only when the catalog is empty.
 *
 * Run with: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";
import { CATEGORIES, MIN_PRICE } from "../src/lib/constants";

const prisma = new PrismaClient();

// Sample catalog built from the client's own photos. Prices use the
// stated starting price; the owner should update them from /admin.
const SAMPLE_PRODUCTS = [
  {
    name: "গ্রাম বাংলার টং দোকান",
    categorySlug: "tea-shop-model",
    imageUrl: "/images/tea-shop-rooftop.jpg",
    description:
      "টিনের চাল, বাঁশের খুঁটি আর বেঞ্চ, সাইনবোর্ড, ঝুলন্ত চিপসের প্যাকেট আর কাচের বয়ামে সাজানো গ্রামের চিরচেনা চায়ের দোকান। পাশে বিদ্যুতের খুঁটি আর সবুজ গাছসহ পুরো দৃশ্যটি হাতে তৈরি।",
  },
  {
    name: "পুকুরপাড়ের গ্রাম",
    categorySlug: "village-model",
    imageUrl: "/images/village-skyline-1.jpg",
    description:
      "টিনের ঘর, খড়ের গাদা, নারকেল গাছ, বাঁশের ঘাট আর নৌকাসহ পুকুরপাড়ের এক টুকরো গ্রাম। রেজিনের তৈরি পানিতে শাপলা পাতার খুঁটিনাটিও রয়েছে।",
  },
  {
    name: "দ্বীপের কুঁড়েঘর",
    categorySlug: "gift-item",
    imageUrl: "/images/island-hut-1.jpg",
    description:
      "রেজিনের পানিতে ঘেরা ছোট্ট দ্বীপে টিনের কুঁড়েঘর, সবুজ গাছপালা আর একটি নৌকা। টেবিল বা শোকেসে রাখার মতো চমৎকার উপহার।",
  },
  {
    name: "আলো জ্বলা গ্রামের বাড়ি",
    categorySlug: "village-model",
    imageUrl: "/images/village-night.jpg",
    description:
      "ভেতরে আলোসহ গ্রামের বাড়ির মিনিয়েচার। জানালা দিয়ে উষ্ণ আলো বেরিয়ে আসে, চারপাশে বেড়া, ফলের গাছ আর পুকুর। ঘর সাজানোর জন্য অনন্য।",
  },
  {
    name: "চায়ের দোকান (কাস্টম সাইনবোর্ড)",
    categorySlug: "tea-shop-model",
    imageUrl: "/images/tea-shop-indoor.jpg",
    description:
      "আপনার নাম বা পছন্দের লেখা দিয়ে সাইনবোর্ড বানিয়ে নেওয়া যায় এমন টং দোকান মডেল। ভেতরের তাক, বয়াম, কেটলি থেকে শুরু করে প্রতিটি জিনিস আলাদা করে হাতে তৈরি।",
  },
  {
    name: "কাস্টম বাড়ির মডেল",
    categorySlug: "custom-house-model",
    imageUrl: "/images/custom-house.jpg",
    description:
      "আপনার বাড়ির ছবি ও মাপ দিলে হুবহু সেই বাড়ির মিনিয়েচার তৈরি করে দেওয়া হয়। আবাসিক বাড়ি, অফিস ভবন বা যেকোনো প্রিয় স্থাপনা।",
  },
];

async function seedCategories() {
  for (const [index, category] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        nameEn: category.nameEn,
        description: category.description,
        sortOrder: index,
      },
      create: {
        slug: category.slug,
        name: category.name,
        nameEn: category.nameEn,
        description: category.description,
        sortOrder: index,
      },
    });
  }
  console.log(`✔ ${CATEGORIES.length} categories ready`);
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    console.warn("⚠ ADMIN_EMAIL is not set, skipping admin account creation.");
    return;
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`✔ Admin account already exists for ${email}`);
    return;
  }

  const providedPassword = process.env.ADMIN_PASSWORD?.trim();
  const password = providedPassword || randomBytes(12).toString("base64url");

  await prisma.adminUser.create({
    data: {
      email,
      name: "Color My Life",
      passwordHash: await hash(password, 12),
    },
  });

  console.log(`✔ Admin account created for ${email}`);
  if (!providedPassword) {
    // Shown once so the first login is possible; change it via "Forgot password".
    console.log(`  Temporary password: ${password}`);
  }
}

async function seedSampleProducts() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`✔ Catalog already has ${count} products, skipping samples`);
    return;
  }

  const categories = await prisma.category.findMany();
  const idBySlug = new Map(categories.map((c) => [c.slug, c.id]));
  const now = Date.now();

  // Insert one by one with staggered timestamps so "newest first" ordering is stable.
  for (const [index, product] of SAMPLE_PRODUCTS.entries()) {
    const categoryId = idBySlug.get(product.categorySlug);
    if (!categoryId) throw new Error(`Unknown category: ${product.categorySlug}`);

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: MIN_PRICE,
        imageUrl: product.imageUrl,
        categoryId,
        createdAt: new Date(now - index * 60_000),
      },
    });
  }
  console.log(`✔ ${SAMPLE_PRODUCTS.length} sample products created`);
}

async function main() {
  await seedCategories();
  await seedAdmin();
  await seedSampleProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
