import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Placeholder } from "@/components/ui/Placeholder";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: faq.intro.heading,
};

export default function FaqPage() {
  const items = faq.items.map((item, index) => ({
    question: item.question,
    answer:
      item.answer ??
      (
        <Placeholder
          type="quote"
          label="RESPOSTA PENDENTE"
          fieldName={`faq.items[${index}].answer`}
        />
      ),
  }));

  return (
    <main id="main-content">
      <PageIntro heading={faq.intro.heading} />
      <section className="mx-auto max-w-3xl px-6 pb-24 lg:pb-32">
        <FaqAccordion items={items} />
      </section>
      <CtaFinal />
    </main>
  );
}
