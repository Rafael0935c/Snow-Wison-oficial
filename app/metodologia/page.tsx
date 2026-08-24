import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitText } from "@/components/sections/SplitText";
import { Base } from "@/components/sections/metodologia/Base";
import { Professores } from "@/components/sections/metodologia/Professores";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { metodologia } from "@/lib/content";

export const metadata: Metadata = {
  title: "Metodologia",
  description: metodologia.intro.paragraph,
};

export default function MetodologiaPage() {
  return (
    <main id="main-content">
      <PageIntro
        heading={metodologia.intro.heading}
        paragraph={metodologia.intro.paragraph}
      />
      <Base />
      <SplitText
        eyebrow={metodologia.referencias.eyebrow}
        heading={metodologia.referencias.heading}
        paragraph={metodologia.referencias.paragraph}
      />
      <Professores />
      <CtaFinal />
    </main>
  );
}
