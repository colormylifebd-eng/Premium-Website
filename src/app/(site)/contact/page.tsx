import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, FAQ_ITEMS, buildWhatsAppLink } from "@/lib/constants";
import { Faq } from "@/components/contact/faq";
import { MapEmbed } from "@/components/contact/map-embed";
import { FacebookIcon, WhatsAppIcon } from "@/components/shared/brand-icons";
import { JsonLd } from "@/components/shared/json-ld";
import { SpotlightCard } from "@/components/shared/motion";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: `অর্ডার বা কাস্টম ডিজাইনের জন্য Color My Life এর সাথে WhatsApp, ফোন, ফেসবুক বা ইমেইলে যোগাযোগ করুন। ঠিকানা: ${BRAND.address}।`,
  alternates: { canonical: "/contact" },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function ContactCard({ icon, iconClass, title, children }: { icon: ReactNode; iconClass: string; title: string; children: ReactNode }) {
  return (
    <SpotlightCard className="h-full rounded-[1.75rem] bg-white p-6 shadow-[0_20px_50px_-25px_rgba(8,19,49,0.35)] ring-1 ring-brand-900/5 sm:p-7">
      <span className={`grid size-12 place-items-center rounded-2xl text-white shadow-lg ${iconClass}`}>{icon}</span>
      <h2 className="mt-5 font-display text-xl font-bold text-brand-950">{title}</h2>
      <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">{children}</div>
    </SpotlightCard>
  );
}

const actionClass = "mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-900";

export default function ContactPage() {
  const mapQuery = encodeURIComponent(BRAND.mapQuery);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <PageHero
        eyebrow="যোগাযোগ"
        title={<>চলুন, আপনার <span className="text-gradient-sky">স্বপ্নের মডেল</span> নিয়ে কথা বলি</>}
        description="অর্ডার, কাস্টম ডিজাইন বা যেকোনো প্রশ্নে সরাসরি WhatsApp, ফোন, ফেসবুক বা ইমেইলে যোগাযোগ করুন।"
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "যোগাযোগ" }]}
      />

      <section className="relative z-10 -mt-12 pb-20">
        <ul className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <li>
            <Reveal className="h-full">
              <ContactCard title="WhatsApp" iconClass="bg-whatsapp" icon={<WhatsAppIcon className="size-6" />}>
                <p>অর্ডারের সবচেয়ে সহজ উপায়</p>
                <p className="font-latin font-semibold text-brand-950">{BRAND.phonePrimaryDisplay}</p>
                <a href={buildWhatsAppLink()} {...external} className={actionClass}>
                  চ্যাট শুরু করুন <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
                </a>
              </ContactCard>
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.08} className="h-full">
              <ContactCard title="ফোন করুন" iconClass="bg-brand-600" icon={<Phone className="size-6" aria-hidden />}>
                <p>সরাসরি কথা বলুন</p>
                <a href={`tel:${BRAND.phonePrimary}`} className="block font-latin font-semibold text-brand-950 hover:text-brand-700">
                  {BRAND.phonePrimaryDisplay}
                </a>
                <a href={`tel:${BRAND.phoneSecondary}`} className="block font-latin font-semibold text-brand-950 hover:text-brand-700">
                  {BRAND.phoneSecondaryDisplay}
                </a>
              </ContactCard>
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.16} className="h-full">
              <ContactCard title="ফেসবুক পেজ" iconClass="bg-[#1877F2]" icon={<FacebookIcon className="size-6" />}>
                <p>নতুন কাজের ছবি ও ভিডিও দেখুন</p>
                <p lang="en" className="font-semibold text-brand-950">{BRAND.name}</p>
                <a href={BRAND.facebookUrl} {...external} className={actionClass}>
                  পেজ ভিজিট করুন <ArrowUpRight className="size-4" aria-hidden />
                  <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
                </a>
              </ContactCard>
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.24} className="h-full">
              <ContactCard title="ইমেইল" iconClass="bg-accent-500" icon={<Mail className="size-6" aria-hidden />}>
                <p>বিস্তারিত জানাতে লিখুন</p>
                <a href={`mailto:${BRAND.email}`} className="block break-all font-latin font-semibold text-brand-950 hover:text-brand-700">
                  {BRAND.email}
                </a>
              </ContactCard>
            </Reveal>
          </li>
        </ul>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="flex flex-col justify-between rounded-[1.75rem] bg-brand-950 p-7 text-white sm:p-9">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-sky-300 ring-1 ring-white/15">
                <MapPin className="size-6" aria-hidden />
              </span>
              <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">আমাদের ঠিকানা</h2>
              <address className="mt-3 not-italic">
                <span className="block text-lg text-brand-100">{BRAND.address}</span>
                <span lang="en" className="mt-1 block text-sm text-brand-300">{BRAND.addressEn}</span>
              </address>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              {...external}
              className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-5 font-semibold text-brand-950 transition hover:bg-brand-50"
            >
              Google Maps-এ দেখুন <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only"> (নতুন ট্যাবে খুলবে)</span>
            </a>
          </Reveal>
          <Reveal delay={0.1} className="min-h-80 overflow-hidden rounded-[1.75rem] bg-brand-50 shadow-sm ring-1 ring-brand-900/5">
            <MapEmbed query={BRAND.mapQuery} title={`Color My Life এর অবস্থান: ${BRAND.address}`} />
          </Reveal>
        </div>
      </section>

      <section className="cv-auto pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading eyebrow="জিজ্ঞাসা" title={<>সাধারণ <span className="text-gradient-brand">প্রশ্ন ও উত্তর</span></>} />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Faq items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
