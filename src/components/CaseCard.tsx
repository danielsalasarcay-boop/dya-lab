"use client";

import { useEffect, useRef, useState } from "react";

// En pantallas táctiles (sin cursor) la captura se recorre sola cuando la
// ficha entra en pantalla; con cursor, el recorrido lo dispara el hover (CSS).
export function CaseCard({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li ref={ref} id={id} className={`case w-[86%] shrink-0 snap-start scroll-mt-24 md:w-auto ${inView ? "is-inview" : ""}`}>
      {children}
    </li>
  );
}
