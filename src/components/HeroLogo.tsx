"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./Logo";

// Logo D&A de partículas sobre el titular. Pariente del hero de la sección 04,
// pero distinto: las partículas llegan en una corriente horizontal (como datos),
// arman el monograma, luego una onda de luz lo recorre y los corchetes coral
// "respiran" hacia afuera. El cursor o el dedo las dispersan y vuelven.
// Se pausa fuera de pantalla; con "reducir movimiento" se dibuja quieto.

type P = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; c: string; coral: boolean; side: number; d: number };

const GREEN = "#1F4D38";
const CORAL = "#F07A5A";
const START_MS = 900; // espera a que se retire la pantalla de carga

export function HeroLogo({ label, size = "md" }: { label: string; size?: "md" | "lg" }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, MW = 1, P: P[] = [], raf = 0, t0 = 0, visible = true, destroyed = false;
    let mx = -9999, my = -9999;
    const img = new Image();

    function build() {
      const r = canvas!.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Monograma dibujado a la altura del canvas y muestreado en una rejilla.
      const mh = H * 0.9;
      const mw = (mh * 3080) / 1936;
      MW = mw;
      const off = document.createElement("canvas");
      off.width = Math.ceil(mw);
      off.height = Math.ceil(mh);
      const o = off.getContext("2d")!;
      o.drawImage(img, 0, 0, mw, mh);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const step = W < 500 ? 3 : 3.4;
      const ox = 0;
      const oy = (H - mh) / 2;
      const pts: P[] = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const i = (Math.floor(y) * off.width + Math.floor(x)) * 4;
          if (data[i + 3] < 140) continue;
          const coral = data[i] > 180;
          const tx = ox + x;
          const ty = oy + y;
          pts.push({
            // Corriente horizontal: todos entran desde la izquierda en una franja fina.
            x: -40 - Math.random() * W * 0.6,
            y: H / 2 + (Math.random() - 0.5) * 6,
            vx: 0, vy: 0, tx, ty,
            c: coral ? CORAL : GREEN, coral,
            side: tx < mw * 0.36 ? -1 : 1,
            d: (tx / mw) * 700 + Math.random() * 180,
          });
        }
      }
      P = pts;
      if (reduce) P.forEach((p) => { p.x = p.tx; p.y = p.ty; });
    }

    function frame(now: number) {
      raf = 0;
      if (destroyed) return;
      const t = now - t0;
      ctx!.clearRect(0, 0, W, H);
      const wave = ((t - 2200) % 3600) / 3600; // onda de luz que recorre el logo
      const breath = t > 2000 ? (Math.sin((t - 2000) / 520) + 1) / 2 : 0;
      for (const p of P) {
        let tx = p.tx, ty = p.ty;
        if (t < p.d) { tx = p.x + 6; ty = H / 2 + Math.sin(p.x / 18 + t / 90) * 3; } // viajando
        if (p.coral && t > 2000) tx += p.side * breath * 3; // corchetes respiran
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 2600) {
          const dist = Math.sqrt(d2) || 1;
          const f = ((2600 - d2) / 2600) * 4;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx = (p.vx + (tx - p.x) * 0.075) * 0.78;
        p.vy = (p.vy + (ty - p.y) * 0.075) * 0.78;
        p.x += p.vx;
        p.y += p.vy;
        const glow = t > 2200 && Math.abs(p.tx / MW - wave) < 0.06;
        ctx!.fillStyle = glow ? "#F9A68F" : p.c;
        ctx!.fillRect(p.x - 0.95, p.y - 0.95, glow ? 2.4 : 1.9, glow ? 2.4 : 1.9);
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of P) { ctx!.fillStyle = p.c; ctx!.fillRect(p.tx - 0.95, p.ty - 0.95, 1.9, 1.9); }
    }

    const run = () => { if (!raf && !destroyed && visible && !document.hidden) raf = requestAnimationFrame(frame); };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); });
    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      if (Math.round(r.width) === W && Math.round(r.height) === H) return;
      build();
      if (reduce) drawStatic();
    });
    const onVis = () => run();

    let timer = 0;
    img.onload = () => {
      if (destroyed) return;
      build();
      if (reduce) { drawStatic(); ro.observe(canvas); return; }
      timer = window.setTimeout(() => {
        t0 = performance.now();
        wrap.addEventListener("pointermove", onMove, { passive: true });
        wrap.addEventListener("pointerdown", onMove, { passive: true });
        wrap.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVis);
        io.observe(canvas);
        ro.observe(canvas);
        run();
      }, START_MS);
    };
    img.src = "/brand-mark.svg";

    return () => {
      destroyed = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={size === "lg" ? "hero-logo flex flex-col items-center gap-5" : "hero-logo flex items-center gap-4 sm:gap-5"}
      role="img"
      aria-label={label}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`shrink-0 touch-pan-y ${size === "lg" ? "h-[130px] w-[208px] sm:h-[190px] sm:w-[302px]" : "h-[74px] w-[118px] sm:h-[96px] sm:w-[153px]"}`}
      />
      <div aria-hidden className="hero-logo-word">
        <Logo variant="word" className={`h-auto text-green ${size === "lg" ? "w-[150px] sm:w-[200px]" : "w-[118px] sm:w-[150px]"}`} title="" />
        <span className="mt-2 block h-[2px] w-full origin-left bg-coral hero-logo-line" />
      </div>
    </div>
  );
}
