/**
 * Composite real site screenshots onto cinematic backdrops
 * so client logos stay exact.
 */
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "puppeteer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = "C:/Users/Mert/.cursor/projects/c-Users-Mert-OneDrive-Desktop-Projects-ekiz-yazilim/assets";
const chrome = process.env.CHROME;

const frames = [
  {
    out: "basak.jpg",
    bg: join(assets, "hero-bg-basak.jpg"),
    site: join(root, "public/works/basak-desktop.png"),
    rotate: "-4deg",
    shadow: "#bfd5eb",
  },
  {
    out: "oncu.jpg",
    bg: join(assets, "hero-bg-oncu.jpg"),
    site: join(root, "public/works/sahika-desktop.png"),
    rotate: "3deg",
    shadow: "#bfd5eb",
  },
  {
    out: "lider.jpg",
    bg: join(assets, "hero-bg-lider.jpg"),
    site: join(root, "public/works/lider-desktop.png"),
    rotate: "-2deg",
    shadow: "#f5d76e",
  },
  {
    out: "lila.jpg",
    bg: join(assets, "hero-bg-lila.jpg"),
    site: join(root, "public/works/lila-desktop.png"),
    rotate: "4deg",
    shadow: "#c4b0d4",
  },
];

function html(frame) {
  const bg = pathToFileURL(frame.bg).href;
  const site = pathToFileURL(frame.site).href;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #111; }
  .stage { position: relative; width: 1920px; height: 1080px; }
  .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .card {
    position: absolute;
    left: 12%;
    top: 11%;
    width: 76%;
    height: 78%;
    transform: rotate(${frame.rotate});
    border: 3px solid #000;
    box-shadow: 28px 36px 0 0 ${frame.shadow};
    background: #000;
    overflow: hidden;
  }
  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
</style>
</head>
<body>
  <div class="stage">
    <img class="bg" src="${bg}" alt="" />
    <div class="card"><img src="${site}" alt="" /></div>
  </div>
</body>
</html>`;
}

const browser = await launch({
  headless: true,
  executablePath: chrome,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const frame of frames) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    const file = join(tmpdir(), `ekiz-hero-${frame.out}.html`);
    writeFileSync(file, html(frame));
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    await page.waitForSelector(".card img");
    await new Promise((r) => setTimeout(r, 400));
    const dest = join(root, "public/websitesi/hero", frame.out);
    await page.screenshot({
      path: dest,
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });
    await page.close();
    console.log("wrote", dest);
  }
} finally {
  await browser.close();
}
