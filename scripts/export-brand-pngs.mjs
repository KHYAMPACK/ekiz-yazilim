/**
 * Rasterize brand SVG exports to PNG at useful sizes.
 * Uses @resvg/resvg-js so <text> renders with Space Grotesk (brand/exports/fonts/)
 * or system Arial/Helvetica as fallback.
 *
 * Usage: node scripts/export-brand-pngs.mjs
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const exportsDir = path.join(root, "brand", "exports");
const pngDir = path.join(exportsDir, "png");
const fontsDir = path.join(exportsDir, "fonts");

const WIN_FONTS = process.env.WINDIR
  ? path.join(process.env.WINDIR, "Fonts")
  : "C:/Windows/Fonts";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectFontFiles() {
  const files = [];
  const candidates = [
    path.join(fontsDir, "SpaceGrotesk.ttf"),
    path.join(fontsDir, "SpaceGrotesk-Regular.ttf"),
    path.join(fontsDir, "SpaceGrotesk-Medium.ttf"),
    path.join(fontsDir, "SpaceGrotesk-SemiBold.ttf"),
    path.join(fontsDir, "SpaceGrotesk-Bold.ttf"),
    path.join(fontsDir, "SpaceGrotesk-Light.ttf"),
    path.join(WIN_FONTS, "arial.ttf"),
    path.join(WIN_FONTS, "arialbd.ttf"),
    path.join(WIN_FONTS, "ariali.ttf"),
    path.join(WIN_FONTS, "ARIAL.TTF"),
    path.join(WIN_FONTS, "segoeui.ttf"),
    path.join(WIN_FONTS, "segoeuib.ttf"),
    path.join(WIN_FONTS, "segoeuil.ttf"),
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
  ];
  for (const f of candidates) {
    if (await exists(f)) files.push(f);
  }
  return files;
}

function renderSvg(svg, { width, fontFiles }) {
  const resvg = new Resvg(svg, {
    fitTo: width ? { mode: "width", value: width } : undefined,
    font: {
      fontFiles,
      loadSystemFonts: true,
      defaultFontFamily: "Space Grotesk",
    },
    background: "rgba(0,0,0,0)",
  });
  return resvg.render().asPng();
}

function pngSize(buf) {
  // IHDR width/height at bytes 16-23
  if (buf[0] !== 0x89 || buf[1] !== 0x50) return { width: null, height: null };
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

const JOBS = [
  { svg: "ekiz-mark.svg", out: "ekiz-mark-512.png", width: 512 },
  { svg: "ekiz-mark.svg", out: "ekiz-mark-128.png", width: 128 },
  { svg: "ekiz-mark-black.svg", out: "ekiz-mark-black-512.png", width: 512 },
  { svg: "ekiz-mark-black.svg", out: "ekiz-mark-black-128.png", width: 128 },
  { svg: "ekiz-logo-horizontal-white.svg", out: "ekiz-logo-horizontal-white-1200.png", width: 1200 },
  { svg: "ekiz-logo-horizontal-black.svg", out: "ekiz-logo-horizontal-black-1200.png", width: 1200 },
  { svg: "ekiz-powered-by.svg", out: "ekiz-powered-by-1600.png", width: 1600 },
  { svg: "ekiz-powered-by-full-mark.svg", out: "ekiz-powered-by-full-mark-1600.png", width: 1600 },
  { svg: "ekiz-powered-by.svg", out: "ekiz-powered-by-800.png", width: 800 },
  { svg: "ekiz-powered-by-full-mark.svg", out: "ekiz-powered-by-full-mark-800.png", width: 800 },
];

async function main() {
  await mkdir(pngDir, { recursive: true });
  const fontFiles = await collectFontFiles();
  console.log(
    "Fonts loaded:",
    fontFiles.length ? fontFiles.map((f) => path.basename(f)).join(", ") : "(system only)"
  );

  const results = [];
  for (const job of JOBS) {
    const svgPath = path.join(exportsDir, job.svg);
    const svg = await readFile(svgPath, "utf8");
    const png = renderSvg(svg, { width: job.width, fontFiles });
    const outPath = path.join(pngDir, job.out);
    await writeFile(outPath, png);
    const dim = pngSize(Buffer.from(png));
    results.push({
      out: job.out,
      bytes: png.length,
      width: dim.width,
      height: dim.height,
    });
    console.log(
      `OK ${job.out}  ${dim.width}x${dim.height}  ${(png.length / 1024).toFixed(1)} KB`
    );
  }

  await writeFile(
    path.join(pngDir, "manifest.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        fonts: fontFiles.map((f) => path.basename(f)),
        results,
      },
      null,
      2
    )
  );
  console.log(`\nDone -> ${pngDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});