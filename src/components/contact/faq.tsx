"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { clsx } from "clsx";

type FaqItem = { readonly question: string; readonly answer: string };

/** Accessible accordion: buttons expose aria-expanded and control their answer panel. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-brand-900/10 rounded-[1.75rem] bg-white px-5 shadow-sm ring-1 ring-brand-900/5 sm:px-8">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold text-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 sm:text-xl"
              >
                {item.question}
                <span
                  className={clsx(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                    open ? "rotate-45 bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 leading-relaxed text-muted-foreground">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
