"use client";

import { useEffect, useRef, useState } from "react";

// Mascota de D&A Lab (zorro científico, render 3D con nano-banana Pro a partir
// del dibujo original en brand/mascota-original.jpg). Se asoma por el borde
// derecho de la tarjeta: entra deslizándose al aparecer, saluda inclinándose y
// del matraz caen gotas de poción. Con "reducir movimiento" queda quieta.
export function Mascot({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mascot ${inView ? "is-in" : ""}`} aria-hidden>
      <div className="mascot-body">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mascota-peek-300.webp"
          srcSet="/brand/mascota-peek-300.webp 300w, /brand/mascota-peek-600.webp 600w"
          sizes="(min-width:1024px) 170px, 112px"
          width={300}
          height={493}
          alt={label}
          loading="lazy"
          className="block h-auto w-full"
        />
        <span className="mascot-drop" style={{ ["--d" as string]: "0s", ["--x" as string]: "0px" }} />
        <span className="mascot-drop" style={{ ["--d" as string]: "1.1s", ["--x" as string]: "-5px" }} />
        <span className="mascot-drop" style={{ ["--d" as string]: "2.3s", ["--x" as string]: "4px" }} />
      </div>
    </div>
  );
}
