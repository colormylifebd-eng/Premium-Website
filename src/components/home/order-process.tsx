import { Clock, House, Wallet } from "lucide-react";
import { MIN_PRICE, ORDER_POLICIES, ORDER_STEPS } from "@/lib/constants";
import { formatPrice, toBanglaDigits } from "@/lib/format";
import { SpotlightCard } from "@/components/shared/motion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const POLICY_ICONS = { wallet: Wallet, clock: Clock, house: House } as const;

/** Ordering steps plus the client's payment / timing policies. */
export function OrderProcess() {
  return (
    <section id="order-process" className="cv-auto relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="অর্ডার প্রক্রিয়া"
            title={<>মাত্র ৪ ধাপে <span className="text-gradient-brand">অর্ডার করুন</span></>}
            description="কোনো ঝামেলা নেই। সরাসরি WhatsApp-এ কথা বলে আপনার পছন্দের মিনিয়েচারটি অর্ডার করুন।"
          />
        </Reveal>

        <div className="relative mt-14">
          <div aria-hidden className="absolute left-[12%] right-[12%] top-[3.25rem] hidden h-px bg-linear-to-r from-transparent via-brand-300 to-transparent lg:block" />
          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER_STEPS.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.1} className="h-full">
                  <div className="h-full rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-brand-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-950 font-display text-2xl font-bold text-white shadow-lg">
                      {toBanglaDigits(index + 1)}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-brand-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-brand-950 sm:text-3xl">অর্ডারের নিয়মাবলী</h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              মূল্য শুরু {formatPrice(MIN_PRICE)} থেকে। অর্ডারের ধরন অনুযায়ী পেমেন্ট ও সময়ের নিয়ম:
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {ORDER_POLICIES.map((policy, index) => {
              const Icon = POLICY_ICONS[policy.icon];
              return (
                <li key={policy.title}>
                  <Reveal delay={index * 0.1} className="h-full">
                    <SpotlightCard color="rgba(143, 211, 255, 0.16)" className="h-full rounded-[1.75rem] bg-brand-950 p-7 text-white ring-1 ring-white/10">
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-sky-300 ring-1 ring-white/15">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <h4 className="font-display text-lg font-bold">{policy.title}</h4>
                      </div>
                      <p className="mt-6 font-display text-3xl font-extrabold leading-snug">
                        <span className="text-gradient-sky">{policy.highlight}</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-brand-100/80">{policy.description}</p>
                    </SpotlightCard>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
