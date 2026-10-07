"use client";

import { useEffect, useRef, useState } from "react";

// Mascota de D&A Lab (zorro científico, render 3D con nano-banana Pro a partir
// del dibujo original en brand/mascota-original.jpg). Se asoma por el borde
// derecho de la tarjeta "El porqué".
//
// Movimiento: un solo bucle rAF con física de resortes (no keyframes), así se
// siente vivo y nunca repite exacto:
//   - respiración y balanceo con ondas de distinta frecuencia
//   - cada cierto tiempo se asoma más, con rebote amortiguado
//   - sigue al cursor con un resorte (solo con mouse)
//   - da un pequeño respingo cuando suelta la gota
//
// Poción (assets nano-banana Pro): del matraz cuelga una gota viscosa que se
// estira, se suelta y cae atravesando el borde de la sección hasta "Portafolio",
// donde salpica, brilla, se derrite hacia abajo y se desvanece.

const FLASK = { x: 0.13, y: 0.6 }; // boca del matraz, en fracción de la imagen

type Spring = { x: number; v: number };
const step = (s: Spring, target: number, k: number, d: number, dt: number) => {
  const a = -k * (s.x - target) - d * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
};

export function Mascot({ label }: { label: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const flow = flowRef.current;
    if (!root || !body || !flow) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) setInView(true);
    }, { threshold: 0.2 });
    io.observe(root);
    if (reduce) return () => io.disconnect();

    // ---------- Movimiento vivo ----------
    const lean: Spring = { x: 0, v: 0 }; // asomarse (0 = normal, 1 = muy afuera)
    const tilt: Spring = { x: 0, v: 0 }; // hacia el cursor
    const kick: Spring = { x: 0, v: 0 }; // respingo
    let pointerX = 0;
    let leanTarget = 0;
    let nextPeek = performance.now() + 3500;
    let raf = 0;
    let last = performance.now();
    const t0 = last;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      const t = (now - t0) / 1000;

      if (now > nextPeek) {
        leanTarget = leanTarget > 0 ? 0 : 1;
        nextPeek = now + (leanTarget ? 1400 + Math.random() * 600 : 4200 + Math.random() * 3000);
      }
      step(lean, leanTarget, 38, 7.5, dt);
      step(tilt, pointerX, 22, 9, dt);
      step(kick, 0, 160, 9, dt);

      const breathe = Math.sin(t * 1.55) * 0.5 + Math.sin(t * 0.63 + 1.2) * 0.5;
      const sway = Math.sin(t * 0.83) * 0.6 + Math.sin(t * 2.1 + 0.4) * 0.15;
      const rot = -lean.x * 6 + sway * 0.9 - tilt.x * 5 + kick.x * 4;
      const tx = -lean.x * 6 + tilt.x * 3;
      const ty = breathe * -1.6 + kick.x * -3;
      const sy = 1 + breathe * 0.008;
      body.style.transform = `translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scaleY(${sy.toFixed(4)})`;
    };
    raf = requestAnimationFrame(loop);

    const fine = matchMedia("(hover: hover)").matches;
    const section = root.closest("section") ?? document.body;
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 520));
    };
    const onLeave = () => { pointerX = 0; };
    if (fine) {
      section.addEventListener("pointermove", onMove as EventListener);
      section.addEventListener("pointerleave", onLeave);
    }

    // ---------- Poción que cae hasta Portafolio ----------
    const drop = flow.querySelector<HTMLImageElement>(".pf-drop")!;
    const splat = flow.querySelector<HTMLImageElement>(".pf-splat")!;
    const glow = flow.querySelector<HTMLDivElement>(".pf-glow")!;
    const trail = flow.querySelector<HTMLImageElement>(".pf-trail")!;
    let alive = true;
    let timer = 0;
    const wait = (ms: number) => new Promise<void>((r) => { timer = window.setTimeout(r, ms); });

    const geometry = () => {
      const r = root.getBoundingClientRect();
      const mh = r.height;
      const mw = r.width;
      const sx = mw * FLASK.x;
      const sy = mh * FLASK.y;
      // Cae en el margen superior de la sección Portafolio (sin tapar textos).
      const target = document.querySelector<HTMLElement>("#trabajo");
      let landY = mh + 140;
      if (target) landY = target.getBoundingClientRect().top - r.top + 30;
      return { mw, sx, sy, landY: Math.max(landY, sy + 120) };
    };

    const cycle = async () => {
      while (alive) {
        if (!visible || document.hidden) { await wait(600); continue; }
        const g = geometry();
        const dw = Math.max(16, g.mw * 0.13);
        const dh = dw * 2.8;
        const sw = Math.max(150, g.mw * 1.3);
        const sh = sw * 0.456;
        Object.assign(drop.style, { width: `${dw}px`, left: `${g.sx - dw / 2}px`, top: `${g.sy}px` });
        Object.assign(trail.style, { width: `${dw * 0.7}px`, left: `${g.sx - dw * 0.35}px` });
        Object.assign(splat.style, { width: `${sw}px`, left: `${g.sx - sw / 2}px`, top: `${g.landY - sh * 0.42}px` });
        Object.assign(glow.style, { width: `${sw * 1.6}px`, height: `${sw * 0.9}px`, left: `${g.sx - sw * 0.8}px`, top: `${g.landY - sw * 0.45}px` });

        // 1) Gota viscosa que se estira colgando del matraz
        await drop.animate(
          [
            { opacity: 0, transform: "translateY(0) scale(0.6, 0.12)" },
            { opacity: 1, transform: "translateY(0) scale(0.95, 0.55)", offset: 0.55 },
            { opacity: 1, transform: "translateY(2px) scale(0.85, 1)" },
          ],
          { duration: 1500, easing: "cubic-bezier(.45,0,.4,1)", fill: "forwards" },
        ).finished.catch(() => {});
        if (!alive) return;

        // 2) Se suelta: respingo del zorro y caída con gravedad
        kick.v = -9;
        const dist = g.landY - g.sy - dh * 0.75;
        const dur = 380 + Math.sqrt(Math.max(0, dist)) * 30;
        const fall = drop.animate(
          [
            { transform: "translateY(2px) scale(0.85, 1)" },
            { transform: `translateY(${dist * 0.25}px) scale(0.8, 1.15)`, offset: 0.35 },
            { transform: `translateY(${dist}px) scale(0.7, 1.35)` },
          ],
          { duration: dur, easing: "cubic-bezier(.55,0,1,.6)", fill: "forwards" },
        );
        // estela fina que se rompe tras la gota
        trail.style.top = `${g.sy + dh * 0.1}px`;
        trail.animate(
          [
            { opacity: 0.9, height: `${dh * 0.3}px`, transform: "translateY(0)" },
            { opacity: 0, height: `${dh * 0.9}px`, transform: `translateY(${dist * 0.4}px)` },
          ],
          { duration: dur * 0.8, easing: "ease-in", fill: "forwards" },
        );
        await fall.finished.catch(() => {});
        if (!alive) return;
        drop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 90, fill: "forwards" });

        // 3) Impacto: salpicadura elástica + destello radiactivo
        glow.animate(
          [
            { opacity: 0, transform: "scale(0.4)" },
            { opacity: 1, transform: "scale(1)", offset: 0.15 },
            { opacity: 0.55, transform: "scale(1.05)", offset: 0.6 },
            { opacity: 0, transform: "scale(1.2)" },
          ],
          { duration: 3600, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
        );
        // 4) Se derrite: se hunde y escurre; 5) se evapora
        await splat.animate(
          [
            { opacity: 0, transform: "scale(0.15, 0.05)", filter: "brightness(1.8)" },
            { opacity: 1, transform: "scale(1.12, 0.82)", filter: "brightness(1.5)", offset: 0.07 },
            { opacity: 1, transform: "scale(0.96, 1.06)", filter: "brightness(1.15)", offset: 0.13 },
            { opacity: 1, transform: "scale(1.02, 0.98)", filter: "brightness(1.05)", offset: 0.19 },
            { opacity: 1, transform: "scale(1, 1) translateY(0)", filter: "brightness(1)", offset: 0.3 },
            { opacity: 0.95, transform: "scale(1.03, 1.16) translateY(5px)", filter: "brightness(0.95)", offset: 0.72 },
            { opacity: 0, transform: "scale(1.06, 1.3) translateY(12px)", filter: "brightness(0.8)" },
          ],
          { duration: 4200, easing: "linear", fill: "forwards" },
        ).finished.catch(() => {});
        if (!alive) return;
        await wait(1600 + Math.random() * 1600);
      }
    };
    const start = window.setTimeout(() => { void cycle(); }, 1600);

    return () => {
      alive = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(start);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
      [drop, splat, glow, trail].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    };
  }, []);

  return (
    <div ref={rootRef} className={`mascot ${inView ? "is-in" : ""}`} aria-hidden>
      <div className="mascot-enter">
        <div ref={bodyRef} className="mascot-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mascota-peek-300.webp"
            srcSet="/brand/mascota-peek-300.webp 300w, /brand/mascota-peek-600.webp 600w"
            sizes="(min-width:1024px) 150px, 112px"
            width={300}
            height={493}
            alt={label}
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
      </div>
      {/* Capa de la poción: sale del matraz y cae hasta la sección Portafolio */}
      <div ref={flowRef} className="potion-flow">
        <div className="pf-glow" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pf-trail" src="/brand/potion-drop-80.webp" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pf-splat" src="/brand/potion-splat-600.webp" srcSet="/brand/potion-splat-600.webp 600w, /brand/potion-splat-1100.webp 1100w" sizes="260px" alt="" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pf-drop" src="/brand/potion-drop-80.webp" srcSet="/brand/potion-drop-80.webp 80w, /brand/potion-drop-160.webp 160w" sizes="20px" alt="" loading="lazy" />
      </div>
    </div>
  );
}
