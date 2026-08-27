"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Rotas de landing page (tráfego pago): funil de objetivo único, sem
// menu nem links de saída. Recebem uma "casca" mínima própria.
const LP_ROUTES = ["/diagnostico"];

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  fab: ReactNode;
  children: ReactNode;
};

// Header/Footer/FAB são passados como props (não importados aqui) para
// continuarem sendo Server Components — este wrapper só decide o que
// renderizar, com base na rota.
export function SiteChrome({ header, footer, fab, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isLandingPage = LP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isLandingPage) {
    return <div className="relative z-10 flex flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      {header}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      {footer}
      {fab}
    </>
  );
}
