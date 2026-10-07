"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { GALLERY_IMAGES } from "@/lib/images";
import { SectionHeading } from "@/components/shared/section-heading";

type GalleryImage = (typeof GALLERY_IMAGES)[number];

function Tile({ image, hidden }: { image: GalleryImage; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-3xl bg-brand-900 ring-1 ring-white/10 sm:h-72 sm:w-[26rem]"
    >
      <Image
        src={image.src}
        alt={hidden ? "" : image.alt}
        fill
        sizes="(min-width: 640px) 416px, 288px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <figcaption className="absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-brand-950/70 px-4 py-2.5 text-sm font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {image.alt}
      </figcaption>
    </figure>
  );
}

/** Two rows of photos that slide in opposite directions as the page scrolls. */
export function WorkGallery() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rowOneX = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);

  const rows = [
    { images: GALLERY_IMAGES.slice(0, 4), x: rowOneX },
    { images: GALLERY_IMAGES.slice(4), x: rowTwoX },
  ];

  return (
    <section ref={ref} className="cv-auto relative overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-70" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tone="light"
          eyebrow="আমাদের কাজ"
          title={<>হাতে গড়া <span className="text-gradient-sky">ছোট্ট পৃথিবী</span></>}
          description="প্রতিটি ছবিই আমাদের নিজেদের তৈরি করা মডেলের। মাউস রাখলে বিস্তারিত দেখতে পাবেন।"
        />
      </div>
      <div className="relative mt-14 space-y-5">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            style={{ x: reduceMotion ? 0 : row.x }}
            className={rowIndex === 1 ? "flex w-max gap-5 pl-10" : "flex w-max gap-5"}
          >
            {[...row.images, ...row.images].map((image, index) => (
              <Tile key={`${image.src}-${index}`} image={image} hidden={index >= row.images.length} />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
