"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import "../app/dya-hero.css";

type InitFn = (root: HTMLElement, opts?: { story?: string }) => () => void;
declare global {
  interface Window { initDyaHero?: InitFn }
}

// Sección "Webs con movimiento": el hero de partículas de D&A Lab (motor en
// public/dya-hero/dya-hero.js, copiado literal). Arranca cuando la sección
// entra en pantalla; los botones reinician la animación con otra historia.
export function Motion({ t }: { t: Dictionary }) {
  const m = t.motion;
  const rootRef = useRef<HTMLElement>(null);
  const destroyRef = useRef<(() => void) | null>(null);
  const [story, setStory] = useState(m.stories[0].id);
  const [engine, setEngine] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!engine || !seen || !root || !window.initDyaHero) return;
    // Igual que la barra de historias del prompt: reinicio limpio en cada historia.
    try { sessionStorage.removeItem("dya-hero-played"); } catch {}
    destroyRef.current?.();
    root.classList.remove("dya-hero--js");
    root.querySelectorAll(".is-on").forEach((e) => e.classList.remove("is-on"));
    destroyRef.current = window.initDyaHero(root, { story });
    return () => { destroyRef.current?.(); destroyRef.current = null; };
  }, [engine, seen, story]);

  return (
    <section id="movimiento" aria-labelledby="movimiento-titulo" className="py-16 sm:py-20">
      <Script src="/dya-hero/dya-hero.js" strategy="lazyOnload" onReady={() => setEngine(true)} />
      <div className="wrap">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow n="05">{m.eyebrow}</Eyebrow>
            <h2 id="movimiento-titulo" className="h2 mt-5 max-w-[16ch] text-green">{m.title}</h2>
          </div>
          <p className="max-w-[26rem] text-muted">{m.lead}</p>
        </div>

        <div className="-mx-4 mt-8 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label={m.storiesLabel}>
          {m.stories.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={story === s.id}
              onClick={() => setStory(s.id)}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-[14px] font-semibold transition-colors ${
                story === s.id ? "border-green bg-green text-bone" : "border-line bg-paper text-green hover:border-green"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-line">
          {/* Markup del prompt (data-dya-*). El h1 original pasa a ser el h2 de la sección.
              Sin botón, notificaciones ni contador (el motor los omite si no existen). */}
          <section ref={rootRef} className="dya-hero" data-dya-hero data-dya-manual data-story={story} aria-label={m.title}>
            <div className="dya-hero__stage">
              <canvas className="dya-hero__canvas" data-dya-canvas aria-hidden="true" />
              <p className="dya-hero__fallback" data-dya-fallback aria-hidden="true">{"la web que\nsoñaste."}</p>
              <p className="dya-hero__line dya-reveal" data-dya-line>Instagram te da seguidores. Una web te da clientes.</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
