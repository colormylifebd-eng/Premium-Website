import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Spotlight } from "./spotlight";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
};

/** Dark banner at the top of inner pages. The floating header sits on top of it. */
export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pb-24 pt-36 text-white sm:pb-28 sm:pt-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[110px]" />
        <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-accent-500/15 blur-[100px]" />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-32 md:left-24" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {breadcrumbs && (
          <div className="animate-in fade-in duration-700 fill-mode-both">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-100 ring-1 ring-white/15 backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both">
            <Sparkles className="size-4" aria-hidden />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.25] sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
