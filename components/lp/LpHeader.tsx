"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { brand, diagnostico } from "@/lib/content";

const nav = diagnostico.nav;

/**
 * Cabeçalho da landing page: uma "pílula" fixa, com desfoque de fundo,
 * âncoras da própria página e o botão do diagnóstico sempre visível.
 * Nenhum link leva para fora da página (funil de objetivo único).
 */
export function LpHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Link do menu no celular: fecha o menu (destravando a rolagem) e só
  // então rola até a seção, no quadro seguinte.
  function goTo(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (!target) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", href);
    });
  }

  // Menu aberto: trava a rolagem do fundo, põe o foco no primeiro link,
  // prende o Tab dentro do menu e fecha com Esc (devolvendo o foco ao
  // botão que abriu).
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 px-3 sm:px-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-line-strong bg-navy/75 py-2 pl-4 pr-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <a
          href="#inicio"
          className="-my-1 flex min-h-11 items-center gap-2.5"
          aria-label={`${brand.wordmark} ${brand.wordmarkSuffix} — início da página`}
        >
          <BrandMark size={28} eager />
          <span className="hidden font-display text-[0.8rem] font-extrabold tracking-[0.16em] text-ivory sm:inline">
            {brand.wordmark}
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label={nav.menuLabel}
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-sm text-ivory/75 transition-colors hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="#diagnostico"
            data-quiz-cta=""
            className="inline-flex min-h-10 items-center rounded-full bg-[linear-gradient(135deg,#4FA3FF,#12299E)] px-4 font-display text-[0.8rem] font-semibold text-ivory shadow-[inset_0_-2px_0_rgba(3,4,8,0.35)] transition-transform hover:-translate-y-px active:translate-y-px sm:px-5 sm:text-sm"
          >
            {nav.cta}
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="lp-menu"
            aria-label={nav.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ivory lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="lp-menu"
          role="dialog"
          aria-modal="true"
          aria-label={nav.menuLabel}
          className="fixed inset-0 z-50 flex flex-col bg-void px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] lg:hidden"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={nav.closeMenu}
              className="flex h-11 w-11 items-center justify-center text-ivory"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center gap-6"
            aria-label={nav.menuLabel}
          >
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => goTo(event, link.href)}
                className="py-2 font-display text-2xl text-ivory/80"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#diagnostico"
            data-quiz-cta=""
            onClick={() => setOpen(false)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[linear-gradient(135deg,#4FA3FF,#12299E)] font-display font-semibold text-ivory"
          >
            {nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
