import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/jsonLd";

describe("serializeJsonLd", () => {
  it("escapa '<' para um valor não conseguir fechar a tag <script>", () => {
    const saida = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(saida).not.toContain("<");
    expect(saida).toContain("\\u003c/script>");
  });

  it("continua sendo JSON válido e com o mesmo conteúdo", () => {
    const dado = { name: "Snow Wison <Idiomas>", url: "https://snowwison.com" };
    expect(JSON.parse(serializeJsonLd(dado))).toEqual(dado);
  });
});
