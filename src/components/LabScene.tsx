"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Escena de laboratorio de la página Nosotros. La mascota (renders nano-banana Pro:
// bata especial con el logo de D&A Lab y gafas) mezcla dos sustancias:
//   1. los tubos brillan y burbujean           2. gotas coral pasan al tubo verde
//   3. la mezcla reacciona: se aclara y tiembla 4. explosión: destello, nube y chispas
//   5. la nube se disipa: el zorro aparece asombrado y nace el botón "Ver portafolio"
// Todo con Web Animations API (sin librerías). El botón queda fijo tras la primera
// explosión; la mezcla se repite cada cierto tiempo. Respeta "reducir movimiento".

// Posiciones en % de la imagen del zorro (medidas sobre el render recortado).
const TUBE_L = { x: 42.5, y: 71 }; // líquido coral
const TUBE_R = { x: 73.5, y: 68.5 }; // líquido verde
const MOUTH_L = { x: 57.5, y: 61 };
const MOUTH_R = { x: 66.5, y: 60.5 };
const BLAST = { x: 62, y: 58 };

export function LabScene({ cta, href }: { cta: string; href: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const q = <T extends Element>(s: string) => scene.querySelector<T>(s)!;
    const qa = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s));
    const fox = q<HTMLDivElement>(".lab-fox");
    const mix = q<HTMLImageElement>(".lab-mix");
    const wow = q<HTMLImageElement>(".lab-wow");
    const glowL = q<HTMLDivElement>(".lab-glow-l");
    const glowR = q<HTMLDivElement>(".lab-glow-r");
    const bubbles = qa<HTMLSpanElement>(".lab-bubble");
    const pour = qa<HTMLSpanElement>(".lab-pour");
    const flash = q<HTMLDivElement>(".lab-flash");
    const poof = q<HTMLImageElement>(".lab-poof");
    const sparks = qa<HTMLSpanElement>(".lab-spark");
    const ring = q<HTMLDivElement>(".lab-ring");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mix.style.opacity = "0";
      wow.style.opacity = "1";
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    let alive = true;
    let visible = false;
    let timer = 0;
    const wait = (ms: number) => new Promise<void>((r) => { timer = window.setTimeout(r, ms); });
    const done = (a: Animation) => a.finished.then(() => {}, () => {});

    // Respiración continua del zorro (independiente de la historia)
    const breathe = fox.animate(
      [
        { transform: "translateY(0) rotate(0deg) scale(1)" },
        { transform: "translateY(-3px) rotate(-0.6deg) scale(1.006)", offset: 0.5 },
        { transform: "translateY(0) rotate(0deg) scale(1)" },
      ],
      { duration: 3800, iterations: Infinity, easing: "ease-in-out" },
    );

    const bubbleLoop = (rate: number, color: string) =>
      bubbles.map((b, i) => {
        const side = i % 2 ? TUBE_R : TUBE_L;
        b.style.left = `${side.x + (Math.random() - 0.5) * 3}%`;
        b.style.top = `${side.y - 6}%`;
        b.style.background = color;
        return b.animate(
          [
            { opacity: 0, transform: "translate(0,0) scale(0.4)" },
            { opacity: 0.9, transform: `translate(${(Math.random() - 0.5) * 6}px,-10px) scale(1)`, offset: 0.3 },
            { opacity: 0, transform: `translate(${(Math.random() - 0.5) * 14}px,-${34 + Math.random() * 20}px) scale(0.6)` },
          ],
          { duration: 1400 / rate, delay: (i * 230) / rate, iterations: Infinity, easing: "cubic-bezier(.3,.6,.4,1)" },
        );
      });

    const story = async () => {
      while (alive) {
        if (!visible || document.hidden) { await wait(500); continue; }

        // 0) vuelve a la pose de mezcla (si viene de una explosión anterior)
        mix.animate([{ opacity: getComputedStyle(mix).opacity }, { opacity: 1 }], { duration: 700, fill: "forwards", easing: "ease" });
        wow.animate([{ opacity: getComputedStyle(wow).opacity }, { opacity: 0 }], { duration: 700, fill: "forwards", easing: "ease" });
        await wait(700);

        // 1) los líquidos se encienden y burbujean
        const gL = glowL.animate([{ opacity: 0.2, transform: "scale(0.9)" }, { opacity: 0.85, transform: "scale(1.05)" }], { duration: 900, direction: "alternate", iterations: Infinity, easing: "ease-in-out" });
        const gR = glowR.animate([{ opacity: 0.2, transform: "scale(0.9)" }, { opacity: 0.85, transform: "scale(1.05)" }], { duration: 1100, direction: "alternate", iterations: Infinity, easing: "ease-in-out" });
        let bub = bubbleLoop(1, "rgb(180 255 230 / 0.9)");
        await wait(1500);
        if (!alive) return;

        // 2) gotas coral pasan de un tubo al otro en arco
        await Promise.all(
          pour.map((p, i) =>
            done(p.animate(
              [
                { opacity: 0, left: `${MOUTH_L.x}%`, top: `${MOUTH_L.y}%`, transform: "scale(0.5)" },
                { opacity: 1, left: `${(MOUTH_L.x + MOUTH_R.x) / 2}%`, top: `${MOUTH_L.y - 5}%`, transform: "scale(1)", offset: 0.5 },
                { opacity: 0.2, left: `${MOUTH_R.x}%`, top: `${MOUTH_R.y + 1}%`, transform: "scale(0.6)" },
              ],
              { duration: 620, delay: i * 140, easing: "cubic-bezier(.35,.1,.45,1)", fill: "forwards" },
            )),
          ),
        );
        if (!alive) return;

        // 3) reacción: el tubo verde se vuelve blanco, todo tiembla y burbujea más
        bub.forEach((a) => a.cancel());
        bub = bubbleLoop(2.4, "rgb(255 255 255 / 0.95)");
        glowR.animate([{ background: getComputedStyle(glowR).background }, { background: "radial-gradient(closest-side, rgb(255 255 255 / 0.95), rgb(160 255 225 / 0.6) 45%, transparent 72%)" }], { duration: 900, fill: "forwards" });
        const shake = fox.animate(
          [
            { translate: "0 0" }, { translate: "-1.5px 0.5px" }, { translate: "1.5px -0.5px" }, { translate: "-2px 0" }, { translate: "2px 0.5px" }, { translate: "0 0" },
          ],
          { duration: 160, iterations: 7, easing: "linear" },
        );
        await done(shake);
        if (!alive) return;

        // 4) explosión
        const sx = `${BLAST.x}%`;
        const sy = `${BLAST.y}%`;
        flash.style.left = sx; flash.style.top = sy;
        poof.style.left = sx; poof.style.top = sy;
        ring.style.left = sx; ring.style.top = sy;
        flash.animate([{ opacity: 0, transform: "translate(-50%,-50%) scale(0.2)" }, { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.25 }, { opacity: 0, transform: "translate(-50%,-50%) scale(1.6)" }], { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" });
        ring.animate([{ opacity: 0.9, transform: "translate(-50%,-50%) scale(0.1)" }, { opacity: 0, transform: "translate(-50%,-50%) scale(2.4)" }], { duration: 900, easing: "cubic-bezier(.1,.8,.2,1)" });
        scene.animate([{ transform: "translate(0,0)" }, { transform: "translate(-4px,3px)" }, { transform: "translate(4px,-2px)" }, { transform: "translate(-2px,1px)" }, { transform: "translate(0,0)" }], { duration: 380, easing: "ease-out" });
        sparks.forEach((sp, i) => {
          const ang = (i / sparks.length) * Math.PI * 2 + Math.random() * 0.4;
          const dist = 90 + Math.random() * 90;
          sp.style.left = sx; sp.style.top = sy;
          sp.animate(
            [
              { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
              { opacity: 0, transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist + 30}px)) scale(0.3)` },
            ],
            { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.1,.75,.3,1)" },
          );
        });
        const cloud = poof.animate(
          [
            { opacity: 0, transform: "translate(-50%,-50%) scale(0.15) rotate(-20deg)", filter: "blur(4px)" },
            { opacity: 1, transform: "translate(-50%,-50%) scale(1.05) rotate(4deg)", filter: "blur(0px)", offset: 0.22 },
            { opacity: 1, transform: "translate(-50%,-50%) scale(1.12) rotate(8deg)", filter: "blur(0px)", offset: 0.55 },
            { opacity: 0, transform: "translate(-50%,-62%) scale(1.45) rotate(14deg)", filter: "blur(10px)" },
          ],
          { duration: 2300, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
        );
        gL.cancel(); gR.cancel();
        glowR.style.background = "";
        bub.forEach((a) => a.cancel());
        // el cambio de pose ocurre detrás de la nube
        await wait(330);
        mix.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" });
        wow.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: "forwards" });
        await wait(520);
        // 5) nace el botón en la explosión y sube a flotar sobre la cabeza (una vez)
        const sr = scene.getBoundingClientRect();
        const fr = fox.getBoundingClientRect();
        const bx = fr.left - sr.left + (fr.width * BLAST.x) / 100;
        const by = fr.top - sr.top + (fr.height * BLAST.y) / 100;
        scene.style.setProperty("--fx", `${(bx - sr.width / 2).toFixed(1)}px`);
        scene.style.setProperty("--fy", `${(by - sr.height * 0.065).toFixed(1)}px`);
        setRevealed(true);
        await done(cloud);
        if (!alive) return;

        await wait(5200 + Math.random() * 2500);
      }
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(scene);
    const start = window.setTimeout(() => { void story(); }, 400);

    return () => {
      alive = false;
      io.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(start);
      breathe.cancel();
      scene.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={sceneRef} className="lab-scene relative mx-auto aspect-[1/1.16] w-full max-w-[460px]">
      <div aria-hidden className="lab-backdrop" />
      <div className="lab-fox absolute inset-x-0 bottom-0 mx-auto w-[86%]">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lab-mix block h-auto w-full" src="/brand/lab-mix-520.webp" srcSet="/brand/lab-mix-520.webp 520w, /brand/lab-mix-1000.webp 1000w" sizes="(min-width:1024px) 400px, 86vw" width={520} height={616} alt="Mascota de D&A Lab mezclando dos sustancias en tubos de ensayo" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lab-wow absolute inset-0 block h-auto w-full opacity-0" src="/brand/lab-wow-520.webp" srcSet="/brand/lab-wow-520.webp 520w, /brand/lab-wow-1000.webp 1000w" sizes="(min-width:1024px) 400px, 86vw" width={520} height={616} alt="" aria-hidden loading="lazy" />
          <div aria-hidden className="lab-glow lab-glow-l" style={{ left: `${TUBE_L.x}%`, top: `${TUBE_L.y}%` }} />
          <div aria-hidden className="lab-glow lab-glow-r" style={{ left: `${TUBE_R.x}%`, top: `${TUBE_R.y}%` }} />
          {Array.from({ length: 8 }, (_, i) => <span key={`b${i}`} aria-hidden className="lab-bubble" />)}
          {Array.from({ length: 5 }, (_, i) => <span key={`p${i}`} aria-hidden className="lab-pour" />)}
          <div aria-hidden className="lab-ring" />
          <div aria-hidden className="lab-flash" />
          {Array.from({ length: 18 }, (_, i) => <span key={`s${i}`} aria-hidden className={`lab-spark ${i % 3 === 0 ? "is-coral" : ""}`} />)}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img aria-hidden className="lab-poof" src="/brand/lab-poof-460.webp" srcSet="/brand/lab-poof-460.webp 460w, /brand/lab-poof-900.webp 900w" sizes="320px" alt="" loading="lazy" />
        </div>
      </div>
      {/* Botón que nace de la explosión */}
      <div className="lab-cta-wrap" data-on={revealed || undefined}>
        <Link href={href} className="lab-cta" tabIndex={revealed ? 0 : -1} aria-hidden={!revealed}>
          {cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
