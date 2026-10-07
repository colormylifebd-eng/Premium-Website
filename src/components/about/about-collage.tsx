"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Hand } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";

/** Two overlapping photos that drift at different speeds while scrolling. */
export function AboutCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      <motion.div
        style={{ y: reduceMotion ? 0 : backY }}
        className="absolute right-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5"
      >
        <Image
          src={SITE_IMAGES.villageSkyline2}
          alt="শহরের ছাদে হাতে ধরা গ্রামের মিনিয়েচার মডেল"
          fill
          sizes="(min-width: 1024px) 440px, 78vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        style={{ y: reduceMotion ? 0 : frontY }}
        className="absolute bottom-0 left-0 h-[55%] w-[58%] overflow-hidden rounded-[1.75rem] border-[6px] border-background shadow-2xl"
      >
        <Image
          src={SITE_IMAGES.villageNight}
          alt="রাতে আলো জ্বলা গ্রামের বাড়ির মিনিয়েচার"
          fill
          sizes="(min-width: 1024px) 330px, 58vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute bottom-[18%] right-[4%] flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 animate-float motion-reduce:animate-none">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-600 text-white">
          <Hand className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-display text-lg font-bold leading-none text-brand-950">১০০%</p>
          <p className="mt-1 text-xs text-muted-foreground">হাতের কাজ</p>
        </div>
      </div>
    </div>
  );
}
