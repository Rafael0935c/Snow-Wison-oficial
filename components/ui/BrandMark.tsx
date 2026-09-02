import Image from "next/image";
// WebP: 24KB contra 404KB do PNG equivalente, sem perda visível. Importa
// porque no build estático (Cloudflare) não há otimizador de imagem sob
// demanda — o arquivo vai para o visitante do jeito que está aqui.
// O PNG continua existindo: é ele que os geradores de ícone e da imagem
// de compartilhamento leem em tempo de build.
import logoMark from "@/assets/brand/logo-mark.webp";

type BrandMarkProps = {
  size?: number;
  glow?: boolean;
  priority?: boolean;
  className?: string;
};

// Fonte única do símbolo da marca. Trocar por um SVG vetorial real
// exige mudar apenas o import acima — ver /assets/brand/README.md.
export function BrandMark({
  size = 40,
  glow = false,
  priority = false,
  className = "",
}: BrandMarkProps) {
  return (
    <Image
      src={logoMark}
      alt="Snow Wison Idiomas"
      height={size}
      priority={priority}
      className={[
        "w-auto",
        glow &&
          "[filter:drop-shadow(0_0_28px_rgba(47,140,240,0.45))_drop-shadow(0_0_64px_rgba(47,140,240,0.18))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ height: size, width: "auto" }}
    />
  );
}
