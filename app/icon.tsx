import { readFileSync } from "node:fs";
import { join } from "node:path";

// Necessário para o export estático (Cloudflare): diz ao Next que
// esta rota é gerada no build, não sob demanda.
export const dynamic = "force-static";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/**
 * Ícone principal (/icon), 192x192.
 *
 * Serve um PNG pronto, gerado por scripts/make-icons.mjs a partir do logo,
 * em vez de desenhar com ImageResponse: assim o /icon usa o mesmo desenho
 * e o mesmo redimensionamento (Lanczos) do favicon.ico e do ícone de 512
 * do manifest. Para mudar o ícone, rode o script, não edite aqui.
 */
export default function Icon() {
  const png = readFileSync(join(process.cwd(), "assets/brand/icon-192.png"));
  return new Response(png, { headers: { "Content-Type": contentType } });
}
