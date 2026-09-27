import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="border-t border-line bg-paper py-20 sm:py-28">
      {/* CONFIRMAR: cada respuesta en src/content/es.ts (faq) */}
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow n="06">{t.faq.eyebrow}</Eyebrow>
          <h2 id="preguntas-titulo" className="h2 mt-5 text-green">{t.faq.title}</h2>
        </div>
        <div className="border-t border-line">
          {t.faq.items.map((f) => (
            <details key={f.q} className="faq group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-semibold tracking-[-0.01em] text-ink sm:text-[22px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono text-2xl text-coral-ink transition-transform duration-200 group-open:rotate-90">›</span>
              </summary>
              <p className="max-w-[46rem] pb-6 text-[17px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
