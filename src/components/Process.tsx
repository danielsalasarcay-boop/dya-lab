import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Process({ t }: { t: Dictionary }) {
  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="bracket-pattern bg-green py-20 text-bone sm:py-28">
      {/* CONFIRMAR: plazos de cada paso en src/content/es.ts (process) */}
      <div className="wrap">
        <Eyebrow n="04" tone="dark">{t.process.eyebrow}</Eyebrow>
        <h2 id="proceso-titulo" className="h2 mt-5 max-w-[20ch]">{t.process.title}</h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <li key={s.name} className="flex flex-col bg-green p-7 sm:p-8">
              <span aria-hidden className="display text-[56px] text-coral-soft">{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-coral-soft">{s.time}</p>
              <p className="mt-4 leading-relaxed text-mist">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
