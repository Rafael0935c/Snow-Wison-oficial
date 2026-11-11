import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { NumeroDestaque } from "@/components/sections/resultados/NumeroDestaque";
import { TestimonialsGrid } from "@/components/sections/resultados/TestimonialsGrid";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { resultados } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resultados",
  description: resultados.intro.paragraph,
};

export default function ResultadosPage() {
  return (
    <main id="main-content">
      <PageIntro
        heading={resultados.intro.heading}
        paragraph={resultados.intro.paragraph}
      />
      <NumeroDestaque />
      <TestimonialsGrid />
      <CtaFinal />
    </main>
  );
}
