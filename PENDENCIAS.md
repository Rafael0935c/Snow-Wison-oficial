# Pendências — o que falta o cliente enviar

Este documento lista exatamente o que está faltando para o site sair do
estado atual ("estruturalmente pronto, com conteúdo real pendente") para
publicação final. Nada nesta lista foi inventado no código — em cada
caso, o site usa um estado vazio/desabilitado ou um `Placeholder` visível
até o dado real chegar.

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
      disfarçados de `.svg`. Ver `public/brand/README.md` para o
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
      texto "NORVEN" em `public/brand/README.md`. Recomendado esclarecer
      com o cliente antes de considerar o logo definitivo.

## Endereço e contato (JSON-LD / SEO)

Em `lib/jsonLd.ts`, os campos `address`, `telephone` e `sameAs` do
schema.org `EducationalOrganization` estão comentados — preencher apenas
quando o cliente confirmar os dados reais.

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
