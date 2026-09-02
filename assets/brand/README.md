# Assets de marca — status e pendências

## Arquivos atuais

- `logo-mark-source.png` — o arquivo original recebido do cliente: símbolo
  aprovado (pinguim de perfil, duas silhuetas sobrepostas — azul em gradiente
  + branco/prata), sobre fundo navy sólido (não transparente). Mantido aqui
  como referência/backup.
- `logo-mark.png` — **versão usada pelo site**, com o fundo removido
  (transparente). Gerada algoritmicamente a partir do arquivo original por
  `scripts/remove-bg.js` (remoção de fundo por distância de cor + limpeza de
  ruído/sombra residual). Nenhum traço do desenho foi alterado ou
  redesenhado — apenas o fundo foi removido. É o arquivo importado por
  `components/ui/BrandMark.tsx`.

Para regenerar `logo-mark.png` a partir do original (ex.: se um novo arquivo
`logo-mark-source.png` for enviado pelo cliente), rode:

```bash
node scripts/remove-bg.js
```

## Origem

O lote de referência enviado pelo cliente (pasta `referência site/` e envios
via WhatsApp/ChatGPT) continha 8 arquivos com extensão `.svg`. Ao inspecionar o
conteúdo real desses arquivos, constatou-se que **nenhum é um vetor de
verdade**: cada `.svg` é apenas um wrapper XML com uma tag `<image>` embutindo
um PNG ou JPEG em base64. Ou seja, são imagens raster (geradas por IA)
disfarçadas de vetor pela extensão do arquivo.

Isso significa que **não existe hoje nenhum arquivo vetorial real da marca**.
O logo usado no site é uma imagem raster em resolução fixa (1254×1254px),
com fundo sólido (não transparente).

## Ocorrência do texto "NORVEN"

Um dos arquivos do lote (`WhatsApp_Image_2026-08-21_at_08.03.58`) traz o mesmo
desenho do pinguim com a palavra **"NORVEN"** impressa logo abaixo do símbolo.
Isso sugere que a arte pode ter origem em um gerador genérico de logos (ex.:
ferramentas de IA para naming/branding) e **não ser exclusiva da Snow Wison**.
Esse arquivo específico **não foi copiado para `/public/brand/`** e não deve
ser usado em nenhuma peça do site até que o cliente confirme a origem e a
exclusividade dos direitos sobre o desenho.

Recomendação: antes de publicar o site em produção, confirmar com o cliente
se o pinguim foi encomendado/licenciado com exclusividade, ou se é necessário
encomendar um redesenho vetorial original.

## O que falta

- [ ] Arquivo vetorial real (`.svg` ou `.ai`/`.eps` de origem) do símbolo
- [x] ~~Versão com fundo transparente~~ — resolvido via `logo-mark.png`
      (remoção de fundo algorítmica, não é vetor real, mas já elimina o
      quadrado de fundo visível no site)
- [ ] Confirmação sobre a ocorrência "NORVEN" — exclusividade da marca
- [ ] Wordmark "SNOW WISON" em vetor, se houver versão tipografada oficial

## Como trocar o arquivo no futuro

Todo uso do símbolo no site passa por um único componente:
`components/ui/BrandMark.tsx`. Para trocar o arquivo por um SVG vetorial real,
basta substituir o `src` importado nesse componente — nenhum outro lugar do
código precisa mudar.

**Este logo não foi redesenhado por IA neste projeto** — apenas isolado e
documentado, conforme instrução do cliente.
