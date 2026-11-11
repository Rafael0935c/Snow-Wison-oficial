import { Radio, Target, Users } from "lucide-react";
import { Enter } from "@/components/ui/Enter";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { LpButton } from "@/components/lp/LpButton";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { HeroVideo } from "@/components/lp/HeroVideo";
import { diagnostico, testimonials } from "@/lib/content";

const hero = diagnostico.hero;

const PROVA_ICONS = { users: Users, live: Radio, target: Target } as const;

// Depoimento do topo: aluna identificada, com uso de imagem autorizado.
const HERO_VIDEO_ID = "t11";

export function LpHero() {
  const video = testimonials.find((t) => t.id === HERO_VIDEO_ID);

  return (
    <section id="inicio" className="relative overflow-hidden">
      <AmbientGlow intensity={0.12} size={44} anchor="top" />

      {/* Celular: texto → faixa de prova → vídeo (a prova fica na primeira
          tela). Desktop: texto à esquerda, vídeo à direita, faixa embaixo. */}
      <div className="relative mx-auto grid max-w-6xl gap-x-12 px-5 pb-12 pt-28 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="lg:col-span-7 lg:row-start-1 lg:self-center">
          <Enter>
            <LpEyebrow number="01">{hero.eyebrow}</LpEyebrow>
          </Enter>
          <Enter delay={0.06}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ivory">
              {hero.headingStart}{" "}
              <span className="lp-highlight">{hero.headingHighlight}</span>
              {hero.headingEnd}
            </h1>
          </Enter>
          <Enter delay={0.14}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.6] text-ivory/75 lg:text-lg">
              {hero.paragraph}
            </p>
          </Enter>
          <Enter
            delay={0.2}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <LpButton quiz>{hero.ctaPrimary}</LpButton>
            <LpButton href="#avaliacoes" variant="secondary">
              {hero.ctaSecondary}
            </LpButton>
          </Enter>
          <Enter delay={0.24}>
            <p className="mt-4 font-utility text-[0.72rem] leading-[1.6] text-ivory/60">
              {hero.microcopy.join(" · ")}
            </p>
          </Enter>
        </div>

        <Enter
          delay={0.28}
          className="mt-10 lg:col-span-12 lg:row-start-2 lg:mt-14"
        >
          <ul className="grid grid-cols-3 gap-3 border-y border-line py-5 sm:gap-6 lg:py-6">
            {diagnostico.provas.map((item) => {
              const Icon = PROVA_ICONS[item.icon];
              return (
                <li
                  key={item.text}
                  className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-blue-soft"
                    aria-hidden="true"
                  />
                  <span className="font-display text-[0.8rem] font-semibold leading-snug text-ivory/90 sm:text-base">
                    {item.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </Enter>

        {video?.videoUrl && video.photoUrl && (
          <Enter
            delay={0.2}
            className="mt-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0"
          >
            <HeroVideo
              src={video.videoUrl}
              poster={video.photoUrl}
              name={video.name ?? ""}
              role={video.role ?? ""}
              playLabel={hero.videoPlay}
            />
          </Enter>
        )}
      </div>
    </section>
  );
}
