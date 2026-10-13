import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { TiltCard } from "./TiltCard";

export function Plans({ t }: { t: Dictionary }) {
  const pl = t.plans;
  return (
    <section id="paquetes" aria-labelledby="paquetes-titulo" className="py-10 sm:py-12">
      <div className="wrap">
        <Eyebrow n="05">{pl.eyebrow}</Eyebrow>
        <h2 id="paquetes-titulo" className="h2 mt-5 text-green">{pl.title}</h2>
        <p className="hero-lead mt-4 max-w-[34rem] text-[17px] leading-[1.5] text-muted">
          {pl.lead} <span className="lg:hidden">{pl.swipeHint}</span>
        </p>

        {/* Teléfono y tablet: carrusel deslizable; desktop: 3 columnas */}
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {pl.items.map((p) => {
            const numeric = p.price.startsWith("$");
            return (
              <li key={p.id} className="flex w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
                <TiltCard
                  className={`relative flex w-full flex-col rounded-3xl border p-7 sm:p-8 ${
                    p.featured ? "tilt-dark border-green bg-green text-bone" : "border-line bg-paper"
                  }`}
                >
                {p.featured && (
                  <p className="absolute -top-3 left-7 rounded-full bg-coral px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-ink">
                    {pl.featuredLabel}
                  </p>
                )}
                <h3 className={`font-display text-2xl font-bold tracking-[-0.02em] ${p.featured ? "" : "text-green"}`}>{p.name}</h3>
                <p className={`mt-2 ${p.featured ? "text-mist" : "text-muted"}`}>{p.for}</p>

                <p className="mt-7 flex items-baseline gap-2">
                  {p.from && <span className="rounded-full bg-coral px-2.5 py-0.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-ink">{pl.fromLabel}</span>}
                  <span className={`display ${numeric ? "text-[56px]" : "text-[34px]"}`}>{p.price}</span>
                  {numeric && <span className={`font-mono text-[12px] tracking-[0.1em] ${p.featured ? "text-mist" : "text-muted"}`}>{pl.currency}</span>}
                </p>
                {p.note && <p className={`mt-1 text-[13px] ${p.featured ? "text-mist" : "text-muted"}`}>{p.note}</p>}

                <ul className={`mt-7 flex-1 space-y-2.5 border-t pt-6 ${p.featured ? "border-bone/20" : "border-line"}`}>
                  {p.includes.map((item) =>
                    item.endsWith(":") ? (
                      // Línea de encabezado ("Todo lo del plan Esencial, y además:")
                      <li key={item} className={`rounded-xl px-3 py-2 text-[14px] font-semibold ${p.featured ? "bg-bone/10 text-bone" : "bg-sage text-green"}`}>
                        {item}
                      </li>
                    ) : (
                      <li key={item} className="flex gap-3 leading-snug">
                        <span aria-hidden className={`font-mono ${p.featured ? "text-coral-soft" : "text-coral-ink"}`}>›</span>
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>

                <a
                  href={whatsappLink(pl.ctaMessage.replace("{plan}", p.name).replace("{price}", `${p.from ? `${pl.fromLabel.toLowerCase()} ` : ""}${p.price} ${pl.currency}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-plan={p.name}
                  className={`plan-cta mt-8 ${p.featured ? "plan-cta--coral" : ""}`}
                  aria-label={`${pl.cta}: ${p.name} (se abre WhatsApp en una pestaña nueva)`}
                >
                  <span className="plan-cta-fill" aria-hidden />
                  <span className="plan-cta-label">{pl.cta}</span>
                  <span aria-hidden className="plan-cta-arrow">
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
                </TiltCard>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
