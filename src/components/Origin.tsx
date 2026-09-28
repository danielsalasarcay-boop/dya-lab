import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Origin({ t }: { t: Dictionary }) {
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="bg-sage py-16 sm:py-20">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Eyebrow n="01" tone="sage">{t.origin.eyebrow}</Eyebrow>
            <p className="mt-5 max-w-[20ch] font-display text-[20px] font-bold leading-snug tracking-[-0.01em] text-green sm:text-[22px]">
              {t.origin.aside}
            </p>
          </div>
          <div>
            <h2 id="origen-titulo" className="h2 text-green">{t.origin.title}</h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
              {t.origin.body.map((linea) => (
                <p key={linea}>{linea}</p>
              ))}
            </div>
          </div>
        </div>

        {/* El valor, dicho como contraste: a la izquierda lo de siempre, a la derecha lo que te queda */}
        <div className="mt-14 sm:mt-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-green">
            {t.origin.shiftLabel}
          </p>
          <ul className="mt-5 border-t border-green/15">
            {t.origin.shifts.map((s) => (
              <li
                key={s.to}
                className="grid gap-1.5 border-b border-green/15 py-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] sm:items-baseline sm:gap-6 sm:py-6"
              >
                <span className="text-[16px] leading-snug text-muted">{s.from}</span>
                <span aria-hidden className="font-mono text-[15px] text-coral-ink">→</span>
                <span className="font-display text-[17px] font-bold leading-snug tracking-[-0.015em] text-green sm:text-[19px]">
                  {s.to}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-muted">{t.origin.proof}</p>
        </div>
      </div>
    </section>
  );
}
