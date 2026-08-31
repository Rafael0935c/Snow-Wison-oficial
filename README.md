# Snow Wison Idiomas — Site oficial

Site institucional da Snow Wison, escola premium de inglês. Next.js (App
Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Instalação e execução

Requer Node.js 20+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # ESLint
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz (opcional em desenvolvimento):

```bash
NEXT_PUBLIC_WHATSAPP=5511999999999   # número da Snow Wison, formato internacional, só dígitos
NEXT_PUBLIC_SITE_URL=https://snowwisonidiomas.com.br
```

Sem `NEXT_PUBLIC_WHATSAPP` configurado, os botões de WhatsApp do site
(header, FAB, CTAs) renderizam em estado desabilitado e um aviso aparece
no console em desenvolvimento — isso é intencional, para nunca linkar para
um número inventado. Ver `PENDENCIAS.md`.

## Estrutura

```
/app            rotas (App Router) — uma pasta por página
/components
  /layout        Header, Footer, MobileNav, WhatsAppFAB, Atmosphere, StructuralRail
  /ui            componentes base (Button, SectionLabel, Reveal, Placeholder, BrandMark...)
  /sections      seções de página, organizadas por rota
/lib
  content.ts     TODO o texto do site vive aqui
  siteConfig.ts  WhatsApp, Instagram, URLs — dados pendentes ficam vazios
  fonts.ts       Sora / Manrope / Space Mono via next/font
  jsonLd.ts      dados estruturados (schema.org)
/public/brand    assets de marca — ver README.md dentro dessa pasta
```

## Editando o conteúdo do site

**Todo o texto do site está centralizado em `lib/content.ts`.** Nenhum
componente tem strings de copy hardcoded — para alterar qualquer texto
visível (títulos, parágrafos, listas, microcopy), edite esse arquivo.

### Depoimentos

Em `lib/content.ts`, o array `testimonials` está preenchido com
depoimentos reais (recebidos via WhatsApp, revisados só na
gramática/ortografia). São exibidos em `/resultados` como bolhas de
chat (`components/sections/resultados/WhatsAppBubble.tsx`). Para
adicionar mais, ou anexar vídeo a um já existente:

```ts
export const testimonials: Testimonial[] = [
  {
    id: "t13",
    name: "Nome do aluno",
    role: "Aluno(a) Premium/Plus/Economic/Unique",
    quote: "Trecho do depoimento.",
    videoUrl: "/videos/depoimento-2.mp4",        // opcional
    photoUrl: "/videos/depoimento-2-capa.jpg",   // capa do vídeo, opcional
  },
  // ...
];
```

Quem tiver `videoUrl` aparece em destaque, acima da grade de bolhas —
tanto em `/resultados` quanto na landing page. Se o array ficar
totalmente vazio (todos sem `quote`), a seção volta a mostrar um
`Placeholder` de "conteúdo pendente" automaticamente.

### Como preparar um vídeo antes de subir

Vídeo gravado em celular **não pode ir direto para `public/videos/`**.
Dois problemas aparecem quase sempre:

1. **Codec HEVC/H.265** — padrão em iPhone. Toca no Safari, mas **não no
   Chrome nem no Firefox**: a maioria dos visitantes veria um quadrado
   preto. Precisa ser convertido para **H.264**.
2. **Tamanho** — um vídeo de 50s pode passar de 100 MB, que é o limite
   rígido do GitHub (o push é recusado), além de pesar demais na página.

O comando abaixo resolve os dois (foi o usado no vídeo da Maria Clara,
que saiu de 103 MB para 5,8 MB sem perda visível):

```bash
npm i -D ffmpeg-static --no-save

node -e "console.log(require('ffmpeg-static'))"   # caminho do binário

# troque <ffmpeg> pelo caminho acima e <entrada> pelo arquivo original
<ffmpeg> -i <entrada>.MP4 \
  -vf "scale=720:-2" \
  -c:v libx264 -profile:v main -crf 27 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  public/videos/depoimento-N.mp4

# capa: escolha um segundo em que a pessoa esteja com o rosto composto
<ffmpeg> -ss 42 -i public/videos/depoimento-N.mp4 -frames:v 1 \
  -vf "scale=540:-2" -q:v 3 public/videos/depoimento-N-capa.jpg

rm -rf node_modules/ffmpeg-static   # o binário não fica no projeto
```

`-movflags +faststart` faz o vídeo começar a tocar antes de baixar por
completo. O player usa `preload="metadata"`, então o arquivo inteiro só
é transferido se a pessoa apertar play.

O componente (`components/ui/VideoTestimonial.tsx`) espera **vídeo
vertical 9:16**. Para vídeo horizontal, ajustar o `aspect-[9/16]` lá.

A seção "Professores" em `/metodologia` está com a equipe ainda em
recrutamento — mostra só os critérios de seleção por enquanto. Quando os
professores estiverem definidos, adicionar os perfis diretamente em
`components/sections/metodologia/Professores.tsx`.

## Assets de marca

Ver [`public/brand/README.md`](public/brand/README.md) — documenta a
origem dos arquivos recebidos, o problema de arquivos `.svg` que na
verdade são raster, e a ocorrência do texto "NORVEN" em um dos arquivos
do lote original (não utilizado no site).

## Publicação

O projeto builda de duas formas, e as duas ficam vivas de propósito —
a ideia é poder começar na Cloudflare e migrar para a Vercel depois sem
reescrever nada.

| | Cloudflare Pages | Vercel |
|---|---|---|
| Comando de build | `npm run build:static` | `npm run build` |
| Pasta de saída | `out` | (automática) |
| Headers/CSP | `public/_headers` (gerado no build) | `headers()` do `next.config.ts` |
| Otimização de imagem | não há (por isso o logo é WebP) | automática |

A escolha é feita sozinha: a Cloudflare define `CF_PAGES=1` no ambiente
de build dela, e o `next.config.ts` detecta isso e liga o modo estático.
Localmente dá para reproduzir o mesmo build com
`STATIC_EXPORT=true npm run build:static`.

### Publicando na Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → conectar
   ao GitHub e escolher o repositório `Snow-Wison-oficial`
   (liberar **apenas** esse repositório).
2. Configuração do build:
   - Framework preset: **None** (não usar o preset Next.js — ele espera
     build com servidor)
   - Build command: `npm run build:static`
   - Build output directory: `out`
3. **Variáveis de ambiente** (Settings → Environment variables). Esse é o
   passo mais fácil de esquecer: sem ele os botões de WhatsApp sobem
   desabilitados, porque o `.env.local` não vai para o deploy.
   - `NEXT_PUBLIC_WHATSAPP`
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `NEXT_PUBLIC_SITE_URL` (o domínio final, sem barra no fim)
4. Publicar. Cada `git push` na branch `main` gera um novo deploy sozinho.

### Migrando para a Vercel depois

Importar o mesmo repositório, deixar o build padrão (`npm run build`) e
recadastrar as três variáveis. Não é preciso mexer em código: sem
`CF_PAGES`, o projeto volta a rodar como app Next.js normal e os headers
voltam a sair do `next.config.ts`.

### Headers de segurança

Definidos em **um lugar só**: `config/security-headers.mjs`. O
`next.config.ts` lê de lá, e `scripts/generate-headers.mjs` gera o
`public/_headers` a partir da mesma fonte durante o `build:static`.

Não editar `public/_headers` à mão — ele é sobrescrito a cada build. Para
mudar a CSP, editar `config/security-headers.mjs`.

## Pendências do cliente

Ver [`PENDENCIAS.md`](PENDENCIAS.md).
