"use client";

import { useEffect, useRef } from "react";

// Reproduce los videos de la ficha (web + iPhone):
// - con cursor: al pasar por encima o al enfocarla con teclado; al salir, vuelve a su portada;
// - en táctil: la ficha al frente del carrusel; al deslizar a otra, vuelve a su portada.
export function CaseCard({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const videos = () => Array.from(el.querySelectorAll<HTMLVideoElement>("video"));
    let rewind = 0;
    const play = () => {
      window.clearTimeout(rewind);
      el.classList.add("is-playing");
      videos().forEach((v) => v.play().catch(() => {}));
    };
    // Al soltar: la portada vuelve con un fundido y, ya tapado, el video se
    // rebobina al inicio. La próxima vez empieza de nuevo desde arriba.
    const pause = () => {
      el.classList.remove("is-playing");
      window.clearTimeout(rewind);
      rewind = window.setTimeout(() => videos().forEach((v) => { v.pause(); v.currentTime = 0; }), 450);
    };

    if (window.matchMedia("(hover: hover)").matches) {
      const stop = (e: FocusEvent) => { if (!el.contains(e.relatedTarget as Node)) pause(); };
      el.addEventListener("mouseenter", play);
      el.addEventListener("mouseleave", pause);
      el.addEventListener("focusin", play);
      el.addEventListener("focusout", stop);
      return () => {
        el.removeEventListener("mouseenter", play);
        el.removeEventListener("mouseleave", pause);
        el.removeEventListener("focusin", play);
        el.removeEventListener("focusout", stop);
      };
    }

    // Táctil: se reproduce la ficha que está al frente del carrusel (≥75 % visible)
    // y vuelve a su portada al deslizar a otra. Tocar la ficha también la reproduce.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => (entry.intersectionRatio >= 0.75 ? play() : pause()), { threshold: [0, 0.75] });
    io.observe(el);
    const onTouch = () => play();
    el.addEventListener("touchstart", onTouch, { passive: true });
    return () => { io.disconnect(); el.removeEventListener("touchstart", onTouch); window.clearTimeout(rewind); };
  }, []);

  return (
    <li ref={ref} id={id} className="case w-[86%] shrink-0 snap-start scroll-mt-24 md:w-auto">
      {children}
    </li>
  );
}
