import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

type ModalidadeBlockProps = {
  tag: string;
  name: string;
  paragraph: string;
  features: readonly string[];
  cta: string;
  reverse?: boolean;
};

export function ModalidadeBlock({
  tag,
  name,
  paragraph,
  features,
  cta,
  reverse = false,
}: ModalidadeBlockProps) {
  return (
    <div className="border-t border-line py-16 first:border-t-0 first:pt-0">
      <div
        className={`flex flex-col gap-10 lg:gap-16 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <Reveal className="lg:flex-1">
          <p className="font-utility text-xs uppercase tracking-[0.14em] text-blue-soft">
            {tag}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ivory">
            {name}
          </h2>
          <p className="mt-6 max-w-md leading-[1.65] text-ivory/62">
            {paragraph}
          </p>
          <WhatsAppCTA variant="ghost" className="mt-8 px-0 py-0">
            {cta}
          </WhatsAppCTA>
        </Reveal>

        <Reveal delay={0.15} className="lg:flex-1">
          <ul>
            {features.map((feature, index) => (
              <li key={feature}>
                {index > 0 && <Divider />}
                <p className="py-4 text-ivory/70">{feature}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
