"use client";

import type { ReactNode } from "react";
import { clsx } from "clsx";
import { MotionConfig, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

// clsx (not cn/tailwind-merge) keeps tailwind-merge out of the public site's JavaScript.

/** Respects the visitor's "reduce motion" OS setting for every animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Card whose background lights up around the mouse cursor. */
export function SpotlightCard({
  children,
  className,
  color = "rgba(47, 99, 221, 0.14)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const background = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, ${color}, transparent 72%)`;

  return (
    <div
      className={clsx("group/spot relative isolate overflow-hidden", className)}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}

const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.5 };

/** 3D tilt that follows the mouse, with a soft light glare (desktop only). */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const glareOpacity = useSpring(0, TILT_SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 60%)`;

  return (
    <div className="h-full [perspective:1100px]">
      <motion.div
        className={clsx("relative h-full", className)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(event) => {
          if (reduceMotion || event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          rotateY.set((px - 0.5) * 2 * maxTilt);
          rotateX.set((0.5 - py) * 2 * maxTilt);
          glareX.set(px * 100);
          glareY.set(py * 100);
          glareOpacity.set(1);
        }}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
          glareOpacity.set(0);
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  );
}

const MAGNET_SPRING = { stiffness: 180, damping: 14, mass: 0.35 };

/** Pulls its child slightly towards the cursor on hover. */
export function Magnetic({ children, className, strength = 0.25 }: { children: ReactNode; className?: string; strength?: number }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, MAGNET_SPRING);
  const y = useSpring(0, MAGNET_SPRING);

  return (
    <motion.div
      className={clsx("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
