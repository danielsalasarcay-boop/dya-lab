"use client";

import { useEffect, useRef, useState } from "react";

// Mascota de D&A Lab (zorro científico, render 3D con nano-banana Pro a partir
// del dibujo original en brand/mascota-original.jpg). Se asoma por el borde
// derecho de la tarjeta. Capas de movimiento, cada una en su elemento para que
// los transforms no choquen:
//   .mascot-enter  → entrada desde detrás del borde (una vez)
//   .mascot-tilt   → se inclina suave hacia el cursor (solo con mouse)
//   .mascot-idle   → respiración + se asoma más cada pocos segundos (spring)
// Del matraz cae poción que "se derrite": gota que se estira, se suelta, cae y
// forma un charco (filtro SVG gooey para que las formas se fundan).
export function Mascot({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);

    if (!matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return () => io.disconnect();
    const section = el.closest("section") ?? document.body;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 600));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 600));
        el.style.setProperty("--tx", dx.toFixed(3));
        el.style.setProperty("--ty", dy.toFixed(3));
      });
    };
    const reset = () => { el.style.setProperty("--tx", "0"); el.style.setProperty("--ty", "0"); };
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", reset);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className={`mascot ${inView ? "is-in" : ""}`} aria-hidden>
      <svg width="0" height="0" className="absolute">
        <filter id="mascot-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
        </filter>
      </svg>
      <div className="mascot-enter">
        <div className="mascot-tilt">
          <div className="mascot-idle">
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
            <div className="potion">
              <span className="potion-hang" />
              <span className="potion-fall" />
            </div>
          </div>
        </div>
      </div>
      <span className="potion-puddle" />
    </div>
  );
}
