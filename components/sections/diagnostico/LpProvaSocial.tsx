import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppBubble } from "@/components/sections/resultados/WhatsAppBubble";
import { diagnostico, resultados, testimonials } from "@/lib/content";

// Seleção curada para a LP: os depoimentos que respondem às objeções
// mais comuns de quem chega por anúncio (começar do zero, medo da
// primeira aula, já ter tentado outros cursos).
const FEATURED_IDS = ["t7", "t6", "t5", "t2", "t10", "t9"];

export function LpProvaSocial() {
  const featured = FEATURED_IDS.flatMap((id) => {
    const match = testimonials.find((t) => t.id === id);
    return match?.quote ? [match] : [];
  });

  // Vídeos aparecem automaticamente assim que qualquer depoimento em
  // lib/content.ts receber um `videoUrl` — sem placeholder enquanto isso,
  // para a página nunca ir ao ar com bloco vazio.
  const videos = testimonials.filter((t) => t.videoUrl);

  if (featured.length === 0 && videos.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal className="text-center">
        <SectionLabel className="justify-center">
          {diagnostico.provaSocial.eyebrow}
        </SectionLabel>
        <h2 className="mx-auto mt-9 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {diagnostico.provaSocial.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-ivory/55">
          {diagnostico.provaSocial.note}
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 flex flex-col items-center gap-2">
        <p className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none text-ivory">
          {resultados.numero.value}
        </p>
        <p className="font-utility text-xs uppercase tracking-[0.14em] text-ivory/55">
          {resultados.numero.label}
        </p>
      </Reveal>

      {videos.length > 0 && (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.1}>
              <video
                src={testimonial.videoUrl}
                controls
                preload="none"
                poster={testimonial.photoUrl}
                className="aspect-video w-full rounded-sm bg-navy"
              />
              <p className="mt-3 font-display text-sm font-semibold text-ivory">
                {testimonial.name}
              </p>
              <p className="font-utility text-[0.65rem] uppercase tracking-[0.1em] text-blue-soft">
                {testimonial.role}
              </p>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3">
        {featured.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={(index % 3) * 0.08}>
            <WhatsAppBubble testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
