import Link from "next/link";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

/**
 * Always a single line (the current page's label is shortened with "…").
 * If it wrapped, its height would change when the Bangla web font finishes
 * loading and push the content below it (a layout shift).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="ব্রেডক্রাম্ব">
      <ol className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-sm text-brand-200">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={clsx("flex items-center gap-1.5", current ? "min-w-0" : "shrink-0")}>
              {index > 0 && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" title={item.label} className="truncate font-semibold text-white">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
