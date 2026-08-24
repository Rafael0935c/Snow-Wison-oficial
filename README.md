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

Em `lib/content.ts`, o array `testimonials` já está preenchido com 11
depoimentos reais (recebidos via WhatsApp, revisados só na
gramática/ortografia). São exibidos em `/resultados` como bolhas de
chat (`components/sections/resultados/WhatsAppBubble.tsx`), sem foto ou
vídeo. Para adicionar mais, ou anexar foto/vídeo a um já existente:

```ts
export const testimonials: Testimonial[] = [
  {
    id: "t12",
    name: "Nome do aluno",
    role: "Aluno(a) Premium/Plus/Economic/Unique",
    quote: "Trecho do depoimento.",
    videoUrl: "https://.../video.mp4",   // opcional
    photoUrl: "https://.../foto.jpg",    // opcional
  },
  // ...
];
```

Se o array ficar totalmente vazio (todos sem `quote`), a seção volta a
mostrar um `Placeholder` de "conteúdo pendente" automaticamente.

A seção "Professores" em `/metodologia` está com a equipe ainda em
recrutamento — mostra só os critérios de seleção por enquanto. Quando os
professores estiverem definidos, adicionar os perfis diretamente em
`components/sections/metodologia/Professores.tsx`.

## Assets de marca

Ver [`public/brand/README.md`](public/brand/README.md) — documenta a
origem dos arquivos recebidos, o problema de arquivos `.svg` que na
verdade são raster, e a ocorrência do texto "NORVEN" em um dos arquivos
do lote original (não utilizado no site).

## Pendências do cliente

Ver [`PENDENCIAS.md`](PENDENCIAS.md).
