"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LENS_SIZE = 190;
const ZOOM = 2.4;

type LensState = { x: number; y: number; width: number; height: number };

/** Product photo with a magnifying lens that follows the mouse, to show off the fine detail. */
export function ImageLens({ src, alt }: { src: string; alt: string }) {
  const [lens, setLens] = useState<LensState | null>(null);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-50 lg:cursor-zoom-in"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setLens({ x: event.clientX - rect.left, y: event.clientY - rect.top, width: rect.width, height: rect.height });
      }}
      onPointerLeave={() => setLens(null)}
    >
      <Image src={src} alt={alt} fill preload sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      <AnimatePresence>
        {lens && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute overflow-hidden rounded-full shadow-2xl ring-4 ring-white"
            style={{ width: LENS_SIZE, height: LENS_SIZE, left: lens.x - LENS_SIZE / 2, top: lens.y - LENS_SIZE / 2 }}
          >
            <div
              className="absolute"
              style={{
                width: lens.width * ZOOM,
                height: lens.height * ZOOM,
                left: LENS_SIZE / 2 - lens.x * ZOOM,
                top: LENS_SIZE / 2 - lens.y * ZOOM,
              }}
            >
              <Image src={src} alt="" fill sizes="1400px" className="object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
