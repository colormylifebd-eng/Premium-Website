import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { clsx } from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "light" is for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <span
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1",
            light ? "bg-white/10 text-brand-100 ring-white/15" : "bg-brand-50 text-brand-700 ring-brand-100"
          )}
        >
          <Sparkles className="size-4" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "mt-5 font-display text-3xl font-bold leading-[1.3] sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={clsx("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-brand-100/80" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}
