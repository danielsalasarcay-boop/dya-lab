import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Origin({ t }: { t: Dictionary }) {
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="bg-sage py-16 sm:py-20">
      {/* TEXTO PENDIENTE: origen — reemplazar title y body en src/content/es.ts (origin) */}
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Eyebrow n="01" tone="sage">{t.origin.eyebrow}</Eyebrow>
          <p className="mt-4 inline-block rounded-full border border-dashed border-green px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-green">
            {t.origin.pendingNote}
          </p>
        </div>
        <div>
          <h2 id="origen-titulo" className="h2 text-green">{t.origin.title}</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
            {t.origin.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
