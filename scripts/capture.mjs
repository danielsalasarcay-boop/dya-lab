// Captura real de los sitios de clientes → public/work/<cliente>/*.webp
// Uso: node scripts/capture.mjs
import { chromium, devices } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SITES = [
  { slug: "loopi", url: "https://loopivzla.com" },
  { slug: "quality-bikes", url: "https://qualitybikesvzla.com" },
  { slug: "mar-caribe", url: "https://alimentosmarcaribe.com" },
];

const WEBP_MAX = 16000; // límite de alto de WebP

async function settle(page) {
  // Recorre la página para disparar lazy-load y animaciones de entrada.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
}

async function toWebp(buf, out, width) {
  let img = sharp(buf, { limitInputPixels: false });
  const meta = await img.metadata();
  const w = Math.min(width || meta.width, meta.width);
  const h = Math.round((meta.height * w) / meta.width);
  // Nunca recortar: si excede el límite de WebP, se escala para caber.
  img = h > WEBP_MAX ? img.resize({ height: WEBP_MAX }) : img.resize({ width: w });
  await img.webp({ quality: 80 }).toFile(out);
}

// Página completa "como la ve el visitante": baja viewport a viewport para que
// corran las animaciones ligadas al scroll, y cose los cuadros. Los elementos
// fijos (header, botones flotantes) solo aparecen en el primer cuadro.
async function stitched(page) {
  const vh = page.viewportSize().height;
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const dpr = await page.evaluate(() => window.devicePixelRatio);
  const tiles = [];
  for (let y = 0, i = 0; y < total; y += vh, i++) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(900);
    if (i === 1)
      await page.evaluate(() => {
        for (const el of document.querySelectorAll("body *")) {
          const p = getComputedStyle(el).position;
          if (p === "fixed" || p === "sticky") el.style.visibility = "hidden";
        }
      });
    const realY = await page.evaluate(() => window.scrollY);
    tiles.push({ input: await page.screenshot(), top: Math.round(realY * dpr), left: 0 });
  }
  const width = page.viewportSize().width * dpr;
  return sharp({ create: { width, height: Math.round(total * dpr), channels: 3, background: "#fff" }, limitInputPixels: false })
    .composite(tiles).png().toBuffer();
}

async function inspect(page) {
  return page.evaluate(() => {
    const fonts = new Map();
    const colors = new Map();
    const bump = (m, k) => k && m.set(k, (m.get(k) || 0) + 1);
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
        bump(fonts, cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
      bump(colors, cs.backgroundColor !== "rgba(0, 0, 0, 0)" ? "bg " + cs.backgroundColor : null);
      bump(colors, "fg " + cs.color);
    }
    const top = (m, n) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n);
    const h1 = document.querySelector("h1");
    return {
      title: document.title,
      h1: h1?.innerText,
      h1Font: h1 && getComputedStyle(h1).fontFamily,
      fonts: top(fonts, 6),
      colors: top(colors, 12),
      sections: [...document.querySelectorAll("section, [id]")].map((s) => s.id).filter(Boolean).slice(0, 20),
    };
  });
}

const browser = await chromium.launch();
const report = {};
for (const { slug, url } of SITES) {
  const dir = `public/work/${slug}`;
  await mkdir(dir, { recursive: true });

  const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desk.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await settle(desk);
  report[slug] = await inspect(desk);
  await toWebp(await desk.screenshot(), `${dir}/${slug}-hero.webp`, 1440);
  await toWebp(await stitched(desk), `${dir}/${slug}-desktop-full.webp`, 1440);
  await desk.close();

  const ctx = await browser.newContext({ ...devices["iPhone 13"], viewport: { width: 390, height: 844 } });
  const mob = await ctx.newPage();
  await mob.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await settle(mob);
  await toWebp(await mob.screenshot(), `${dir}/${slug}-mobile-hero.webp`, 780);
  await toWebp(await stitched(mob), `${dir}/${slug}-mobile-full.webp`, 780);
  await ctx.close();
  console.log("ok", slug);
}
await browser.close();
await writeFile("scripts/capture-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
