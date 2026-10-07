"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Gift, Hand } from "lucide-react";
import { MIN_PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { SITE_IMAGES } from "@/lib/images";
import { WhatsAppButton } from "@/components/shared/cta-buttons";
import { Magnetic } from "@/components/shared/motion";
import { Spotlight } from "@/components/shared/spotlight";

const STATS = [
  { value: formatPrice(MIN_PRICE), label: "থেকে মূল্য শুরু" },
  { value: "১০০%", label: "হাতের কাজ" },
  { value: "২–৩ সপ্তাহ", label: "কাস্টম অর্ডারে" },
];

const SPRING = { stiffness: 70, damping: 18, mass: 0.6 };

/**
 * Home hero: the photo stack tilts in 3D and its layers drift at different
 * depths as the mouse moves; everything parallaxes on scroll.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const nearX = useTransform(springX, [-0.5, 0.5], [-26, 26]);
  const nearY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const farX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const farY = useTransform(springY, [-0.5, 0.5], [12, -12]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden bg-brand-950 text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute -left-40 top-24 size-[32rem] rounded-full bg-brand-600/35 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 size-[28rem] rounded-full bg-sky-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[22rem] rounded-full bg-accent-500/20 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-40" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-center gap-16 px-5 pb-32 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-36">
        <motion.div style={{ y: reduceMotion ? 0 : textY, opacity: reduceMotion ? 1 : fade }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-100 ring-1 ring-white/15 backdrop-blur animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-300 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-sky-300" />
            </span>
            হাতে তৈরি মিনিয়েচার আর্ট
          </span>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.22] sm:text-6xl lg:text-[4.1rem] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
            এক টুকরো গ্রাম
            <br />
            <span className="text-gradient-sky">এখন আপনার ঘরে</span>
          </h1>

          <p lang="en" className="mt-2 font-script text-2xl text-accent-200 sm:text-3xl animate-in fade-in duration-1000 delay-300 fill-mode-both">
            Color Your Imagination
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            গ্রাম বাংলার টং দোকান, পুকুরপাড়ের উঠান আর টিনের চালের ঘর, চেনা জীবনের বাস্তব অনুভূতি এখন মিনিয়েচার মডেলে।
            প্রতিটি মডেল সম্পূর্ণ হাতে তৈরি, যত্ন আর ভালোবাসায়।
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <Magnetic>
              <WhatsAppButton variant="light" />
            </Magnetic>
            <Link
              href="/products"
              className="group inline-flex h-14 items-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
            >
              কালেকশন দেখুন
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <ul className="mt-10 grid max-w-lg grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
            {STATS.map((stat) => (
              <li key={stat.label} className="rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10 backdrop-blur sm:px-4">
                <p className="font-display text-lg font-bold leading-snug sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-xs text-brand-200 sm:text-sm">{stat.label}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div style={{ y: reduceMotion ? 0 : visualY }} className="relative mx-auto w-full max-w-[24rem] sm:max-w-md lg:max-w-none">
          <div className="[perspective:1400px] animate-in fade-in zoom-in-95 duration-1000 delay-200 fill-mode-both">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
              <div aria-hidden className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-tr from-brand-500/40 via-sky-400/20 to-accent-400/30 blur-2xl" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-brand-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
                <Image
                  src={SITE_IMAGES.studioDiorama}
                  alt="হাতে তৈরি গোলাকার গ্রামের মিনিয়েচার ডায়োরামা"
                  fill
                  preload
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 90vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur-md">
                  <p className="text-xs text-brand-100">সিগনেচার কালেকশন</p>
                  <p className="font-display text-lg font-bold">গ্রাম বাংলার ডায়োরামা</p>
                </div>
              </div>

              <motion.div style={{ x: nearX, y: nearY, z: 60 }} className="absolute -left-5 top-10 w-28 sm:-left-14 sm:w-40">
                <figure className="rotate-[-8deg] rounded-2xl bg-white p-2 pb-2.5 shadow-2xl">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={SITE_IMAGES.teaShopCloseup} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-center text-xs font-semibold text-brand-950 sm:text-sm">বিস্তারিত কারুকাজ</figcaption>
                </figure>
              </motion.div>

              <motion.div style={{ x: farX, y: farY, z: 40 }} className="absolute -right-4 bottom-24 w-28 sm:-right-12 sm:w-40">
                <figure className="rotate-[7deg] rounded-2xl bg-white p-2 pb-2.5 shadow-2xl">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={SITE_IMAGES.villageNight} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-center text-xs font-semibold text-brand-950 sm:text-sm">প্রিমিয়াম ফিনিশিং</figcaption>
                </figure>
              </motion.div>

              <motion.div style={{ x: farX, z: 80 }} className="absolute -right-3 top-6 hidden sm:block">
                <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-brand-950 shadow-xl animate-float motion-reduce:animate-none">
                  <span className="grid size-7 place-items-center rounded-full bg-brand-100 text-brand-700"><Hand className="size-4" aria-hidden /></span>
                  সম্পূর্ণ হাতের কাজ
                </div>
              </motion.div>

              <motion.div style={{ x: nearX, z: 70 }} className="absolute -left-8 bottom-32 hidden sm:block">
                <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-brand-950 shadow-xl animate-float-slow motion-reduce:animate-none">
                  <span className="grid size-7 place-items-center rounded-full bg-accent-100 text-accent-700"><Gift className="size-4" aria-hidden /></span>
                  চমৎকার গিফট আইডিয়া
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
