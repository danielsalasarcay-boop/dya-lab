"use client";

import { useEffect, useRef } from "react";

// Reproduce los videos de la ficha (web + iPhone):
// - con cursor: al pasar por encima o al enfocarla con teclado;
// - en táctil: mientras la ficha está en pantalla (salvo "reducir movimiento").
export function CaseCard({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const videos = () => Array.from(el.querySelectorAll<HTMLVideoElement>("video"));
    const play = () => videos().forEach((v) => v.play().catch(() => {}));
    const pause = () => videos().forEach((v) => v.pause());

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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li ref={ref} id={id} className="case w-[86%] shrink-0 snap-start scroll-mt-24 md:w-auto">
      {children}
    </li>
  );
}
