import type { Testimonial } from "@/lib/content";

type VideoTestimonialProps = {
  testimonial: Testimonial;
  className?: string;
};

/**
 * Depoimento em vídeo. Feito para vídeo vertical (9:16), que é o formato
 * em que alunos gravam pelo celular — daí a largura limitada: em 9:16,
 * ocupar a coluna inteira deixaria o bloco absurdamente alto.
 *
 * `preload="metadata"` carrega só o cabeçalho do arquivo; os megabytes
 * do vídeo só saem do servidor se a pessoa apertar play. A imagem de
 * capa (`poster`) é o que aparece antes disso.
 */
export function VideoTestimonial({
  testimonial,
  className = "",
}: VideoTestimonialProps) {
  if (!testimonial.videoUrl) return null;

  return (
    <figure className={`mx-auto w-full max-w-[19rem] ${className}`}>
      <video
        src={testimonial.videoUrl}
        poster={testimonial.photoUrl}
        controls
        playsInline
        preload="metadata"
        className="aspect-[9/16] w-full rounded-sm bg-navy object-cover shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      >
        Seu navegador não consegue exibir este vídeo.
      </video>
      <figcaption className="mt-4 text-center">
        <p className="font-display text-sm font-semibold text-ivory">
          {testimonial.name}
        </p>
        <p className="mt-0.5 font-utility text-[0.65rem] uppercase tracking-[0.1em] text-blue-soft">
          {testimonial.role}
        </p>
      </figcaption>
    </figure>
  );
}
