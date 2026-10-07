import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND, CATEGORIES, NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import { toBanglaDigits } from "@/lib/format";
import { Logo } from "@/components/shared/logo";
import { FacebookIcon, WhatsAppIcon } from "@/components/shared/brand-icons";

const YEAR = toBanglaDigits(new Date().getFullYear());

function SocialLink({ href, label, external, children }: { href: string; label: string; external?: boolean; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        aria-label={external ? `${label} (নতুন ট্যাবে খুলবে)` : label}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="grid size-11 place-items-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-900"
      >
        {children}
      </a>
    </li>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-lg font-bold text-white">{children}</h2>;
}

export function SiteFooter() {
  return (
    <footer className="cv-auto relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-60" />
      <div aria-hidden className="absolute -top-32 left-1/2 -z-10 h-64 w-[50rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />

      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1fr_1.4fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200/80">
              হাতে তৈরি মিনিয়েচার ভিলেজ মডেল, টং দোকান, কাস্টম বাড়ির মডেল ও গিফট আইটেম। ছোট্ট পৃথিবী, বড় অনুভূতি।
            </p>
            <ul className="mt-6 flex gap-3" aria-label="সোশ্যাল ও যোগাযোগ">
              <SocialLink href={BRAND.facebookUrl} label="ফেসবুক পেজ" external>
                <FacebookIcon className="size-5" />
              </SocialLink>
              <SocialLink href={buildWhatsAppLink()} label="WhatsApp" external>
                <WhatsAppIcon className="size-5" />
              </SocialLink>
              <SocialLink href={`tel:${BRAND.phonePrimary}`} label="ফোন করুন">
                <Phone className="size-5" aria-hidden />
              </SocialLink>
              <SocialLink href={`mailto:${BRAND.email}`} label="ইমেইল করুন">
                <Mail className="size-5" aria-hidden />
              </SocialLink>
            </ul>
          </div>

          <div>
            <FooterHeading>পেজসমূহ</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>ক্যাটাগরি</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link href={`/products/category/${category.slug}`} className="transition-colors hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>যোগাযোগ</FooterHeading>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden />
                <span className="flex flex-col gap-1 font-latin">
                  <a href={`tel:${BRAND.phonePrimary}`} className="hover:text-white">{BRAND.phonePrimaryDisplay}</a>
                  <a href={`tel:${BRAND.phoneSecondary}`} className="hover:text-white">{BRAND.phoneSecondaryDisplay}</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden />
                <a href={`mailto:${BRAND.email}`} className="break-all font-latin hover:text-white">{BRAND.email}</a>
              </li>
              <li className="flex gap-3">
                <FacebookIcon className="mt-0.5 size-4 shrink-0 text-sky-300" />
                <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  ফেসবুক পেজ: <span lang="en">{BRAND.name}</span>
                  <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden />
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          lang="en"
          className="pointer-events-none mt-16 select-none overflow-hidden whitespace-nowrap bg-linear-to-b from-white/15 to-white/0 bg-clip-text text-center font-latin text-[11vw] font-bold leading-none tracking-tighter text-transparent lg:text-[8.5rem]"
        >
          {BRAND.name}
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-brand-300 sm:flex-row">
          <p>
            © {YEAR} <span lang="en">{BRAND.name}</span>। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p lang="en" className="font-script text-base text-brand-200">{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
