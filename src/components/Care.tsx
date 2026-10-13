import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { TiltCard } from "./TiltCard";

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

// Sección aparte de Paquetes: cotización a medida del Premium + mantenimiento.
// Compacta: cada plan de mantenimiento es una sola fila (nombre, precio, qué incluye, botón).
export function Care({ t }: { t: Dictionary }) {
  const pl = t.plans;
  return (
    <section id="mantenimiento" aria-labelledby="mantenimiento-titulo" className="pb-10 pt-2 sm:pb-12">
      <div className="wrap">
        {/* A tu medida */}
        <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-coral/60 bg-[linear-gradient(180deg,#fff7f1,#fbeee4)] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] text-green">{pl.extras.title}</h3>
            <p className="hero-lead mt-0.5 text-[15px] text-muted">{pl.extras.lead}</p>
          </div>
          <div className="w-full shrink-0 sm:w-[250px]">
            <a href={whatsappLink(pl.extras.message)} target="_blank" rel="noopener noreferrer" className="plan-cta plan-cta--coral care-cta" aria-label={`${pl.extras.cta} (se abre WhatsApp en una pestaña nueva)`}>
              <span className="plan-cta-fill" aria-hidden />
              <span className="plan-cta-label">{pl.extras.cta}</span>
              <span aria-hidden className="plan-cta-arrow"><Arrow /></span>
            </a>
          </div>
        </div>

        {/* Mantenimiento */}
        <div className="mt-6 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
          <h2 id="mantenimiento-titulo" className="font-display text-[22px] font-extrabold tracking-[-0.025em] text-green">
            <span className="mb-1 block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-coral-ink sm:mb-0 sm:mr-2 sm:inline">‹ {pl.care.eyebrow} ›</span>
            {pl.care.title}
          </h2>
          <p className="hero-lead text-[15px] text-muted">{pl.care.lead}</p>
        </div>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {pl.care.plans.map((c) => (
            <li key={c.id} className="flex">
              <TiltCard className={`relative flex w-full flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border px-5 py-4 ${c.badge ? "tilt-dark border-green bg-green text-bone" : "border-line bg-paper"}`}>
                <div className="min-w-0 flex-1 basis-full sm:basis-0">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className={`font-display text-[17px] font-bold tracking-[-0.02em] ${c.badge ? "" : "text-green"}`}>{c.name}</span>
                    {c.badge && <span className="rounded-full bg-coral px-2 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wider text-ink">{c.badge}</span>}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em]">{c.price}</span>
                    <span className={`text-[13px] ${c.badge ? "text-mist" : "text-muted"}`}>{c.period}</span>
                    {c.alt && <span className="text-[12px] font-semibold text-coral-soft">· {c.alt}</span>}
                  </p>
                  <p className={`mt-1.5 text-[13px] leading-snug ${c.badge ? "text-mist" : "text-muted"}`}>{c.includes.join(" · ")}</p>
                </div>
                <a
                  href={whatsappLink(pl.ctaMessage.replace("{plan}", c.name).replace("{price}", `${c.price} ${c.period}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.cta} (se abre WhatsApp en una pestaña nueva)`}
                  className={`care-mini ${c.badge ? "care-mini--coral" : ""}`}
                >
                  {c.cta} <Arrow />
                </a>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
