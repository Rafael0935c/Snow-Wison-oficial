import { Button, type LinkButtonProps } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/siteConfig";
import { a11y } from "@/lib/content";

type WhatsAppCTAProps = Omit<LinkButtonProps, "href">;

// CTA de texto que sempre aponta para o WhatsApp da Snow Wison.
// Sem número configurado, renderiza em estado desabilitado — nunca
// inventa um link funcional.
export function WhatsAppCTA({
  children,
  variant = "primary",
  className = "",
  ...props
}: WhatsAppCTAProps) {
  const url = getWhatsAppUrl();

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Snow Wison] NEXT_PUBLIC_WHATSAPP não configurado — CTA de WhatsApp desabilitado."
      );
    }
    return (
      <span
        role="button"
        aria-disabled="true"
        title={a11y.whatsappDisabledTitle}
        className={`inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold tracking-wide text-ivory/30 ${
          variant === "primary" ? "bg-navy-2" : "underline decoration-line-strong"
        } ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <Button
      href={url}
      variant={variant}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Button>
  );
}
