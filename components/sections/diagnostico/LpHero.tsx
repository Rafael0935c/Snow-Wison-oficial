import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { LpCta } from "@/components/sections/diagnostico/LpCta";
import { brand, diagnostico } from "@/lib/content";

export function LpHero() {
  return (
    <section className="relative mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center lg:pb-32 lg:pt-32">
      <AmbientGlow intensity={0.10} size={40} />

      <Reveal delay={0.05} className="relative flex flex-col items-center">
        <BrandMark size={64} glow priority />
        <span className="mt-4 font-display text-sm font-extrabold tracking-[0.16em] text-ivory">
          {brand.wordmark}
        </span>
      </Reveal>

      <Reveal delay={0.2} className="relative mt-14">
        <p className="font-utility text-[0.8rem] uppercase tracking-[0.18em] text-blue-soft">
          {diagnostico.hero.eyebrow}
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ivory">
          {diagnostico.hero.heading}
        </h1>
      </Reveal>

      <Reveal
        delay={0.38}
        className="relative mt-8 flex max-w-xl flex-col items-center gap-10"
      >
        <p className="text-base leading-[1.65] text-ivory/70 lg:text-lg">
          {diagnostico.hero.paragraph}
        </p>

        <div className="flex flex-col items-center gap-4">
          <LpCta>{diagnostico.hero.cta}</LpCta>
          <p className="font-utility text-xs text-ivory/50">
            {diagnostico.hero.microcopy}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
