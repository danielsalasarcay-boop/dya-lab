"use client";

import { useEffect, useState } from "react";

// Hora local de Caracas, en vivo (se actualiza cada 30 s).
export function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-VE", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Caracas" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-mist/80">
      {label} · <span className="tabular-nums text-bone">{time ?? "--:--"}</span> GMT-4
    </span>
  );
}

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-bone/20 px-4 text-[14px] text-mist transition-colors hover:border-coral hover:text-bone"
    >
      {label}
      <span aria-hidden className="transition-transform group-hover:-translate-y-0.5">↑</span>
    </button>
  );
}
