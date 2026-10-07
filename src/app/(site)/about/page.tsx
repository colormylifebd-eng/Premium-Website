import type { Metadata } from "next";
import { Clock, Gem, Gift, Hand, House, Leaf, Wallet } from "lucide-react";
import { FEATURES, ORDER_POLICIES } from "@/lib/constants";
import { toBanglaDigits } from "@/lib/format";
import { AboutCollage } from "@/components/about/about-collage";
import { MaterialsGrid } from "@/components/about/materials-grid";
import { CtaSection } from "@/components/home/cta-section";
import { FacebookButton } from "@/components/shared/cta-buttons";
import { FacebookIcon } from "@/components/shared/brand-icons";
import { SpotlightCard } from "@/components/shared/motion";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "আমাদের কথা",
  description:
    "Color My Life একটি বাংলাদেশি হ্যান্ডমেড মিনিয়েচার আর্ট ব্র্যান্ড। জানুন আমাদের গল্প, সেবা, অর্ডারের নিয়ম ও ব্যবহৃত উপকরণ সম্পর্কে।",
  alternates: { canonical: "/about" },
};

const FEATURE_ICONS = { hand: Hand, leaf: Leaf, gem: Gem, gift: Gift } as const;
const POLICY_ICONS = { wallet: Wallet, clock: Clock, house: House } as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="আমাদের কথা"
        title={
          // Fixed line break: the title stays two lines in any font, so nothing jumps when the web font loads.
          <>
            ছোট্ট পৃথিবী,
            <br />
            <span className="text-gradient-sky">বড় অনুভূতি</span>
          </>
        }
        description="Color My Life একটি বাংলাদেশি হ্যান্ডমেড মিনিয়েচার আর্ট ব্র্যান্ড। চেনা গ্রাম বাংলার দৃশ্যগুলোকে আমরা যত্ন করে ছোট্ট মডেলে তুলে আনি।"
        breadcrumbs={[{ label: "হোম", href: "/" }, { label: "আমাদের কথা" }]}
      />

      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="আমাদের গল্প"
              title={<>শুধু একটি মডেল নয়, <span className="text-gradient-brand">একটি শিল্পকর্ম</span></>}
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                গ্রামের টং দোকানের বেঞ্চ, টিনের চালের ঘর, পুকুরঘাটে বাঁধা নৌকা, এই দৃশ্যগুলো আমাদের সবার স্মৃতির অংশ।
                Color My Life সেই স্মৃতিগুলোকেই হাতে তৈরি মিনিয়েচারে রূপ দেয়, যাতে এক টুকরো গ্রাম বাংলা সবসময় আপনার ঘরে থাকে।
              </p>
              <p>
                প্রতিটি মডেল শুরু থেকে শেষ পর্যন্ত হাতে তৈরি। ঘরের চাল থেকে শুরু করে দোকানের বয়াম পর্যন্ত প্রতিটি খুঁটিনাটি
                আলাদা করে বানানো হয়।
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon];
                return (
                  <li key={feature.title} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-brand-900/5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-semibold text-brand-950">{feature.title}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <AboutCollage />
        </div>
      </section>

      <section className="cv-auto relative overflow-hidden bg-white py-24 sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="আমাদের সেবা"
              title={<>তিন ধরনের <span className="text-gradient-brand">অর্ডার সেবা</span></>}
              description="রেডিমেড মডেল, আপনার পছন্দের কাস্টম মডেল, অথবা আপনার বাসায় গিয়ে তৈরি করা হ্যান্ডমেড মডেল।"
            />
          </Reveal>
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {ORDER_POLICIES.map((policy, index) => {
              const Icon = POLICY_ICONS[policy.icon];
              return (
                <li key={policy.title}>
                  <Reveal delay={index * 0.1} className="h-full">
                    <SpotlightCard className="h-full rounded-[1.75rem] bg-brand-50/70 p-7 ring-1 ring-brand-900/5">
                      <div className="flex items-center justify-between">
                        <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                          <Icon className="size-6" aria-hidden />
                        </span>
                        <span className="font-display text-5xl font-extrabold text-brand-100">{toBanglaDigits(`0${index + 1}`)}</span>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-bold text-brand-950">{policy.title}</h3>
                      <p className="mt-1 font-semibold text-brand-600">{policy.highlight}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{policy.description}</p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="cv-auto py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="উপকরণ"
              title={<>যেসব উপকরণে <span className="text-gradient-brand">প্রাণ পায়</span> মডেলগুলো</>}
              description="টেকসই ও মানসম্মত উপকরণ বেছে নেওয়া হয়, যাতে মডেলটি বছরের পর বছর সুন্দর থাকে।"
            />
          </Reveal>
          <div className="mt-14">
            <MaterialsGrid />
          </div>
        </div>
      </section>

      <section className="cv-auto px-4 pb-24 sm:px-8">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-[2rem] bg-linear-to-br from-[#1877F2] to-brand-700 p-8 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <FacebookIcon className="size-7" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">ফেসবুকে আমাদের সাথে থাকুন</h2>
              <p className="mt-2 max-w-xl text-white/85">নতুন কাজের ছবি ও ভিডিও সবার আগে দেখতে আমাদের ফেসবুক পেজ ফলো করুন।</p>
            </div>
          </div>
          <FacebookButton label="ফেসবুক পেজ ভিজিট করুন" className="shrink-0" />
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
