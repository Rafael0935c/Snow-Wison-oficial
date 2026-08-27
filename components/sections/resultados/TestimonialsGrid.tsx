import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { WhatsAppBubble } from "@/components/sections/resultados/WhatsAppBubble";
import { testimonials } from "@/lib/content";

export function TestimonialsGrid() {
  const hasReal = testimonials.some((t) => t.quote);

  if (!hasReal) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <Placeholder
          type="quote"
          label="DEPOIMENTOS — CONTEÚDO PENDENTE"
          fieldName="testimonials"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={(index % 3) * 0.08} variant="quiet">
            <WhatsAppBubble testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
