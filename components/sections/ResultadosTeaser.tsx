import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { VideoTestimonial } from "@/components/ui/VideoTestimonial";
import { WhatsAppBubble } from "@/components/sections/resultados/WhatsAppBubble";
import { home, resultados, testimonials } from "@/lib/content";

// Recorte para a home: um vídeo (aluna identificada e com uso de imagem
// autorizado) e três mensagens curtas, de modalidades diferentes, que
// falam de evolução e de método. O resto fica em /resultados.
const VIDEO_ID = "t11";
const QUOTE_IDS = ["t9", "t4", "t6"];

export function ResultadosTeaser() {
  const video = testimonials.find((t) => t.id === VIDEO_ID && t.videoUrl);
  const quotes = QUOTE_IDS.flatMap((id) => {
    const match = testimonials.find((t) => t.id === id);
    return match?.quote ? [match] : [];
  });

  if (!video && quotes.length === 0) return null;

  return (
    <section
      id="resultados"
      className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
    >
      <AmbientGlow intensity={0.08} size={42} />

      {/* min-w-0 nos dois filhos: sem ele, a faixa de deslizar (larga por
          natureza) alarga a coluna da grade além da tela no celular. */}
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="min-w-0 lg:col-span-4" variant="display">
          <SectionLabel>{home.resultados.eyebrow}</SectionLabel>
          <h2 className="mt-8 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {resultados.intro.heading}
          </h2>
          <p className="mt-5 max-w-sm leading-[1.65] text-ivory/62">
            {home.resultados.support}
          </p>
          <Link
            href="/resultados"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 font-display text-sm font-semibold text-ivory/85 transition-colors hover:text-ivory"
          >
            {home.resultados.cta}
            <ArrowRight
              className="h-4 w-4 text-blue-soft transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <p className="mt-6 hidden font-utility text-[0.68rem] leading-[1.6] text-ivory/40 lg:block">
            {home.resultados.note}
          </p>
        </Reveal>

        {/* No celular, vídeo e mensagens viram uma faixa de deslizar para o
            lado (a próxima peça aparece cortada na borda, sinalizando que
            há mais). No desktop, grade: vídeo à esquerda, mensagens
            empilhadas à direita. */}
        <Reveal delay={0.12} className="min-w-0 lg:col-span-8" variant="quiet">
          <div
            role="region"
            aria-label={home.resultados.eyebrow}
            tabIndex={0}
            className="-mx-6 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:snap-none lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {video && (
              <div className="w-[62%] shrink-0 snap-start sm:w-64 lg:row-span-3 lg:w-auto">
                <VideoTestimonial testimonial={video} />
              </div>
            )}
            {quotes.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[80%] shrink-0 snap-start sm:w-80 lg:w-auto"
              >
                <WhatsAppBubble testimonial={testimonial} className="" />
              </div>
            ))}
          </div>
          <p className="mt-6 font-utility text-[0.68rem] leading-[1.6] text-ivory/40 lg:hidden">
            {home.resultados.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
