"use client";

import { useRef } from "react";

// Tarjeta con inclinación 3D suave hacia el cursor, foco de luz interior y
// borde iluminado que siguen al puntero. Se anima con un solo rAF por evento y
// variables CSS; el contenedor de entrada por scroll (svc-reveal) queda aparte,
// así los dos transforms no chocan.
export function TiltCard({ className = "", children, as: Tag = "div", ...rest }: { className?: string; children: React.ReactNode; as?: "div" | "aside" } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--rx", `${((0.5 - y) * 9).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 12).toFixed(2)}deg`);
      el.dataset.hover = "";
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.hover;
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      <span aria-hidden className="tilt-spot" />
      {children}
    </Tag>
  );
}
