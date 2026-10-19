import sharp from "sharp";
import { writeFileSync } from "node:fs";

/**
 * Gera os ícones do site a partir do símbolo da marca. Rodar de novo
 * sempre que o logo mudar (por exemplo, quando chegar o vetor definitivo):
 *
 *   node scripts/make-icons.mjs
 *
 * Saídas, todas versionadas:
 *   assets/brand/icon-192.png  servido em /icon por app/icon.tsx
 *   public/icon-512.png        referenciado no manifest
 *   app/favicon.ico            48x48 e 32x32 embutidos
 *
 * Um desenho só para todos os tamanhos: quadrado opaco no fundo da marca
 * com o pinguim centralizado e respiro em volta. Cada tamanho é reduzido
 * direto do original com Lanczos (melhor que reduzir um ícone já pequeno).
 */
const SRC = "assets/brand/logo-mark.png";
const BG = "#05070F";

// Altura do pinguim em relação ao lado do ícone; o restante é respiro.
// Testado em 62%, 68% e 74%: abaixo disso o pinguim some na aba do
// navegador (32 px); acima, o respiro quase desaparece. Com 68% o desenho
// inteiro cabe num círculo inscrito no quadrado, o que importa onde o
// ícone é exibido recortado em círculo.
const LOGO_HEIGHT_RATIO = 0.68;

async function renderIcon(size) {
  const height = Math.round(size * LOGO_HEIGHT_RATIO);
  const logo = await sharp(SRC)
    .resize({ height, kernel: "lanczos3" })
    .toBuffer({ resolveWithObject: true });
  const width = logo.info.width;

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: logo.data,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Monta um .ico com PNGs embutidos (formato aceito por todos os navegadores
 * atuais). Estrutura: cabeçalho de 6 bytes, uma entrada de 16 bytes por
 * imagem, depois os PNGs em sequência.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo 1 = ícone
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;
  images.forEach(({ size, png }, i) => {
    const at = i * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, at); // largura (0 = 256)
    directory.writeUInt8(size >= 256 ? 0 : size, at + 1); // altura
    directory.writeUInt8(0, at + 2); // cores da paleta: nenhuma
    directory.writeUInt8(0, at + 3); // reservado
    directory.writeUInt16LE(1, at + 4); // planos
    directory.writeUInt16LE(32, at + 6); // bits por pixel
    directory.writeUInt32LE(png.length, at + 8); // tamanho do PNG
    directory.writeUInt32LE(offset, at + 12); // onde o PNG começa
    offset += png.length;
  });

  return Buffer.concat([header, directory, ...images.map((img) => img.png)]);
}

/** Lê o .ico de volta e confere que cada imagem tem o tamanho declarado. */
async function checkIco(ico, expectedSizes) {
  const count = ico.readUInt16LE(4);
  if (ico.readUInt16LE(2) !== 1 || count !== expectedSizes.length) {
    throw new Error("favicon.ico: cabeçalho inválido");
  }
  for (let i = 0; i < count; i++) {
    const at = 6 + i * 16;
    const declared = ico.readUInt8(at) || 256;
    const length = ico.readUInt32LE(at + 8);
    const start = ico.readUInt32LE(at + 12);
    const meta = await sharp(ico.subarray(start, start + length)).metadata();
    if (meta.width !== declared || meta.height !== declared || declared !== expectedSizes[i]) {
      throw new Error(`favicon.ico: entrada ${i} não é ${expectedSizes[i]}x${expectedSizes[i]}`);
    }
  }
}

async function main() {
  const icon192 = await renderIcon(192);
  const icon512 = await renderIcon(512);
  // 48 primeiro: é o tamanho que atende à exigência do Google (múltiplo de
  // 48 px) para quem lê só a primeira imagem do arquivo.
  const icoSizes = [48, 32];
  const ico = buildIco(
    await Promise.all(icoSizes.map(async (size) => ({ size, png: await renderIcon(size) })))
  );
  await checkIco(ico, icoSizes);

  for (const [buffer, expected] of [[icon192, 192], [icon512, 512]]) {
    const { width, height } = await sharp(buffer).metadata();
    if (width !== expected || height !== expected) throw new Error(`ícone ${expected}px saiu ${width}x${height}`);
  }

  writeFileSync("assets/brand/icon-192.png", icon192);
  writeFileSync("public/icon-512.png", icon512);
  writeFileSync("app/favicon.ico", ico);

  const kb = (b) => `${(b.length / 1024).toFixed(1)} KB`;
  console.log(`assets/brand/icon-192.png  192x192  ${kb(icon192)}`);
  console.log(`public/icon-512.png        512x512  ${kb(icon512)}`);
  console.log(`app/favicon.ico            ${icoSizes.map((s) => `${s}x${s}`).join(" + ")}  ${kb(ico)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
