import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { sobre } from "@/lib/content";

export function ProvaSocial() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
      <Reveal>
        <p className="font-display text-[clamp(3rem,8vw,5rem)] font-semibold text-ivory">
          {sobre.provaSocial.number}
        </p>
        <p className="mt-2 font-utility text-xs uppercase tracking-[0.14em] text-ivory/50">
          {sobre.provaSocial.label}
        </p>
        <Link
          href="/resultados"
          className="mt-8 inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
        >
          {sobre.provaSocial.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
