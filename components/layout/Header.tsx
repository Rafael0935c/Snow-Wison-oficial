"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { MobileNav } from "@/components/layout/MobileNav";
import { nav, brand } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-400 ${
        scrolled
          ? "border-line bg-void/[0.82] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${brand.wordmark} ${brand.wordmarkSuffix} — início`}
        >
          <BrandMark size={32} />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navegação principal"
        >
          {nav.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm transition-colors ${
                  isActive
                    ? "text-ivory underline decoration-blue-soft underline-offset-8"
                    : "text-ivory/65 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <WhatsAppCTA className="px-5 py-2.5 text-xs">{nav.cta}</WhatsAppCTA>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
