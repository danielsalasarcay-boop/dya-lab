import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Plans({ t }: { t: Dictionary }) {
  return (
    <section id="paquetes" aria-labelledby="paquetes-titulo" className="py-10 sm:py-12">
      <div className="wrap">
        <Eyebrow n="05">{t.plans.eyebrow}</Eyebrow>
        <h2 id="paquetes-titulo" className="h2 mt-5 text-green">{t.plans.title}</h2>
        <p className="mt-4 max-w-[34rem] text-lg text-muted">
          {t.plans.lead} <span className="lg:hidden">{t.plans.swipeHint}</span>
        </p>

        {/* Teléfono y tablet: carrusel deslizable; desktop: 3 columnas */}
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {t.plans.items.map((p) => (
            <li
              key={p.id}
              className={`relative flex w-[84%] shrink-0 snap-start flex-col rounded-3xl border p-7 sm:w-[46%] sm:p-8 lg:w-auto ${
                p.featured ? "border-green bg-green text-bone" : "border-line bg-paper"
              }`}
            >
              {p.featured && (
                <p className="absolute -top-3 left-7 rounded-full bg-coral px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-ink">
                  {t.plans.featuredLabel}
                </p>
              )}
              <h3 className={`font-display text-2xl font-bold tracking-[-0.02em] ${p.featured ? "" : "text-green"}`}>{p.name}</h3>
              <p className={`mt-2 ${p.featured ? "text-mist" : "text-muted"}`}>{p.for}</p>

              {/* PRECIO PENDIENTE */}
              <p className="mt-8 flex items-baseline gap-2">
                {p.from && <span className={`text-sm ${p.featured ? "text-mist" : "text-muted"}`}>{t.plans.fromLabel}</span>}
                <span className="display text-[56px]">{t.plans.pricePlaceholder}</span>
              </p>

              <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 ${p.featured ? "border-bone/20" : "border-line"}`}>
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug">
                    <span aria-hidden className={`font-mono ${p.featured ? "text-coral-soft" : "text-coral-ink"}`}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`/contacto?plan=${encodeURIComponent(p.name)}`}
                data-plan={p.name}
                className={`btn mt-8 w-full ${p.featured ? "btn-coral" : "btn-primary"}`}
                aria-label={`${t.plans.cta}: ${p.name}`}
              >
                {t.plans.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
