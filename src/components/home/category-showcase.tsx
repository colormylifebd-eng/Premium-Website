import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategoryWithCount } from "@/lib/data";
import { toBanglaNumber } from "@/lib/format";
import { CATEGORY_IMAGES } from "@/lib/images";
import { TiltCard } from "@/components/shared/motion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function CategoryShowcase({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <section className="cv-auto relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="আমাদের কালেকশন"
            title={<>আপনার পছন্দের <span className="text-gradient-brand">মিনিয়েচার</span> বেছে নিন</>}
            description="গ্রামের দৃশ্য থেকে শুরু করে নিজের বাড়ির হুবহু মডেল, প্রতিটি ক্যাটাগরির কাজ আলাদা যত্নে তৈরি।"
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <TiltCard className="group rounded-[1.75rem]">
                  <Link
                    href={`/products/category/${category.slug}`}
                    className="relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-brand-900 shadow-xl ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400"
                  >
                    <Image
                      src={CATEGORY_IMAGES[category.slug]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                        {category._count.products > 0 ? `${toBanglaNumber(category._count.products)}টি মডেল` : "কাস্টম অর্ডার"}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-bold">{category.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-white/80">{category.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                        দেখুন
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
