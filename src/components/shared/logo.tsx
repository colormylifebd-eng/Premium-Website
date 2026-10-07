import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/images";
import { clsx } from "clsx";

type LogoProps = {
  tone?: "light" | "dark";
  /** "desktop" hides the tagline on small screens to save space. */
  tagline?: "always" | "desktop" | "never";
  href?: string;
  className?: string;
  onClick?: () => void;
};

export function Logo({ tone = "light", tagline = "always", href = "/", className, onClick }: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "group inline-flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
        className
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[0.9rem] bg-white shadow-md ring-1 ring-black/5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <Image src={SITE_IMAGES.logo} alt="" width={44} height={44} className="size-full object-contain p-0.5" />
      </span>
      <span lang="en" className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-latin text-[1.05rem] font-bold tracking-tight transition-colors duration-500",
            tone === "light" ? "text-white" : "text-brand-950"
          )}
        >
          {BRAND.name}
        </span>
        {tagline !== "never" && (
          <span
            className={clsx(
              "mt-1 font-script text-[0.85rem] transition-colors duration-500",
              tagline === "desktop" && "hidden sm:block",
              tone === "light" ? "text-brand-200" : "text-brand-600"
            )}
          >
            {BRAND.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
