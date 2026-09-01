import { spawnSync } from "node:child_process";

/**
 * Build estático (Cloudflare): gera `public/_headers` e roda o `next build`
 * em modo export, produzindo a pasta `out/`.
 *
 * A variável é definida aqui, e não no comando do package.json, por dois
 * motivos:
 *
 *  - `STATIC_EXPORT=true next build` não funciona no PowerShell/cmd, então
 *    o script deixaria de rodar no Windows.
 *  - Depender de detecção automática do ambiente falhou na prática: eu
 *    checava `CF_PAGES`, que só existe em projetos Cloudflare Pages. Num
 *    projeto Workers ela não é definida, o build saía em modo servidor e
 *    o deploy quebrava reclamando que `out/` não existia.
 *
 * Definindo explicitamente, o resultado é o mesmo em qualquer ambiente.
 */
// Comando passado como string única: com `shell: true`, separar em
// argumentos dispara aviso de depreciação do Node (os argumentos não são
// escapados, apenas concatenados). Aqui não há entrada externa — os
// comandos são fixos.
function run(commandLine) {
  const r = spawnSync(commandLine, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, STATIC_EXPORT: "true" },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run("node scripts/generate-headers.mjs");
run("next build");
