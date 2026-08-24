const sharp = require("sharp");
const path = require("path");

const SRC = path.join(process.cwd(), "public/brand/logo-mark-source.png");
const OUT = path.join(process.cwd(), "public/brand/logo-mark.png");

async function run() {
  const image = sharp(SRC);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const w = info.width;
  const h = info.height;

  function pixelAt(x, y) {
    const idx = (y * w + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }
  const corners = [pixelAt(0, 0), pixelAt(w - 1, 0), pixelAt(0, h - 1), pixelAt(w - 1, h - 1)];
  const bg = corners.reduce(
    (acc, c) => [acc[0] + c[0] / 4, acc[1] + c[1] / 4, acc[2] + c[2] / 4],
    [0, 0, 0]
  );

  const THRESHOLD_FULL = 18;
  const THRESHOLD_FEATHER = 55;

  for (let i = 0; i < w * h; i++) {
    const idx = i * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const dist = Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);

    let alpha;
    if (dist <= THRESHOLD_FULL) {
      alpha = 0;
    } else if (dist >= THRESHOLD_FEATHER) {
      alpha = 255;
    } else {
      alpha = Math.round(((dist - THRESHOLD_FULL) / (THRESHOLD_FEATHER - THRESHOLD_FULL)) * 255);
    }
    data[idx + 3] = alpha;
  }

  // Trim first, working in the trimmed image's own coordinate space from
  // here on (keeps the targeted cleanup below independent of the source
  // canvas's original padding).
  const trimmed = await sharp(data, { raw: { width: w, height: h, channels } })
    .trim({ threshold: 10 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const tw = trimmed.info.width;
  const th = trimmed.info.height;
  const tdata = trimmed.data;
  const tchannels = trimmed.info.channels;

  // Surgical cleanup: the source art has a soft ground-shadow/glow near
  // the feet that blends smoothly toward white, so the color-distance key
  // marks parts of it as semi-opaque "foreground". Within that specific
  // region (bottom-left, found by visual inspection of the trimmed
  // silhouette), drop anything that isn't fully solid — real silhouette
  // edges are crisp (alpha 255), the shadow is the only thing left partial.
  const region = { x0: 0.08, x1: 0.5, y0: 0.82, y1: 1.0 };
  for (let y = Math.floor(th * region.y0); y < th; y++) {
    for (let x = Math.floor(tw * region.x0); x < Math.floor(tw * region.x1); x++) {
      const aIdx = (y * tw + x) * tchannels + 3;
      tdata[aIdx] = 0;
    }
  }

  // Despeckle: the source has scattered single-pixel-cluster noise in
  // what should be pure background. Keep only connected components of
  // opaque pixels above a minimum size — the real silhouette is a huge
  // connected region, noise specks are tiny isolated islands.
  const MIN_COMPONENT_SIZE = 2000;
  const labelVisited = new Uint8Array(tw * th);
  const stack = [];
  for (let y = 0; y < th; y++) {
    for (let x = 0; x < tw; x++) {
      const i = y * tw + x;
      if (labelVisited[i]) continue;
      const aIdx = i * tchannels + 3;
      if (tdata[aIdx] === 0) {
        labelVisited[i] = 1;
        continue;
      }
      // BFS this component.
      const component = [i];
      labelVisited[i] = 1;
      stack.length = 0;
      stack.push(i);
      while (stack.length) {
        const cur = stack.pop();
        const cx = cur % tw;
        const cy = (cur / tw) | 0;
        const neighbors = [
          [cx - 1, cy],
          [cx + 1, cy],
          [cx, cy - 1],
          [cx, cy + 1],
        ];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || nx >= tw || ny < 0 || ny >= th) continue;
          const ni = ny * tw + nx;
          if (labelVisited[ni]) continue;
          if (tdata[ni * tchannels + 3] === 0) {
            labelVisited[ni] = 1;
            continue;
          }
          labelVisited[ni] = 1;
          component.push(ni);
          stack.push(ni);
        }
      }
      if (component.length < MIN_COMPONENT_SIZE) {
        for (const ci of component) {
          tdata[ci * tchannels + 3] = 0;
        }
      }
    }
  }

  await sharp(tdata, { raw: { width: tw, height: th, channels: tchannels } })
    .png()
    .trim({ threshold: 10 })
    .toFile(OUT);

  const outMeta = await sharp(OUT).metadata();
  console.log("Output written:", OUT, "size:", outMeta.width, "x", outMeta.height);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
