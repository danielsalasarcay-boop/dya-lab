// Genera la imagen para redes (OG/Twitter) 1200x630 con la marca y capturas reales.
// Uso: node scripts/og.mjs
import { chromium } from "playwright";
import { readFile, writeFile, copyFile } from "node:fs/promises";

const logo = (await readFile("brand/logo-full.svg", "utf8"))
  .replace(/#255139/g, "#1F4D38").replace(/#F27452/g, "#F07A5A");
const img = async (p) => `data:image/webp;base64,${(await readFile(p)).toString("base64")}`;
const [loopi, qb, mc] = await Promise.all([
  img("public/work/loopi/loopi-hero.webp"),
  img("public/work/quality-bikes/quality-bikes-hero.webp"),
  img("public/work/mar-caribe/mar-caribe-hero.webp"),
]);

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#FAF6F0;font-family:Montserrat;overflow:hidden;position:relative}
.logo{position:absolute;left:64px;top:56px;width:250px}
h1{position:absolute;left:64px;top:170px;width:560px;font-size:64px;line-height:1.02;letter-spacing:-.035em;color:#1F4D38;font-weight:800}
h1 em{font-style:normal;color:#B04A2E}
.tag{position:absolute;left:64px;bottom:56px;font:500 17px 'JetBrains Mono';letter-spacing:.12em;text-transform:uppercase;color:#5B605C}
.tag b{color:#B04A2E;font-weight:500}
.f{position:absolute;width:520px;border-radius:14px;overflow:hidden;border:1px solid rgba(31,77,56,.14);background:#fff;box-shadow:0 30px 60px -30px rgba(43,43,43,.45)}
.f i{display:block;height:24px;background:#FAF6F0;border-bottom:1px solid rgba(31,77,56,.14)}
.f img{display:block;width:100%}
.band{position:absolute;right:0;top:0;bottom:0;width:430px;background:#1F4D38}
</style></head><body>
<div class="band"></div>
<div class="logo">${logo}</div>
<h1>Webs y marcas para negocios que <em>quieren vender.</em></h1>
<p class="tag"><b>‹</b> Diseño web y de marca · Venezuela <b>›</b></p>
<div class="f" style="right:-40px;top:48px"><i></i><img src="${mc}"></div>
<div class="f" style="right:20px;top:170px"><i></i><img src="${qb}"></div>
<div class="f" style="right:80px;top:292px"><i></i><img src="${loopi}"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "src/app/opengraph-image.png" });
await browser.close();
await copyFile("src/app/opengraph-image.png", "src/app/twitter-image.png");
const alt = "D&A Lab — Webs y marcas para negocios que quieren vender";
await writeFile("src/app/opengraph-image.alt.txt", alt);
await writeFile("src/app/twitter-image.alt.txt", alt);
console.log("ok");
