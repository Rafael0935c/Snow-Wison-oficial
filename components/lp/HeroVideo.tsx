"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { track } from "@/lib/track";

type HeroVideoProps = {
  src: string;
  poster: string;
  /** Nome e modalidade, para a legenda e o rótulo acessível. */
  name: string;
  role: string;
  playLabel: string;
};

/**
 * Depoimento em vídeo do topo. Decisão do cliente: nada toca sozinho.
 * Mostra a capa da marca; ao tocar em play, o vídeo começa COM som
 * (o play é chamado dentro do próprio toque, que é o que o Safari exige
 * para liberar o áudio). Ao terminar, volta para a capa: o rosto do aluno
 * não fica congelado na tela. Sem download e sem picture-in-picture.
 *
 * `preload="none"`: nenhum byte do vídeo é baixado antes do play.
 * Se a pessoa rolar para longe com o vídeo tocando, ele pausa.
 */
export function HeroVideo({
  src,
  poster,
  name,
  role,
  playLabel,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !started) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [started]);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.controls = true;
    void video.play();
    track("video_play", { video: "depoimento-hero" });
  }

  return (
    <figure className="mx-auto w-full max-w-[17rem] lg:max-w-[19rem]">
      <div className="relative overflow-hidden rounded-sm border border-line-strong shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          aria-label={`Depoimento em vídeo de ${name}, ${role}`}
          onEnded={(event) => {
            // load() é o único jeito de o navegador voltar a mostrar a capa.
            event.currentTarget.controls = false;
            event.currentTarget.load();
            setStarted(false);
          }}
          className="block aspect-[9/16] w-full bg-navy object-cover"
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 flex items-end justify-center bg-gradient-to-t from-void/70 via-transparent to-transparent p-5"
          >
            <span className="inline-flex min-h-11 items-center gap-2.5 rounded-sm bg-ivory px-4 py-2 font-display text-sm font-semibold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:-translate-y-px">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              {playLabel}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center">
        <span className="font-display text-sm font-semibold text-ivory">
          {name}
        </span>
        <span className="mx-2 text-ivory/30" aria-hidden="true">
          ·
        </span>
        <span className="font-utility text-[0.68rem] uppercase tracking-[0.1em] text-blue-soft">
          {role}
        </span>
      </figcaption>
    </figure>
  );
}
