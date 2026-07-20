/**
 * Renders docs/isletme-sahibi-google-gorunurluk.html → PDF (Ekiz brand).
 * Usage: node scripts/export-owner-guide-pdf.mjs
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "docs", "isletme-sahibi-google-gorunurluk.html");
const pdfPath = path.join(root, "docs", "isletme-sahibi-google-gorunurluk.pdf");

async function loadPuppeteer() {
  const require = createRequire(import.meta.url);
  try {
    return require("puppeteer");
  } catch {
    // npx may have installed elsewhere; try dynamic import after install
    return (await import("puppeteer")).default;
  }
}

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, {
    waitUntil: "networkidle0",
  });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
  });
  console.log("Wrote", pdfPath);
} finally {
  await browser.close();
}
