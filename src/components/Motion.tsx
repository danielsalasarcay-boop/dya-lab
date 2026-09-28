"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import "../app/dya-hero.css";

type InitFn = (root: HTMLElement, opts?: { story?: string }) => () => void;
declare global {
  interface Window {
    initDyaHero?: InitFn;
    DYA_HERO_STORIES?: Record<string, { words: unknown[] }>;
  }
}

// Tiempos del motor (public/dya-hero/dya-hero.js): dispersión inicial y salto
// entre palabras. Con eso se calcula cuándo aterriza la última y toca cambiar.
const T_SCATTER = 900;
const T_WORD = 1900;
const REPOSO = 2800;

// Sección "Webs con movimiento": solo el lienzo de partículas, a todo el ancho.
// Sin botones: las historias se encadenan solas mientras la sección se ve, y se
// detienen cuando sale de pantalla para no gastar batería de balde.
export function Motion({ t }: { t: Dictionary }) {
  const m = t.motion;
  const rootRef = useRef<HTMLElement>(null);
  const destroyRef = useRef<(() => void) | null>(null);
  const [indice, setIndice] = useState(0);
  const [motor, setMotor] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let respondio = false;
    const io = new IntersectionObserver(
      ([e]) => {
        respondio = true;
        setVisible(e.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    // Seguro: si el observador no contesta (pestaña de fondo, navegador raro),
    // arrancamos igual en vez de dejar el lienzo congelado para siempre.
    const red = window.setTimeout(() => { if (!respondio) setVisible(true); }, 2500);
    return () => { window.clearTimeout(red); io.disconnect(); };
  }, []);

  // onReady de <Script> no dispara si el archivo ya estaba en caché, así que
  // el arranque no puede colgar de él: se comprueba y, si no, se sondea.
  useEffect(() => {
    const reloj = window.setInterval(() => {
      if (typeof window.initDyaHero === "function") {
        setMotor(true);
        window.clearInterval(reloj);
      }
    }, 120);
    return () => window.clearInterval(reloj);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!motor || !visible || !root || !window.initDyaHero) return;

    const id = m.stories[indice % m.stories.length];

    // Reinicio limpio: el motor recuerda en sessionStorage que ya se reprodujo
    // y se saltaría la entrada, que es justo lo que queremos ver cada vez.
    try { sessionStorage.removeItem("dya-hero-played"); } catch {}
    destroyRef.current?.();
    root.classList.remove("dya-hero--js");
    root.querySelectorAll(".is-on").forEach((e) => e.classList.remove("is-on"));
    destroyRef.current = window.initDyaHero(root, { story: id });

    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let reloj = 0;
    if (!quieto) {
      const palabras = window.DYA_HERO_STORIES?.[id]?.words.length ?? 2;
      reloj = window.setTimeout(() => setIndice((v) => v + 1), T_SCATTER + (palabras - 1) * T_WORD + REPOSO);
    }

    return () => {
      window.clearTimeout(reloj);
      destroyRef.current?.();
      destroyRef.current = null;
    };
  }, [motor, visible, indice, m.stories]);

  return (
    <section id="movimiento" aria-labelledby="movimiento-titulo" className="py-16 sm:py-20">
      <Script src="/dya-hero/dya-hero.js" strategy="lazyOnload" onReady={() => setMotor(true)} />

      <div className="wrap">
        <Eyebrow n="05">{m.eyebrow}</Eyebrow>
        <h2 id="movimiento-titulo" className="h2 mt-5 max-w-[16ch] text-green">{m.title}</h2>
        <p className="mt-4 max-w-[34rem] text-muted">{m.lead}</p>
      </div>

      {/* A todo el ancho y sin marco: el fondo del lienzo es el mismo crema de la
          página, así que las letras parecen flotar sobre el sitio. */}
      <section
        ref={rootRef}
        className="dya-hero dya-hero--full mt-8 sm:mt-10"
        data-dya-hero
        data-dya-manual
        aria-label={m.title}
      >
        <div className="dya-hero__stage">
          <canvas className="dya-hero__canvas" data-dya-canvas aria-hidden="true" />
          <p className="dya-hero__fallback" data-dya-fallback aria-hidden="true">{"la web que\nsoñaste."}</p>
          <p className="dya-hero__line dya-reveal" data-dya-line />
        </div>
      </section>
    </section>
  );
}
