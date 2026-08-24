"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Abrir menu"
        className="flex h-11 w-11 items-center justify-center text-ivory"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 flex flex-col bg-void px-6 py-6"
        >
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center text-ivory"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav
            className="mt-10 flex flex-1 flex-col justify-center gap-8"
            aria-label="Navegação principal"
          >
            {nav.links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className={`font-display text-2xl ${
                  pathname === link.href
                    ? "text-ivory underline decoration-blue-soft underline-offset-8"
                    : "text-ivory/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pb-6">
            <WhatsAppCTA className="w-full">{nav.cta}</WhatsAppCTA>
          </div>
        </div>
      )}
    </div>
  );
}
