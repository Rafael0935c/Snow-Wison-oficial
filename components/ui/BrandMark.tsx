import Image from "next/image";
import logoMark from "@/public/brand/logo-mark.png";

type BrandMarkProps = {
  size?: number;
  glow?: boolean;
  priority?: boolean;
  className?: string;
};

// Fonte única do símbolo da marca. Trocar por um SVG vetorial real
// exige mudar apenas o import acima — ver /public/brand/README.md.
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
