import Image from "next/image";
import { Gem, Gift, Hand, Leaf } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/images";
import { SpotlightCard } from "@/components/shared/motion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const ICONS = { hand: Hand, leaf: Leaf, gem: Gem, gift: Gift } as const;

export function FeaturesBento() {
  return (
    <section className="cv-auto relative overflow-hidden bg-white py-24 sm:py-28">
      <div aria-hidden className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="কেন Color My Life"
            title={<>প্রতিটি খুঁটিনাটিতে <span className="text-gradient-brand">যত্নের ছোঁয়া</span></>}
            description="শুধু একটি মডেল নয়, এটি একটি শিল্পকর্ম। তাই প্রতিটি কাজ শেষ হয় ধৈর্য আর নিখুঁত হাতের ছোঁয়ায়।"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="group relative h-full min-h-[24rem] overflow-hidden rounded-[2rem] bg-brand-950 shadow-xl">
              <Image
                src={SITE_IMAGES.teaShopCloseup}
                alt="চায়ের দোকানের মিনিয়েচারের ভেতরের খুঁটিনাটি"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">বাস্তবসম্মত ডিজাইন</span>
                <h3 className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">বয়াম, কেটলি, বেঞ্চ, সবকিছুই হাতে তৈরি</h3>
                <p className="mt-2 max-w-md text-brand-100/85">
                  ছোট্ট মডেলের প্রতিটি জিনিস আলাদা করে বানানো, তাই কাছ থেকে দেখলেও মনে হয় একদম আসল।
                </p>
              </div>
            </div>
          </Reveal>

          {FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal key={feature.title} delay={0.08 * (index + 1)}>
                <SpotlightCard className="h-full rounded-[1.75rem] bg-brand-50/70 p-7 ring-1 ring-brand-900/5">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-brand-950">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
