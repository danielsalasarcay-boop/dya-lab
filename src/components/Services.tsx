import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Glifos de cada servicio, en el mismo lenguaje que las fichas del portafolio:
// el 01 cita el navegador con el teléfono encima; el 02, la marca en sus versiones.
function ServiceGlyph({ n }: { n: string }) {
  const line = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 72 48" className="h-10 w-auto" role="img" aria-hidden focusable="false">
      {n === "01" ? (
        <>
          <rect x="1" y="3" width="52" height="38" rx="6" className="stroke-green" {...line} />
          <path d="M1 13h52" className="stroke-green" {...line} />
          <circle cx="8" cy="8" r="1.6" className="fill-green" />
          <circle cx="14" cy="8" r="1.6" className="fill-green" />
          <circle cx="20" cy="8" r="1.6" className="fill-green" />
          <rect x="49" y="17" width="22" height="30" rx="6" className="fill-coral" />
          <path d="M55 42h10" className="stroke-ink" {...line} />
        </>
      ) : (
        <>
          <rect x="1" y="12" width="24" height="24" rx="7" className="stroke-green" {...line} />
          <circle cx="42" cy="24" r="12" className="fill-coral" />
          <rect x="59" y="18" width="12" height="12" rx="4" className="stroke-green" {...line} />
        </>
      )}
    </svg>
  );
}

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="py-16 sm:py-20">
      <div className="wrap">
        <Eyebrow n="02">{t.services.eyebrow}</Eyebrow>
        <h2 id="servicios-titulo" className="h2 mt-5 max-w-[18ch] text-green">{t.services.title}</h2>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-2">
          {t.services.items.map((s) => (
            <article key={s.n} className="card flex flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-6 border-b border-line bg-sage/45 px-7 py-5 sm:px-10">
                <span className="display text-[44px] leading-none text-coral-ink sm:text-[52px]" aria-hidden>{s.n}</span>
                <ServiceGlyph n={s.n} />
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-10">
                <h3 className="font-display text-[24px] font-bold leading-tight tracking-[-0.02em] text-green sm:text-[28px]">{s.name}</h3>
                <p className="mt-3 text-lg text-muted">{s.promise}</p>

                <ul className="mt-7 flex-1 divide-y divide-line border-t border-line">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3 py-3.5 text-[16px] leading-snug">
                      <span aria-hidden className="mt-[2px] font-mono text-coral-ink">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(t.services.ctaMessage.replace("{service}", s.name.toLowerCase()))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-8 self-start"
                  aria-label={`${t.services.cta}: ${s.name}`}
                >
                  <WhatsAppIcon className="size-[18px]" />
                  {t.services.cta}
                </a>
              </div>
            </article>
          ))}

          {/* Los dos servicios se suman: el signo vive en el aire entre las tarjetas */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-bone font-display text-[26px] font-extrabold leading-none text-coral-ink lg:grid"
          >
            +
          </span>
        </div>

        <p className="mt-7 flex max-w-[46rem] items-start gap-3 text-[15px] leading-relaxed text-muted">
          <span aria-hidden className="font-mono text-coral-ink">+</span>
          <span>{t.services.together}</span>
        </p>
      </div>
    </section>
  );
}
