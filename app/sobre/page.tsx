import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { SplitText } from "@/components/sections/SplitText";
import { Objetivos } from "@/components/sections/sobre/Objetivos";
import { ProvaSocial } from "@/components/sections/sobre/ProvaSocial";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { sobre } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quem somos",
  description: sobre.intro.paragraph,
};

export default function SobrePage() {
  return (
    <main id="main-content">
      <PageIntro heading={sobre.intro.heading} paragraph={sobre.intro.paragraph} />
      <SplitText
        eyebrow={sobre.quemSomos.eyebrow}
        heading={sobre.quemSomos.heading}
        paragraph={sobre.quemSomos.paragraph}
      />
      <SplitText
        eyebrow={sobre.oQueFazemos.eyebrow}
        heading={sobre.oQueFazemos.heading}
        paragraph={sobre.oQueFazemos.paragraph}
      />
      <Objetivos />
      <ProvaSocial />
      <CtaFinal />
    </main>
  );
}
