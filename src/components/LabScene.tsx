"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Laboratorio de la mascota (página Nosotros). Tres poses renderizadas con
// nano-banana Pro sobre el mismo encuadre (bata con logo D&A Lab y gafas):
//   mix  → sostiene los dos tubos
//   pour → vierte el coral dentro del verde (chorro y mezcla)
//   wow  → el resultado brilla y él sonríe
// Secuencia sin explosión: los tubos respiran luz → vierte (fundido suave entre
// poses) → el tubo se ilumina y burbujea → un vapor de partículas sube y se
// condensa en el botón "Ver portafolio". El botón queda; la secuencia se repite
// cada cierto tiempo mientras la escena está en pantalla.

// Puntos de la imagen (en % del ancho/alto del render recortado).
const TUBE = { x: 75, y: 70 }; // tubo receptor (derecha)
const STREAM = { x: 64, y: 60 }; // donde cae el chorro

type Pose = "mix" | "pour" | "wow";

export function LabScene({ cta, href }: { cta: string; href: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const q = <T extends Element>(s: string) => scene.querySelector<T>(s)!;
    const qa = <T extends Element>(s: string) => Array.from(scene.querySelectorAll<T>(s));
    const fox = q<HTMLDivElement>(".lab-fox");
    const poses: Record<Pose, HTMLImageElement> = { mix: q(".lab-mix"), pour: q(".lab-pour"), wow: q(".lab-wow") };
    const glow = q<HTMLDivElement>(".lab-glow");
    const bloom = q<HTMLDivElement>(".lab-bloom");
    const bubbles = qa<HTMLSpanElement>(".lab-bubble");
    const motes = qa<HTMLSpanElement>(".lab-mote");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      poses.mix.style.opacity = "0";
      poses.wow.style.opacity = "1";
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    let alive = true;
    let visible = false;
    let shown = false;
    let timer = 0;
    let current: Pose = "mix";
    const wait = (ms: number) => new Promise<void>((r) => { timer = window.setTimeout(r, ms); });
    const ease = "cubic-bezier(.45,0,.25,1)";

    // Cambio de pose: fundido cruzado con un leve "respiro" de escala
    const toPose = (next: Pose, ms = 520) => {
      if (next === current) return wait(0);
      poses[current].animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: ease, fill: "forwards" });
      poses[next].animate([{ opacity: 0, transform: "scale(0.992)" }, { opacity: 1, transform: "scale(1)" }], { duration: ms, easing: ease, fill: "forwards" });
      current = next;
      return wait(ms);
    };

    const breathe = fox.animate(
      [{ transform: "translateY(0) rotate(0)" }, { transform: "translateY(-2px) rotate(-0.5deg)" }, { transform: "translateY(0) rotate(0)" }],
      { duration: 4200, iterations: Infinity, easing: "ease-in-out" },
    );

    const bubbleRun = (n: number) =>
      bubbles.slice(0, n).map((b, i) => {
        b.style.left = `${TUBE.x + (Math.random() - 0.5) * 3}%`;
        b.style.top = `${TUBE.y}%`;
        return b.animate(
          [
            { opacity: 0, transform: "translate(0,0) scale(0.5)" },
            { opacity: 0.95, transform: `translate(${(Math.random() - 0.5) * 4}px,-10px) scale(1)`, offset: 0.35 },
            { opacity: 0, transform: `translate(${(Math.random() - 0.5) * 8}px,-${26 + Math.random() * 14}px) scale(0.7)` },
          ],
          { duration: 1300, delay: i * 180, iterations: Infinity, easing: "cubic-bezier(.3,.6,.4,1)" },
        );
      });

    const story = async () => {
      while (alive) {
        if (!visible || document.hidden) { await wait(500); continue; }

        // 1) calma: el tubo verde respira luz
        await toPose("mix", 600);
        glow.style.left = `${TUBE.x}%`;
        glow.style.top = `${TUBE.y}%`;
        const idle = glow.animate(
          [{ opacity: 0.2, transform: "translate(-50%,-50%) scale(0.9)" }, { opacity: 0.5, transform: "translate(-50%,-50%) scale(1)" }],
          { duration: 1200, direction: "alternate", iterations: 2, easing: "ease-in-out" },
        );
        await wait(2400);
        idle.cancel();
        if (!alive) return;

        // 2) vierte: el chorro cae, la luz crece y empiezan las burbujas
        await toPose("pour", 560);
        bloom.style.left = `${STREAM.x}%`;
        bloom.style.top = `${STREAM.y}%`;
        bloom.animate(
          [{ opacity: 0, transform: "translate(-50%,-50%) scale(0.6)" }, { opacity: 0.7, transform: "translate(-50%,-50%) scale(1)" }, { opacity: 0, transform: "translate(-50%,-50%) scale(1.1)" }],
          { duration: 2200, easing: ease },
        );
        glow.animate(
          [{ opacity: 0.3, transform: "translate(-50%,-50%) scale(0.9)" }, { opacity: 0.9, transform: "translate(-50%,-50%) scale(1.15)" }],
          { duration: 2200, easing: ease, fill: "forwards" },
        );
        let bub = bubbleRun(4);
        await wait(2300);
        if (!alive) return;

        // 3) resultado: la mezcla brilla, él sonríe
        await toPose("wow", 620);
        bub.forEach((a) => a.cancel());
        bub = bubbleRun(8);

        // 4) vapor de luz que sube y se condensa en el botón (la primera vez)
        if (!shown) {
          const sr = scene.getBoundingClientRect();
          const fr = fox.getBoundingClientRect();
          const sx = fr.left - sr.left + (fr.width * TUBE.x) / 100;
          const sy = fr.top - sr.top + (fr.height * (TUBE.y - 8)) / 100;
          const tx = sr.width / 2;
          const ty = 22;
          await Promise.all(
            motes.map((m, i) => {
              const spread = (Math.random() - 0.5) * 40;
              return m
                .animate(
                  [
                    { opacity: 0, transform: `translate(${sx}px, ${sy}px) scale(0.6)` },
                    { opacity: 1, transform: `translate(${sx + spread * 0.5}px, ${sy - 30}px) scale(1)`, offset: 0.25 },
                    { opacity: 0.9, transform: `translate(${(sx + tx) / 2 + spread}px, ${(sy + ty) / 2}px) scale(0.9)`, offset: 0.65 },
                    { opacity: 0, transform: `translate(${tx + (Math.random() - 0.5) * 70}px, ${ty}px) scale(0.4)` },
                  ],
                  { duration: 1500, delay: i * 45, easing: "cubic-bezier(.35,.1,.25,1)", fill: "forwards" },
                )
                .finished.then(() => {}, () => {});
            }),
          );
          shown = true;
          setRevealed(true);
        }
        await wait(3200);
        bub.forEach((a) => a.cancel());
        glow.animate([{ opacity: 0.9 }, { opacity: 0 }], { duration: 900, fill: "forwards", easing: ease });
        if (!alive) return;
        await wait(3000 + Math.random() * 2000);
      }
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(scene);
    const start = window.setTimeout(() => { void story(); }, 300);

    return () => {
      alive = false;
      io.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(start);
      breathe.cancel();
      scene.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };
  }, []);

  const img = (name: Pose, extra: string) => ({
    src: `/brand/lab-${name}-360.webp`,
    srcSet: `/brand/lab-${name}-360.webp 360w, /brand/lab-${name}-720.webp 720w`,
    sizes: "(min-width:1024px) 240px, 60vw",
    width: 360,
    height: 426,
    className: `lab-${name} ${extra}`,
  });

  return (
    <div ref={sceneRef} className="lab-scene relative mx-auto w-full max-w-[250px] pt-12">
      <div aria-hidden className="lab-backdrop" />
      <div className="lab-fox relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...img("mix", "block h-auto w-full")} alt="Mascota de D&A Lab mezclando dos sustancias" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...img("pour", "absolute inset-0 h-auto w-full opacity-0")} alt="" aria-hidden loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...img("wow", "absolute inset-0 h-auto w-full opacity-0")} alt="" aria-hidden loading="lazy" />
        <div aria-hidden className="lab-glow" />
        <div aria-hidden className="lab-bloom" />
        {Array.from({ length: 8 }, (_, i) => <span key={`b${i}`} aria-hidden className="lab-bubble" />)}
      </div>
      {Array.from({ length: 14 }, (_, i) => <span key={`m${i}`} aria-hidden className={`lab-mote ${i % 3 === 0 ? "is-coral" : ""}`} />)}
      {/* Botón que se condensa del vapor */}
      <div className="lab-cta-wrap" data-on={revealed || undefined}>
        <Link href={href} className="lab-cta" tabIndex={revealed ? 0 : -1} aria-hidden={!revealed}>
          {cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
