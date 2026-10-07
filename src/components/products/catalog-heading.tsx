import { toBanglaNumber } from "@/lib/format";

export function CatalogHeading({ title, description, count }: { title: string; description: string; count: number }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{title}</h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <p className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
        {toBanglaNumber(count)}টি মডেল
      </p>
    </div>
  );
}
