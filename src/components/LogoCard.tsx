"use client";

import { useRef } from "react";
import { Logo } from "./Logo";

// Tarjeta con el isotipo en lugar de una foto: borde de luz que gira, auroras
// verde y coral de fondo, los corchetes que respiran y un reflejo que sigue al
// cursor mientras la tarjeta se inclina. Todo en CSS; aquí solo se pasan las
// coordenadas del puntero como variables.
export function LogoCard({ label, size = "lg" }: { label: string; size?: "lg" | "sm" }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };

  return (
    <div ref={ref} role="img" aria-label={label} onPointerMove={onMove} onPointerLeave={onLeave} className={`lc lc--${size}`}>
      <span aria-hidden className="lc-aurora lc-aurora--a" />
      <span aria-hidden className="lc-aurora lc-aurora--b" />
      <span aria-hidden className="lc-dots" />
      <span aria-hidden className="lc-mark">
        <Logo variant="mark" className="w-full text-bone" title="" />
      </span>
      <span aria-hidden className="lc-word">
        <Logo variant="word" className="h-auto w-full text-bone" title="" />
      </span>
      <span aria-hidden className="lc-glare" />
    </div>
  );
}
