import type { ComponentProps, CSSProperties } from "react";
import { clsx } from "clsx";

type RevealProps = ComponentProps<"div"> & {
  /** Staggers neighbouring items: 0.1 starts the reveal slightly later in the scroll. */
  delay?: number;
};

/**
 * Fades and slides its content in as it scrolls into view.
 * Pure CSS (scroll-driven animations, see `.reveal` in globals.css): no
 * JavaScript, and nothing stays hidden while scripts download. Browsers
 * without support, and visitors who prefer reduced motion, just see the content.
 */
export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  const stagger = delay > 0 ? ({ "--reveal-delay": `${Math.round(delay * 40)}%` } as CSSProperties) : null;
  return <div {...props} className={clsx("reveal", className)} style={stagger ? { ...stagger, ...style } : style} />;
}
