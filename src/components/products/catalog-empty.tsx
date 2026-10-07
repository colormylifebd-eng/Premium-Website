import { PackageOpen } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/cta-buttons";

/** Shown when a category has no products yet. Steers visitors to a custom order instead. */
export function CatalogEmpty({ message }: { message: string }) {
  return (
    <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-brand-900/5">
      <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <PackageOpen className="size-8" aria-hidden />
      </span>
      <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{message}</h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        আপনার পছন্দের ডিজাইনটি জানালে আমরা কাস্টম অর্ডারে তৈরি করে দিতে পারি।
      </p>
      <WhatsAppButton label="কাস্টম অর্ডারের জন্য মেসেজ দিন" className="mt-8" />
    </div>
  );
}
