import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PathProgress } from "@/components/ui/PathProgress";
import { modalidades } from "@/lib/content";

export function PremiumDestaque() {
  return (
    <section className="relative overflow-hidden border-y border-line-strong bg-navy px-6 py-24 lg:px-10 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(47,140,240,0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel>{modalidades.premiumDestaque.eyebrow}</SectionLabel>
          <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {modalidades.premiumDestaque.heading}
          </h2>
          <p className="mt-6 max-w-md leading-[1.65] text-ivory/62">
            {modalidades.premiumDestaque.paragraph}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {modalidades.premiumDestaque.criteria.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong px-4 py-1.5 font-utility text-xs uppercase tracking-[0.08em] text-ivory/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.18}
          className="flex items-center lg:col-span-6 lg:col-start-7"
        >
          <PathProgress />
        </Reveal>
      </div>
    </section>
  );
}
