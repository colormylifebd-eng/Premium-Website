import type { ReactNode } from "react";
import { Logo } from "@/components/shared/logo";

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <div className="mb-8 flex justify-center">
        <Logo tone="light" />
      </div>
      <div className="rounded-[1.75rem] bg-white p-7 shadow-2xl ring-1 ring-black/5 sm:p-9">
        <h1 className="font-display text-2xl font-bold text-brand-950">{title}</h1>
        {description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>}
        <div className="mt-7">{children}</div>
      </div>
      {footer && <div className="mt-6 text-center text-sm text-brand-200">{footer}</div>}
    </div>
  );
}
