import { Reveal } from "@/components/ui/Reveal";
import { LpButton } from "@/components/lp/LpButton";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { TestimonialCarousel } from "@/components/lp/TestimonialCarousel";
import { diagnostico, testimonials } from "@/lib/content";

const t = diagnostico.avaliacoes;

// Ordem do carrossel: primeiro as que respondem às objeções mais comuns
// de quem chega por anúncio (já ter tentado outros cursos, começar do
// zero, medo da primeira aula). Todas são mensagens reais.
const ORDER = [
  "t7",
  "t2",
  "t6",
  "t5",
  "t10",
  "t9",
  "t3",
  "t1",
  "t4",
  "t11",
  "t8",
  "t12",
];

/** A única seção em marfim da página (decisão de 11/11/2026, em teste). */
export function Avaliacoes() {
  const items = ORDER.flatMap((id) => {
    const match = testimonials.find((x) => x.id === id);
    return match?.quote ? [match] : [];
  });
  if (items.length === 0) return null;

  return (
    <section
      id="avaliacoes"
      aria-labelledby="avaliacoes-titulo"
      className="relative z-10 bg-ivory py-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal variant="display" className="max-w-2xl">
          <LpEyebrow number="03" tone="light">
            {t.eyebrow}
          </LpEyebrow>
          <h2
            id="avaliacoes-titulo"
            className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
          >
            {t.heading}
          </h2>
          <p className="mt-4 text-sm leading-[1.6] text-navy/70">{t.note}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <TestimonialCarousel items={items} />
        </Reveal>

        <div className="mt-10 flex justify-center">
          <LpButton quiz>{t.cta}</LpButton>
        </div>
      </div>
    </section>
  );
}
