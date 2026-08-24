import { Reveal } from "@/components/ui/Reveal";
import { resultados } from "@/lib/content";

export function NumeroDestaque() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-24">
      <Reveal className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
        <p className="font-display text-[clamp(3.5rem,10vw,7rem)] font-semibold leading-none text-ivory">
          {resultados.numero.value}
        </p>
        <p className="font-utility text-sm uppercase tracking-[0.14em] text-ivory/50">
          {resultados.numero.label}
        </p>
      </Reveal>
    </section>
  );
}
