import { MATERIALS } from "@/lib/constants";
import { Marquee } from "@/components/shared/marquee";

/** Tilted, endlessly scrolling band listing the materials the client works with. */
export function MaterialsMarquee() {
  return (
    <section aria-label="যেসব উপকরণে তৈরি" className="relative z-10 -mt-10 overflow-hidden py-8">
      <div className="-mx-6 -rotate-1 bg-brand-600 py-4 text-white shadow-[0_20px_40px_-20px_rgba(29,71,184,0.8)]">
        <Marquee duration={36}>
          {MATERIALS.map((material) => (
            <span key={material.nameEn} className="mx-5 flex items-center gap-5 whitespace-nowrap font-display text-xl font-bold sm:text-2xl">
              {material.name}
              <span lang="en" className="font-script text-lg font-normal text-brand-200 sm:text-xl">
                {material.nameEn}
              </span>
              <span aria-hidden className="text-accent-300">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
