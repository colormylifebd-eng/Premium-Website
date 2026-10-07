/**
 * Every static photo used by the public site, in one place.
 *
 * The files live in /public/images. To use the client's real photos, copy
 * them over the placeholder files using the exact same file names; no
 * code changes are needed. Product photos are uploaded via /admin instead.
 */
export const SITE_IMAGES = {
  logo: "/images/logo.png",
  studioDiorama: "/images/studio-diorama.jpg",
  customHouse: "/images/custom-house.jpg",
  teaShopCloseup: "/images/tea-shop-closeup.jpg",
  teaShopRooftop: "/images/tea-shop-rooftop.jpg",
  teaShopIndoor: "/images/tea-shop-indoor.jpg",
  villageSkyline1: "/images/village-skyline-1.jpg",
  villageSkyline2: "/images/village-skyline-2.jpg",
  villageLedge: "/images/village-ledge.jpg",
  villageTopdown: "/images/village-topdown.jpg",
  villageNight: "/images/village-night.jpg",
  islandHut1: "/images/island-hut-1.jpg",
  islandHut2: "/images/island-hut-2.jpg",
} as const;

/** Cover image shown for each fixed category on the home page. */
export const CATEGORY_IMAGES: Record<string, string> = {
  "village-model": SITE_IMAGES.villageTopdown,
  "tea-shop-model": SITE_IMAGES.teaShopRooftop,
  "custom-house-model": SITE_IMAGES.customHouse,
  "gift-item": SITE_IMAGES.islandHut2,
};

/** Photos used in the scrolling "our work" gallery on the home page. */
export const GALLERY_IMAGES = [
  { src: SITE_IMAGES.teaShopCloseup, alt: "টং দোকানের ভেতরের খুঁটিনাটি কাজ" },
  { src: SITE_IMAGES.villageSkyline2, alt: "পুকুরপাড়ের গ্রামের মিনিয়েচার মডেল" },
  { src: SITE_IMAGES.islandHut1, alt: "রেজিনের পানিতে ঘেরা দ্বীপের কুঁড়েঘর" },
  { src: SITE_IMAGES.villageNight, alt: "আলো জ্বলা গ্রামের বাড়ির মিনিয়েচার" },
  { src: SITE_IMAGES.teaShopIndoor, alt: "সাইনবোর্ডসহ চায়ের দোকানের মিনিয়েচার" },
  { src: SITE_IMAGES.villageLedge, alt: "নৌকা ও ঘাটসহ গ্রামের মিনিয়েচার দৃশ্য" },
  { src: SITE_IMAGES.villageTopdown, alt: "উপর থেকে দেখা গ্রামের উঠান ও পুকুর" },
  { src: SITE_IMAGES.islandHut2, alt: "কালো রেজিন বেসে দ্বীপের মিনিয়েচার" },
] as const;
