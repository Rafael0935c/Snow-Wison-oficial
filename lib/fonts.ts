import { Sora, Manrope, Space_Mono } from "next/font/google";

// Só os pesos que o site realmente usa: 400 (herdado), 600 (font-semibold,
// 45 usos) e 800 (font-extrabold, o wordmark). Cada peso a mais é um
// arquivo .woff2 que todo visitante baixa sem ver diferença nenhuma —
// eram 11 pesos para 3 em uso.

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-mono",
  display: "swap",
});
