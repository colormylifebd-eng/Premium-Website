/**
 * Central brand/business constants for Color My Life (CML).
 * All contact info, policy copy and the fixed category list live here so
 * the rest of the app never hardcodes them.
 */

export const BRAND = {
  name: "Color My Life",
  shortName: "CML",
  tagline: "Miniature • Art • Craft • Dream",
  phonePrimary: "+8801780193752",
  phonePrimaryDisplay: "01780-193752",
  phoneSecondary: "+8801628887726",
  phoneSecondaryDisplay: "01628-887726",
  email: "emon.artist.yt@gmail.com",
  address: "পর্বত নগর টাওয়ার, হাজী মার্কেট, ইসিবি চত্বর, ঢাকা",
  addressEn: "Parbat Nagar Tower, Hajimarket, ECB Chattar, Dhaka",
  /** For search engines (structured data); the city is added separately there. */
  streetAddressEn: "Parbat Nagar Tower, Hajimarket, ECB Chattar",
  facebookUrl: "https://www.facebook.com/share/1F6FQDVuco/",
  /** Digits only, with country code and no "+" (the format wa.me requires). */
  whatsappNumber: "8801780193752",
  /**
   * What the Contact page map searches for. For an exact pin, replace it with the
   * shop's "latitude,longitude" (right-click the spot in Google Maps to copy it).
   */
  mapQuery: "Parbat Nagar Tower, Hajimarket, ECB Chattar, Dhaka",
} as const;

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled message.
 * When a product is passed, the message names it (and links to it) so the
 * owner immediately knows which piece the customer is asking about.
 */
export function buildWhatsAppLink(product?: { name: string; url?: string }) {
  const message = product
    ? `আসসালামু আলাইকুম, আমি "${product.name}" মিনিয়েচারটি অর্ডার করতে চাই।${
        product.url ? `\n${product.url}` : ""
      }`
    : "আসসালামু আলাইকুম, আমি Color My Life থেকে একটি মিনিয়েচার অর্ডার করতে চাই।";
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Starting price in Taka, as stated by the client. */
export const MIN_PRICE = 8500;

export const NAV_LINKS = [
  { href: "/", label: "হোম" },
  { href: "/products", label: "প্রোডাক্ট" },
  { href: "/about", label: "আমাদের কথা" },
  { href: "/contact", label: "যোগাযোগ" },
] as const;

export const MATERIALS = [
  { name: "কাঠ", nameEn: "Wood", icon: "trees" },
  { name: "এমডিএফ", nameEn: "MDF", icon: "layers" },
  { name: "পিভিসি", nameEn: "PVC", icon: "boxes" },
  { name: "রেজিন", nameEn: "Resin", icon: "droplets" },
  { name: "ক্রকশিট", nameEn: "Croksheet", icon: "scissors" },
  { name: "ক্লে", nameEn: "Clay", icon: "shapes" },
  { name: "মস", nameEn: "Moss", icon: "sprout" },
  { name: "বালি", nameEn: "Sand", icon: "hourglass" },
  { name: "কাগজ", nameEn: "Paper", icon: "scroll" },
] as const;

export type MaterialIcon = (typeof MATERIALS)[number]["icon"];

/**
 * Fixed product categories. They are seeded into the database
 * (prisma/seed.ts) and the admin picks one of them for every product.
 */
export const CATEGORIES = [
  {
    slug: "village-model",
    name: "ভিলেজ মডেল",
    nameEn: "Village Model",
    description: "পুকুরপাড়, উঠান আর টিনের ঘর, গ্রাম বাংলার চেনা দৃশ্য মিনিয়েচারে",
  },
  {
    slug: "tea-shop-model",
    name: "টং দোকান মডেল",
    nameEn: "Tea Shop Model",
    description: "গ্রামের চায়ের টং দোকানের খুঁটিনাটি সহ নিখুঁত মিনিয়েচার",
  },
  {
    slug: "custom-house-model",
    name: "কাস্টম বাড়ির মডেল",
    nameEn: "Custom House Model",
    description: "আপনার নিজের বাড়ি বা প্রিয় স্থাপনার হুবহু মিনিয়েচার রূপ",
  },
  {
    slug: "gift-item",
    name: "গিফট আইটেম",
    nameEn: "Gift Item",
    description: "প্রিয়জনকে দেওয়ার মতো অনন্য, স্মরণীয় হাতে তৈরি উপহার",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

/** Highlights taken from the client's posters. */
export const FEATURES = [
  {
    title: "সম্পূর্ণ হাতের কাজ",
    description: "প্রতিটি মডেল শিল্পীর নিজের হাতে, ধৈর্য আর যত্নে তৈরি।",
    icon: "hand",
  },
  {
    title: "উচ্চমানের উপকরণ",
    description: "কাঠ, রেজিন, এমডিএফসহ টেকসই ও মানসম্মত উপকরণ।",
    icon: "leaf",
  },
  {
    title: "দীর্ঘস্থায়ী ও টেকসই",
    description: "বছরের পর বছর একই রকম সুন্দর থাকে, এমনভাবে তৈরি।",
    icon: "gem",
  },
  {
    title: "চমৎকার গিফট আইডিয়া",
    description: "জন্মদিন, বিয়ে বা যেকোনো উপলক্ষে অনন্য উপহার।",
    icon: "gift",
  },
] as const;

/** Order policies, exactly as stated by the client. */
export const ORDER_POLICIES = [
  {
    title: "রেডিমেড প্রোডাক্ট",
    highlight: "সম্পূর্ণ ক্যাশ অন ডেলিভারি",
    description:
      "রেডিমেড প্রোডাক্টের অর্ডারে কোনো অগ্রিম পেমেন্ট লাগে না, সম্পূর্ণ মূল্য ক্যাশ অন ডেলিভারিতে পরিশোধ করা যায়।",
    icon: "wallet",
  },
  {
    title: "কাস্টম রেডিমেড প্রোডাক্ট",
    highlight: "২–৩ সপ্তাহ",
    description:
      "আপনার পছন্দমতো কাস্টম মিনিয়েচার তৈরি করতে সাধারণত ২–৩ সপ্তাহ সময় লাগে। অর্ডার কনফার্ম করতে মোট মূল্যের ৫০% অগ্রিম পেমেন্ট করতে হয়।",
    icon: "clock",
  },
  {
    title: "হ্যান্ডমেড মিনিয়েচার মডেল",
    highlight: "সম্পূর্ণ ক্যাশ অন ডেলিভারি",
    description:
      "এই সেবায় আমাদের শিল্পী সরাসরি আপনার বাসায় গিয়ে মডেলটি তৈরি করে দেন। এই অর্ডারে সম্পূর্ণ মূল্য ক্যাশ অন ডেলিভারিতে নেওয়া হয়।",
    icon: "house",
  },
] as const;

/** How ordering works, end to end, through WhatsApp. */
export const ORDER_STEPS = [
  {
    title: "পছন্দ করুন",
    description: "কালেকশন থেকে মডেল বেছে নিন, অথবা নিজের আইডিয়া ঠিক করুন।",
  },
  {
    title: "WhatsApp-এ মেসেজ দিন",
    description: "অর্ডার বাটনে চাপ দিলেই সরাসরি আমাদের WhatsApp চ্যাট খুলে যাবে।",
  },
  {
    title: "কনফার্ম করুন",
    description: "সাইজ, ডিজাইন ও মূল্য ঠিক করে অর্ডার কনফার্ম করুন।",
  },
  {
    title: "হাতে পেয়ে যান",
    description: "যত্ন করে তৈরি মিনিয়েচারটি পৌঁছে যাবে আপনার কাছে।",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "মিনিয়েচারের মূল্য কত থেকে শুরু?",
    answer:
      "আমাদের মিনিয়েচার মডেলের মূল্য শুরু ৮,৫০০ টাকা থেকে। সাইজ, ডিজাইন ও খুঁটিনাটির উপর ভিত্তি করে চূড়ান্ত মূল্য ঠিক করা হয়।",
  },
  {
    question: "অর্ডার করতে কি অগ্রিম পেমেন্ট দিতে হয়?",
    answer:
      "কাস্টম রেডিমেড প্রোডাক্টের ক্ষেত্রে মোট মূল্যের ৫০% অগ্রিম পেমেন্ট করে অর্ডার কনফার্ম করতে হয়। রেডিমেড প্রোডাক্টে কোনো অগ্রিম লাগে না, সম্পূর্ণ মূল্য ক্যাশ অন ডেলিভারিতে পরিশোধ করা যায়।",
  },
  {
    question: "কাস্টম মডেল তৈরি করতে কত দিন লাগে?",
    answer: "কাস্টম রেডিমেড প্রোডাক্ট তৈরি করতে সাধারণত ২–৩ সপ্তাহ সময় লাগে।",
  },
  {
    question: "হ্যান্ডমেড মিনিয়েচার মডেল সেবাটি কী?",
    answer:
      "এই সেবায় আমাদের শিল্পী সরাসরি আপনার বাসায় গিয়ে মিনিয়েচার মডেলটি তৈরি করে দেন। এই ধরনের অর্ডারে সম্পূর্ণ মূল্য ক্যাশ অন ডেলিভারিতে নেওয়া হয়।",
  },
  {
    question: "কী কী উপকরণ দিয়ে মডেল তৈরি হয়?",
    answer:
      "কাঠ, এমডিএফ, পিভিসি, রেজিন, ক্রকশিট, ক্লে, মস, বালি, কাগজসহ আরও নানা উপকরণ দিয়ে প্রতিটি মডেল তৈরি করা হয়।",
  },
  {
    question: "কীভাবে অর্ডার করব?",
    answer:
      "যেকোনো প্রোডাক্টের অর্ডার বাটনে চাপ দিলেই আমাদের WhatsApp চ্যাট খুলে যাবে। সেখানে আপনার পছন্দের মডেল বা আইডিয়া জানিয়ে অর্ডার কনফার্ম করুন।",
  },
] as const;
