# Pendências — o que falta o cliente enviar

Este documento lista exatamente o que está faltando para o site sair do
estado atual ("estruturalmente pronto, com conteúdo real pendente") para
publicação final. Nada nesta lista foi inventado no código — em cada
caso, o site usa um estado vazio/desabilitado ou um `Placeholder` visível
até o dado real chegar.

## Segurança — CSP (Content-Security-Policy)

Implementada em `next.config.ts` (header estático, sem middleware).
Decisão registrada aqui porque foi um trade-off deliberado:

- **Testei primeiro com nonce por requisição** (via `middleware.ts`),
  que é a abordagem mais forte recomendada pelo Next.js. Resultado:
  todas as páginas do site (que eram 100% estáticas) viraram
  server-rendered a cada requisição — um nonce só existe se for gerado
  por requisição, e isso exige passar por lógica de servidor sempre.
  Isso contradiz o pedido de "site leve, sem travar" e a meta de
  performance do projeto (LCP, geração estática). Removi o middleware.
- **Abordagem atual**: CSP estática, sem nonce, com `'unsafe-inline'`
  para scripts e estilos (cobre o único `<script>` inline do site — o
  JSON-LD — e a hidratação do próprio Next/React). Isso é mais fraco
  contra XSS via script injetado do que a versão com nonce, mas o site
  não tem nenhum formulário nem conteúdo gerado por usuário renderizado
  em lugar nenhum — não há onde injetar algo pra começo de conversa.
  Em compensação, a CSP bloqueia de verdade: carregamento de recursos
  de domínios não autorizados, `frame-ancestors` (clickjacking),
  `object-src`, `base-uri`, `form-action`.
- Se no futuro o site ganhar um formulário público (ex: aquele
  formulário de diagnóstico que cogitamos para o Supabase), vale
  reconsiderar o nonce com middleware — o custo de performance passa a
  valer mais a pena quando existe superfície real de injeção de dado.
- Testado: build de produção com todas as 14 rotas ainda estáticas,
  zero eventos de `securitypolicyviolation` navegando por todas as
  páginas do site (Home, Sobre, Metodologia, Modalidades, Resultados,
  FAQ, Diagnóstico), envio ao Sentry funcionando.

## Revisão de segurança e dispositivos (set/2026)

Auditoria completa do site publicado. Corrigido em código:

- **HSTS** (`Strict-Transport-Security`) adicionado à fonte única de
  headers. Depois da primeira visita HTTPS, o navegador nem tenta HTTP.
- **`public/brand/` estava no ar** — inclusive este tipo de README
  interno e o PNG original de 1,5 MB. Movido para `assets/brand/`, fora
  do build publicado. Os geradores de ícone/OG leem de lá em build.
- **Vídeo de depoimento volta à capa ao terminar** (`load()` no evento
  `ended`), para o rosto do aluno não ficar congelado na página. Também
  sem botão de download e sem picture-in-picture. Verificado com
  reprodução real até o fim, não só com evento sintético.
- **Alvos de toque < 44 px** corrigidos: logo do header, links "Conhecer",
  links do rodapé e do menu mobile. Menu de desktop passou a entrar só em
  `lg` (1024 px): em 768 (iPad em pé) os 6 links + CTA não cabiam e
  "Quem somos" quebrava em duas linhas.
- **Fontes**: 11 pesos carregados para 3 em uso (400/600/800). Cortados
  os não usados: 14 → 11 arquivos, 188 → 156 KB.

Verificado em 360, 375, 768, 1024, 1440 e 1920 px: zero overflow
horizontal, zero alvos de toque abaixo de 44 px, conteúdo centrado.
Links de WhatsApp: 62 em 7 páginas, todos com o número correto,
`target=_blank` + `rel="noopener noreferrer"`, mensagem de rastreio
preservada na LP.

**Lacuna que não fecha em código:** `http://` responde 200 em vez de
redirecionar para `https://`. Num Worker só de arquivos estáticos não
há onde fazer esse redirect. Quando o domínio próprio estiver na
Cloudflare, ligar **SSL/TLS → Edge Certificates → Always Use HTTPS**.
Até lá, o HSTS cobre todo visitante a partir da segunda visita, e a CSP
(`upgrade-insecure-requests`) cobre os recursos da página.

**Peso do JavaScript:** 299 KB comprimido, dos quais ~129 KB são o SDK
do Sentry. Para um site estático sem formulário, é o maior item da
conta. Mantido porque o monitoramento foi pedido; se um dia pesar, é a
primeira coisa a reconsiderar.

## Crítico para lançar

- [x] **Número de WhatsApp oficial** — configurado em `.env.local`
      (`NEXT_PUBLIC_WHATSAPP=5521980999435`). Todos os CTAs de WhatsApp
      (header, FAB, seções finais, blocos de modalidades) testados e
      funcionando. **Importante:** ao publicar em produção (Vercel ou
      outro host), configurar essa mesma variável de ambiente lá — o
      `.env.local` não é enviado no deploy.
- [ ] **URL definitiva do domínio** — usada em metadata, Open Graph,
      sitemap e JSON-LD. Configurar em `NEXT_PUBLIC_SITE_URL`.
- [ ] **Logo em vetor real** — os arquivos recebidos são raster (PNG/JPEG)
      disfarçados de `.svg`. Ver `assets/brand/README.md` para o
      detalhamento completo, incluindo a ocorrência do texto "NORVEN" em
      um dos arquivos do lote original.

## Conteúdo pendente (hoje representado por `Placeholder` no site)

- [x] ~~Depoimentos~~ — 11 depoimentos reais coletados via WhatsApp,
      revisados só na gramática/ortografia (conteúdo e sentido são
      exatamente os enviados pelos alunos). Exibidos em `/resultados`
      como bolhas de chat (`components/sections/resultados/WhatsAppBubble.tsx`).
      Nenhum tem foto/vídeo — se o cliente enviar, dá pra adicionar
      depois nos campos `photoUrl`/`videoUrl` do array `testimonials`
      em `lib/content.ts`.
- [ ] **Perfis de professores** — a escola ainda está em processo de
      recrutamento, então a seção "Professores" em `/metodologia` hoje
      mostra só os critérios de seleção (graduação, mestrado, experiência
      comprovada, certificações internacionais), sem perfis individuais.
      Quando a equipe estiver fechada, adicionar nome/foto/bio em
      `components/sections/metodologia/Professores.tsx`.
- [x] ~~Foto cinematográfica do pinguim~~ — resolvido por decisão do
      cliente: em vez de foto, a seção de "respiro atmosférico" da Home
      usa o próprio símbolo como marca d'água atmosférica em opacidade
      baixa (uso permitido pelo §2.6 do briefing). Se no futuro surgir
      uma foto real do pinguim, é só trocar em
      `components/sections/RespiroAtmosferico.tsx`.
- [x] ~~Resposta de "Quanto tempo dura cada aula?"~~ no FAQ — respondido:
      tempo e quantidade variam por objetivo, definidos na reunião de
      diagnóstico.

## Institucional / jurídico

- [ ] **Instagram oficial** (usuário/URL) — `siteConfig.ts`.
- [ ] **CNPJ** — reservado em comentário no rodapé
      (`components/layout/Footer.tsx`), não preenchido.
- [ ] **Política de Privacidade** — página/rota ainda não existe.
- [ ] **Termos de Uso** — página/rota ainda não existe.
- [ ] **Confirmação sobre exclusividade da marca** — ver a nota sobre o
      texto "NORVEN" em `assets/brand/README.md`. Recomendado esclarecer
      com o cliente antes de considerar o logo definitivo.

## Endereço e contato (JSON-LD / SEO)

Em `lib/jsonLd.ts`, os campos `address`, `telephone` e `sameAs` do
schema.org `EducationalOrganization` estão comentados — preencher apenas
quando o cliente confirmar os dados reais.

## Landing page de tráfego pago (`/diagnostico`)

Funil de objetivo único, isolado do site institucional: sem menu, sem
links de saída, não linkada em lugar nenhum e fora do `sitemap.xml`. O
acesso é exclusivamente pelo link do anúncio.

- **URL para usar no anúncio**: `https://SEU-DOMINIO/diagnostico`
- **Rastreio de origem**: os CTAs da LP usam uma mensagem de WhatsApp
  própria ("Vim pelo anúncio...", em `siteConfig.whatsappMessageLp`), o
  que permite separar leads de anúncio dos leads do site.
- **Indexação**: mantida indexável de propósito — o Google Ads exige que
  a página de destino seja rastreável. Se algum dia quiser tirá-la da
  busca orgânica, adicionar `robots: { index: false }` na metadata da
  página (só depois de confirmar que não quebra a campanha).

Pendente nesta LP:

- [x] ~~Vídeos de depoimento~~ — o primeiro está no ar: Maria Clara
      (Aluna Premium), com uso de imagem autorizado por ela. Aparece na
      LP e em `/resultados`. Para adicionar outros, basta preencher
      `videoUrl` (e opcionalmente `photoUrl`, a capa) em qualquer
      depoimento de `lib/content.ts` — o bloco aparece sozinho.
      **Antes de subir um vídeo novo, ver "Como preparar um vídeo" no
      `README.md`**: arquivos de celular costumam vir em HEVC, que não
      toca em Chrome/Firefox, e acima de 100 MB o GitHub recusa.
- [ ] **Bio/credencial do professor** — hoje a seção "Quem ensina" mostra
      só os critérios de qualificação. Uma credencial nomeada aumentaria
      a autoridade percebida, especialmente para o público de negócios.

## Removido por decisão do cliente

- **Seção "Parcerias"** — removida de `/resultados` a pedido do cliente,
  já que as parcerias atuais não são de longo prazo. Se no futuro a
  escola quiser voltar a exibir parceiros, recriar o componente
  `Parcerias.tsx` e o array `partners` em `lib/content.ts` (removidos
  neste commit).

## Fora do escopo desta entrega (mencionar se o cliente perguntar)

- Duração exata de cada aula (não confirmada em nenhum momento do
  briefing).
- Preços/valores de qualquer modalidade — deliberadamente ausentes do
  site inteiro, por instrução explícita do briefing (decisão de produto,
  não pendência).
