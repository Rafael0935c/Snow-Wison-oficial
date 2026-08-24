"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          background: "#05070F",
          color: "#F3F5F8",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4FA3FF",
          }}
        >
          Erro inesperado
        </p>
        <h1 style={{ marginTop: "1.5rem", fontSize: "1.5rem", fontWeight: 600 }}>
          Algo deu errado.
        </h1>
        <p style={{ marginTop: "1rem", color: "rgba(243,245,248,0.62)" }}>
          Já fomos avisados. Tenta recarregar a página.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "2.5rem",
            padding: "0.875rem 1.75rem",
            borderRadius: "2px",
            background: "linear-gradient(135deg,#4FA3FF,#12299E)",
            color: "#F3F5F8",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Recarregar
        </button>
      </body>
    </html>
  );
}
