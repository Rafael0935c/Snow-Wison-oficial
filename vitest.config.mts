import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Testes unitários: funções puras (montagem do link do WhatsApp, JSON-LD
// e, nas próximas etapas, o quiz e a API de leads). Rodam em Node, sem
// navegador. Os testes de ponta a ponta ficam com o Playwright.
export default defineConfig({
  resolve: {
    // Mesmo atalho "@/..." do tsconfig.json.
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
