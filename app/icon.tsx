import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Necessário para o export estático (Cloudflare): diz ao Next que
// esta rota é gerada no build, não sob demanda.
export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const logoBase64 = readFileSync(
    join(process.cwd(), "assets/brand/logo-mark.png")
  ).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logoBase64}`}
          height={28}
          width={22}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
