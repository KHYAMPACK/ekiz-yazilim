/**
 * Viewport screenshots for the İşler section.
 * Same laptop (1920×1080) and iPhone 13 (390×844) for every site.
 * Usage: node scripts/capture-works-screenshots.mjs
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { launch } from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "works");

const sites = [
  { id: "sahika", url: "https://www.sahikaoncuminikler.com/" },
  { id: "lider", url: "https://www.denizlilidercocuklaranaokulu.com/" },
  { id: "basak", url: "https://basakakademi20.com/" },
];

const DESKTOP = { width: 1920, height: 1080, deviceScaleFactor: 1 };
const PHONE = {
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1";

async function settle(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
  });
  await new Promise((r) => setTimeout(r, 2800));
}

async function shot(browser, site, kind) {
  const page = await browser.newPage();
  page.setDefaultTimeout(60_000);
  if (kind === "mobile") {
    await page.setUserAgent(IPHONE_UA);
    await page.setViewport(PHONE);
  } else {
    await page.setViewport(DESKTOP);
  }
  await page.goto(site.url, { waitUntil: "load", timeout: 60_000 });
  await settle(page);
  const isMobile = kind === "mobile";
  const file = join(outDir, `${site.id}-${isMobile ? "mobile" : "desktop"}.png`);
  await page.screenshot({
    path: file,
    type: "png",
    clip: isMobile
      ? { x: 0, y: 0, width: 390, height: 844 }
      : { x: 0, y: 0, width: 1920, height: 1080 },
  });
  await page.close();
  console.log("wrote", file);
}

mkdirSync(outDir, { recursive: true });

const browser = await launch({
  headless: true,
  protocolTimeout: 120_000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const site of sites) {
    await shot(browser, site, "desktop");
    await shot(browser, site, "mobile");
  }
} finally {
  await browser.close();
}
