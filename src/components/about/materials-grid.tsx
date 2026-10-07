import { Boxes, Droplets, Hourglass, Layers, Plus, Scissors, Scroll, Shapes, Sprout, Trees } from "lucide-react";
import { MATERIALS, type MaterialIcon } from "@/lib/constants";
import { Reveal } from "@/components/shared/reveal";

const ICONS: Record<MaterialIcon, typeof Trees> = {
  trees: Trees,
  layers: Layers,
  boxes: Boxes,
  droplets: Droplets,
  scissors: Scissors,
  shapes: Shapes,
  sprout: Sprout,
  hourglass: Hourglass,
  scroll: Scroll,
};

const tileClass =
  "group flex h-full items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand-300";

export function MaterialsGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {MATERIALS.map((material, index) => {
        const Icon = ICONS[material.icon];
        return (
          <li key={material.nameEn}>
            <Reveal delay={index * 0.04} className="h-full">
              <div className={tileClass}>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold leading-tight text-brand-950">{material.name}</span>
                  <span lang="en" className="text-xs text-muted-foreground">{material.nameEn}</span>
                </span>
              </div>
            </Reveal>
          </li>
        );
      })}
      <li>
        <Reveal delay={MATERIALS.length * 0.04} className="h-full">
          <div className={tileClass}>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-700">
              <Plus className="size-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold leading-tight text-brand-950">এবং আরও অনেক কিছু</span>
          </div>
        </Reveal>
      </li>
    </ul>
  );
}
