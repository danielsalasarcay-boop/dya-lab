import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="py-16 sm:py-20">
      <div className="wrap">
        <Eyebrow n="02">{t.services.eyebrow}</Eyebrow>
        <h2 id="servicios-titulo" className="h2 mt-5 max-w-[18ch] text-green">{t.services.title}</h2>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-2">
          {t.services.items.map((s) => (
            <article key={s.n} className="card flex flex-col p-7 sm:p-10">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-coral-ink" aria-hidden>
                {s.n}
              </p>
              <h3 className="mt-4 font-display text-[24px] font-bold leading-tight tracking-[-0.025em] text-green sm:text-[28px]">
                {s.name}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">{s.promise}</p>

              <ul className="mt-8 divide-y divide-line border-t border-line">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3 py-3.5 text-[16px] leading-snug">
                    <span aria-hidden className="mt-[2px] font-mono text-coral-ink">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Los dos se suman: el único gesto gráfico de la sección */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-bone font-display text-[22px] font-extrabold leading-none text-coral-ink lg:grid"
          >
            +
          </span>
        </div>
      </div>
    </section>
  );
}
