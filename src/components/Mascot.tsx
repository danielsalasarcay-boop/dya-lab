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

    // ---------- Poción: gota → portal en el borde → gotitas en Portafolio ----------
    const drop = flow.querySelector<HTMLImageElement>(".pf-drop")!;
    const portal = flow.querySelector<HTMLDivElement>(".pf-portal")!;
    const blob = flow.querySelector<HTMLDivElement>(".pf-blob")!;
    const drips = Array.from(flow.querySelectorAll<HTMLImageElement>(".pf-drip"));
    const sparks = Array.from(flow.querySelectorAll<HTMLSpanElement>(".pf-spark"));
    const edgeLine = flow.querySelector<HTMLDivElement>(".pf-edge")!;
    let alive = true;
    let timer = 0;
    const wait = (ms: number) => new Promise<void>((r) => { timer = window.setTimeout(r, ms); });
    const done = (a: Animation) => a.finished.then(() => {}, () => {});

    const geometry = () => {
      const r = root.getBoundingClientRect();
      const mw = r.width;
      const sx = mw * FLASK.x;
      const sy = r.height * FLASK.y;
      // El portal se abre justo en el borde entre esta sección y Portafolio.
      const next = document.querySelector<HTMLElement>("#trabajo");
      const edge = next ? next.getBoundingClientRect().top - r.top : r.height + 80;
      return { mw, sx, sy, edge: Math.max(edge, sy + 80) };
    };

    const cycle = async () => {
      while (alive) {
        if (!visible || document.hidden) { await wait(600); continue; }
        const g = geometry();
        const dw = Math.max(12, g.mw * 0.085);
        const dh = dw * 2.8;
        const pw = Math.max(40, g.mw * 0.34);
        Object.assign(drop.style, { width: `${dw}px`, left: `${g.sx - dw / 2}px`, top: `${g.sy}px` });
        Object.assign(portal.style, { width: `${pw}px`, height: `${pw * 0.26}px`, left: `${g.sx - pw / 2}px`, top: `${g.edge - pw * 0.13}px` });
        // Línea de la división: centrada en la gota pero sin salirse de la pantalla
        const ew = Math.min(window.innerWidth * 0.6, 640);
        const rootLeft = root.getBoundingClientRect().left;
        const maxLeft = document.documentElement.clientWidth - rootLeft - ew - 8;
        const el = Math.min(g.sx - ew / 2, maxLeft);
        Object.assign(edgeLine.style, { width: `${ew}px`, left: `${el}px`, top: `${g.edge - 1}px` });
        Object.assign(blob.style, { width: `${dw * 1.3}px`, height: `${dw * 0.55}px`, left: `${g.sx - dw * 0.65}px`, top: `${g.edge - dw * 0.3}px` });
        const dripW = [dw * 0.95, dw * 0.72, dw * 0.55];
        const dripX = [0, -pw * 0.18, pw * 0.2];
        drips.forEach((d, i) => {
          Object.assign(d.style, { width: `${dripW[i]}px`, left: `${g.sx - dripW[i] / 2 + dripX[i]}px`, top: `${g.edge - 2}px` });
        });
        sparks.forEach((sp, i) => {
          const k = Math.floor(i / 3);
          Object.assign(sp.style, { left: `${g.sx + dripX[k] - 2}px`, top: `${g.edge + 62 + k * 4}px` });
        });

        // 1) Gota viscosa que se estira colgando del matraz
        await done(drop.animate(
          [
            { opacity: 0, transform: "translateY(0) scale(0.6, 0.12)" },
            { opacity: 1, transform: "translateY(0) scale(0.95, 0.55)", offset: 0.55 },
            { opacity: 1, transform: "translateY(2px) scale(0.85, 1)" },
          ],
          { duration: 850, easing: "cubic-bezier(.45,0,.4,1)", fill: "forwards" },
        ));
        if (!alive) return;

        // 2) Se suelta (respingo del zorro) y cae hasta el borde de la sección
        kick.v = -9;
        const dist = g.edge - g.sy - dh;
        const dur = 260 + Math.sqrt(Math.max(0, dist)) * 20;
        await done(drop.animate(
          [
            { transform: "translateY(2px) scale(0.85, 1)" },
            { transform: `translateY(${dist * 0.3}px) scale(0.8, 1.12)`, offset: 0.4 },
            { transform: `translateY(${dist}px) scale(0.72, 1.28)` },
          ],
          { duration: dur, easing: "cubic-bezier(.55,0,1,.6)", fill: "forwards" },
        ));
        if (!alive) return;

        // 3) Se queda pegada en el borde: la división se enciende y ondula,
        //    y la gota se aplasta en una gotita que brilla
        edgeLine.animate(
          [
            { opacity: 0, transform: "scaleX(0.02)" },
            { opacity: 1, transform: "scaleX(0.35)", offset: 0.12 },
            { opacity: 0.85, transform: "scaleX(0.8)", offset: 0.45 },
            { opacity: 0, transform: "scaleX(1)" },
          ],
          { duration: 2600, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
        );
        drop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: "forwards" });
        blob.animate(
          [
            { opacity: 0, transform: "scale(0.4, 1.4)" },
            { opacity: 1, transform: "scale(1.25, 0.7)", offset: 0.12 },
            { opacity: 1, transform: "scale(0.95, 1.08)", offset: 0.24 },
            { opacity: 1, transform: "scale(1, 1)", offset: 0.34 },
            { opacity: 1, transform: "scale(1.6, 0.6)", offset: 0.5 },
            { opacity: 0, transform: "scale(2.6, 0.3)" },
          ],
          { duration: 1500, easing: "cubic-bezier(.3,.7,.3,1)", fill: "forwards" },
        );
        await wait(420);
        if (!alive) return;

        // 4) La gota se abre en un portal: anillo luminoso con remolino
        portal.animate(
          [
            { opacity: 0, transform: "scale(0.05, 0.2)" },
            { opacity: 1, transform: "scale(1.08, 1.05)", offset: 0.12 },
            { opacity: 1, transform: "scale(1, 1)", offset: 0.2 },
            { opacity: 1, transform: "scale(1, 1)", offset: 0.82 },
            { opacity: 0, transform: "scale(0.05, 0.2)" },
          ],
          { duration: 5600, easing: "cubic-bezier(.25,.8,.25,1)", fill: "forwards" },
        );
        await wait(450);
        if (!alive) return;

        // 5) Del portal cuelgan gotitas que se estiran, se sueltan, caen con un
        //    leve tambaleo hacia Portafolio y se deshacen en chispas
        drips.forEach((d, i) => {
          const fall = 58 + i * 6;
          d.animate(
            [
              { opacity: 0, transform: "translateY(-4px) scale(0.5, 0.15)" },
              { opacity: 1, transform: "translateY(-2px) scale(0.95, 0.45)", offset: 0.18 },
              { opacity: 1, transform: "translateY(0) scale(0.8, 0.95)", offset: 0.36 },
              { opacity: 1, transform: `translateY(${fall * 0.18}px) scale(0.92, 0.88)`, offset: 0.5 },
              { opacity: 1, transform: `translateY(${fall * 0.55}px) scale(0.78, 1.18)`, offset: 0.72 },
              { opacity: 0.9, transform: `translateY(${fall * 0.9}px) scale(0.86, 1.05)`, offset: 0.9 },
              { opacity: 0, transform: `translateY(${fall}px) scale(0.4, 0.5)` },
            ],
            { duration: 2100, delay: 150 + i * 650, easing: "cubic-bezier(.45,0,.7,.9)", fill: "forwards" },
          );
          sparks.slice(i * 3, i * 3 + 3).forEach((sp, j) => {
            const ang = (-120 + j * 60) * (Math.PI / 180);
            sp.animate(
              [
                { opacity: 0, transform: "translate(0,0) scale(0.4)" },
                { opacity: 1, transform: `translate(${Math.cos(ang) * 6}px, ${Math.sin(ang) * 6}px) scale(1)`, offset: 0.3 },
                { opacity: 0, transform: `translate(${Math.cos(ang) * 14}px, ${Math.sin(ang) * 14 + 4}px) scale(0.2)` },
              ],
              { duration: 700, delay: 150 + i * 650 + 1890, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" },
            );
          });
        });
        await wait(4400);
        if (!alive) return;
        await wait(500 + Math.random() * 700);
      }
    };
    const start = window.setTimeout(() => { void cycle(); }, 700);

    return () => {
      alive = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(start);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
      [drop, portal, blob, edgeLine, ...drips, ...sparks].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
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
      {/* Capa de la poción: gota → portal en el borde de la sección → gotitas en Portafolio */}
      <div ref={flowRef} className="potion-flow">
        <div className="pf-edge" />
        <div className="pf-portal"><span className="pf-portal-swirl" /></div>
        <div className="pf-blob" />
        {[0, 1, 2].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} className="pf-drip" src="/brand/potion-drop-80.webp" srcSet="/brand/potion-drop-80.webp 80w, /brand/potion-drop-160.webp 160w" sizes="16px" alt="" loading="lazy" />
        ))}
        {Array.from({ length: 9 }, (_, i) => <span key={`s${i}`} className="pf-spark" />)}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pf-drop" src="/brand/potion-drop-80.webp" srcSet="/brand/potion-drop-80.webp 80w, /brand/potion-drop-160.webp 160w" sizes="20px" alt="" loading="lazy" />
      </div>
    </div>
  );
}
