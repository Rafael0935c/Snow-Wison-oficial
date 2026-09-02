const sharp = require("sharp");
const path = require("path");

/**
 * Gera a capa (poster) de um depoimento em vídeo, no formato vertical
 * 9:16, usando o símbolo da marca sobre o fundo institucional.
 *
 * Uso:
 *   node scripts/make-video-poster.js public/videos/depoimento-1-capa.jpg
 *   node scripts/make-video-poster.js <saida.jpg> "OUTRO RÓTULO"
 */
const OUT = process.argv[2] || "public/videos/depoimento-1-capa.jpg";
const LABEL = process.argv[3] || "DEPOIMENTO";

const W = 720;
const H = 1280;

// Mesmas cores do site (app/globals.css)
const VOID = "#05070f";
const IVORY = "#f3f5f8";
const BLUE_SOFT = "#4fa3ff";

async function run() {
  const logo = await sharp(path.join("assets/brand/logo-mark.png"))
    .resize({ height: 420 })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  // Fundo: cor sólida + brilho radial azul, no mesmo espírito do
  // AmbientGlow usado nas seções do site.
  const background = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="42%" r="46%">
          <stop offset="0%" stop-color="${BLUE_SOFT}" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="${BLUE_SOFT}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${VOID}"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
    </svg>
  `);

  // Tipografia: Space Mono (usada no site) não existe como fonte de
  // sistema, então caímos em uma monoespaçada equivalente — o efeito
  // pretendido é o espaçamento largo em caixa alta, não a fonte exata.
  const text = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="${W / 2}" y="925"
            font-family="Consolas, 'Courier New', monospace"
            font-size="34" font-weight="700" letter-spacing="7"
            fill="${IVORY}" text-anchor="middle">SNOW WISON</text>
      <text x="${W / 2}" y="975"
            font-family="Consolas, 'Courier New', monospace"
            font-size="19" letter-spacing="9"
            fill="${BLUE_SOFT}" text-anchor="middle">${LABEL}</text>
    </svg>
  `);

  await sharp(background)
    .composite([
      {
        input: logo,
        top: Math.round(H * 0.36 - logoMeta.height / 2),
        left: Math.round(W / 2 - logoMeta.width / 2),
      },
      { input: text, top: 0, left: 0 },
    ])
    .jpeg({ quality: 88 })
    .toFile(OUT);

  const out = await sharp(OUT).metadata();
  console.log("capa gerada:", OUT, out.width + "x" + out.height);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
