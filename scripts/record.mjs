// Graba un video de cada sitio mientras se hace scroll, para que las fichas
// muestren los efectos reales (animaciones ligadas al scroll).
// Cuadro a cuadro: se baja N px, se espera a que el sitio pinte y se captura.
// Lento en el tramo del efecto, rápido en el resto. Salida: public/work/<slug>/.
// Uso: node scripts/record.mjs [slug]   (requiere ffmpeg)
import { chromium, devices } from "playwright";
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const FPS = 30;
const SITES = [
  // zones: tramos de scroll (px) con efecto, se recorren despacio. El resto va rápido.
  { slug: "loopi", url: "https://loopivzla.com", zones: [[0, 1300]], fast: 45 },
  { slug: "quality-bikes", url: "https://qualitybikesvzla.com", zones: [[0, 1250]], fast: 45 },
  { slug: "mar-caribe", url: "https://alimentosmarcaribe.com", zones: [[0, 2500]], fast: 75 },
  // Portada lápiz → foto y galería con brújula fija.
  { slug: "casa-panza", url: "https://danielsalasarcay-boop.github.io/casa-panza/index.html?v=20250428", zones: [[0, 1400], [3500, 5100]], fast: 55 },
  // Portada aérea con el logo.
  // Página de casas: 6 propiedades y cierre aéreo con el hidroavión.
  { slug: "la-capital-del-cielo", url: "https://la-capital-del-cielo.vercel.app/casas.html", zones: [[0, 3700]], fast: 28 },
  // Fachada día → atardecer → noche y zoom aéreo de la galería.
  { slug: "casa-verde", url: "https://danielsalasarcay-boop.github.io/casa-verde/", zones: [[0, 2000], [5100, 8600]], fast: 55 },
];

const FORMATS = {
  desktop: { ctx: { viewport: { width: 1280, height: 800 } }, slow: 11, width: 1024 },
  mobile: { ctx: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }, slow: 9, width: 390 },
};

const only = process.argv[2];
const browser = await chromium.launch();

for (const site of SITES.filter((s) => !only || s.slug === only)) {
  for (const [fmt, cfg] of Object.entries(FORMATS)) {
    const tmp = path.join(os.tmpdir(), `rec-${site.slug}-${fmt}`);
    await rm(tmp, { recursive: true, force: true });
    await mkdir(tmp, { recursive: true });

    const ctx = await browser.newContext(cfg.ctx);
    const page = await ctx.newPage();
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 90000 });
    // Precarga: recorrer la página para que las imágenes perezosas ya estén.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2500);

    const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    let frame = 0;
    const shot = async () => {
      await page.screenshot({ path: path.join(tmp, `${String(frame++).padStart(5, "0")}.jpg`), type: "jpeg", quality: 90 });
    };
    const hold = async (n) => { for (let i = 0; i < n; i++) { await page.waitForTimeout(1000 / FPS); await shot(); } };

    await hold(24); // pausa inicial en el hero
    let y = 0;
    const inZone = (v) => site.zones.some(([a, b]) => v >= a && v < b);
    while (y < total) {
      const slow = inZone(y);
      y = Math.min(total, y + (slow ? cfg.slow : site.fast));
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(slow ? 90 : 45);
      await shot();
    }
    await hold(18); // pausa final

    await mkdir(`public/work/${site.slug}`, { recursive: true });
    const out = `public/work/${site.slug}/${site.slug}-${fmt}.mp4`;
    execFileSync("ffmpeg", [
      "-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(tmp, "%05d.jpg"),
      "-vf", `scale=${cfg.width}:-2:flags=lanczos`, "-c:v", "libx264", "-preset", "slow", "-crf", "30",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out,
    ]);
    // Póster = primer cuadro (así el paso de imagen a video no salta).
    await sharp(path.join(tmp, "00000.jpg")).resize({ width: cfg.width }).webp({ quality: 80 })
      .toFile(`public/work/${site.slug}/${site.slug}-${fmt}-poster.webp`);
    await ctx.close();
    console.log(`ok ${site.slug} ${fmt}: ${frame} cuadros (${(frame / FPS).toFixed(1)} s)`);
  }
}
await browser.close();
