"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";

type Step = Dictionary["process"]["steps"][number];
const AUTO_MS = 4200;

// Pasos como pestañas: píldora coral que se desliza al paso activo y detalle
// con fundido. Avanza sola (con barra de progreso) hasta que el usuario toca,
// pasa el cursor o usa el teclado; no avanza con "reducir movimiento".
export function ProcessSteps({ steps, label }: { steps: Step[]; label: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, visible, active, steps.length]);

  const select = (i: number, focus = false) => {
    setAuto(false);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = steps.length;
    const map: Record<string, number> = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  const step = steps[active];
  const running = auto && visible;

  return (
    <div ref={rootRef} onMouseEnter={() => setAuto(false)}>
      <div role="tablist" aria-label={label} className="steps relative grid grid-cols-4 gap-1.5 rounded-full border border-bone/15 bg-green-deep/60 p-1.5" style={{ ["--i" as string]: active }}>
        {/* Píldora que se desliza al paso activo */}
        <span aria-hidden className="steps-pill absolute inset-y-1.5 left-1.5 rounded-full bg-coral shadow-[0_8px_24px_-8px_rgb(240_122_90/0.7)]">
          {running && <span key={active} className="steps-progress absolute inset-x-5 bottom-1.5 h-[2px] origin-left rounded-full bg-ink/35" style={{ animationDuration: `${AUTO_MS}ms` }} />}
        </span>
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.name}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`paso-tab-${i}`}
              aria-selected={on}
              aria-controls="paso-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative z-10 flex min-h-12 items-center justify-center gap-2 rounded-full px-2 text-[13px] font-semibold transition-colors duration-300 sm:text-[15px] ${
                on ? "text-ink" : "text-sage hover:text-bone"
              }`}
            >
              <span className={`font-mono text-[14px] transition-colors duration-300 sm:text-[11px] ${on ? "text-ink/70" : "text-coral-soft"}`}>0{i + 1}</span>
              <span className="sr-only sm:not-sr-only">{s.name}</span>
            </button>
          );
        })}
      </div>

      <div id="paso-panel" role="tabpanel" aria-labelledby={`paso-tab-${active}`} aria-live="polite" className="mt-4 min-h-[3.25rem] px-2 sm:min-h-0">
        <p key={active} className="steps-detail flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.12em] text-coral-soft">
            <span className="sm:hidden">{step.name} · </span>{step.time}
          </span>
          <span className="text-[15px] leading-snug text-mist sm:text-base">{step.line}</span>
        </p>
      </div>
    </div>
  );
}
