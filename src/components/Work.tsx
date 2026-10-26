import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { BrowserFrame, PhoneFrame, SiteVideo } from "./Frames";
import { CaseCard } from "./CaseCard";
import { NextProjectCard } from "./NextProjectCard";

// Videos grabados con scripts/record.mjs (recorrido con scroll de cada sitio).
const media = (slug: string, fmt: "desktop" | "mobile") => ({
  src: `/work/${slug}/${slug}-${fmt}.mp4`,
  poster: `/work/${slug}/${slug}-${fmt}-poster.webp`,
});

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="trabajo" aria-labelledby="trabajo-titulo" className="py-10 sm:py-12">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow n="02">{t.work.eyebrow}</Eyebrow>
            <h2 id="trabajo-titulo" className="h2 mt-5 max-w-[16ch] text-green">{t.work.title}</h2>
          </div>
          <p className="hero-lead max-w-[26rem] text-[17px] leading-[1.5] text-muted">
            <span className="md:hidden">{t.work.swipeHint}</span> <span className="hidden [@media(hover:hover)]:inline">{t.work.hoverHint}.</span>
          </p>
        </div>

        {/* Móvil: carrusel deslizable; tablet/desktop: cuadrícula */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {t.work.cases.map((c) => {
            const desktop = media(c.slug, "desktop");
            return (
              <CaseCard key={c.slug} id={`caso-${c.slug}`}>
                <article className="card flex h-full flex-col overflow-hidden bg-paper">
                  {/* Captura web con recorrido + iPhone: clic lleva al sitio. Fuera del orden de
                      tabulación porque "Ver sitio" ya es el enlace accesible de la ficha. */}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden
                    className="case-media relative block cursor-pointer bg-sage/60 px-4 pb-6 pt-4"
                  >
                    <BrowserFrame domain={c.domain}>
                      <SiteVideo src={desktop.src} poster={desktop.poster} label={t.work.desktopAlt.replace("{name}", c.name)} className="aspect-[16/10]" cover />
                    </BrowserFrame>
                    <PhoneFrame
                      video={media(c.slug, "mobile")}
                      alt={t.work.mobileAlt.replace("{name}", c.name)}
                      className="absolute -bottom-1 right-3 w-[22%] max-w-[130px]"
                      statusBg={c.statusBg}
                      statusFg={c.statusFg}
                    />
                  </a>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      <span className="text-coral-ink">Cliente</span> · {c.sector}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h3 className="font-display text-[24px] font-bold leading-tight tracking-[-0.02em] text-green">{c.name}</h3>
                      {"soon" in c && c.soon && (
                        <span className="rounded-full bg-coral px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink">
                          {c.soon}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Qué incluyó">
                      {c.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-ink">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="visit-cta text-[15px] font-semibold text-green"
                        aria-label={`${t.work.visit}: ${c.name} (se abre en una pestaña nueva)`}
                      >
                        <span aria-hidden className="visit-cta-label">
                          {[...t.work.visit].map((ch, i) => (
                            <span key={i} className="visit-cta-ch" style={{ "--i": i } as React.CSSProperties} data-ch={ch}>
                              {ch === " " ? "\u00a0" : ch}
                            </span>
                          ))}
                        </span>
                        <span aria-hidden className="visit-cta-arrow">
                          <span>→</span>
                          <span>→</span>
                        </span>
                      </a>
                      {"plan" in c && c.plan && (
                        <a href="#paquetes" className={`plan-badge plan-badge--${c.plan}`} title={`Hecho con el plan ${c.plan === "premium" ? "Premium" : "Esencial"}`}>
                          <span aria-hidden className="plan-badge-gem" />
                          <span className="plan-badge-txt">{c.plan === "premium" ? "Premium" : "Esencial"}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </CaseCard>
            );
          })}
          {/* Ficha final: "tu proyecto" (cierra la cuadrícula y vende el siguiente) */}
          <NextProjectCard t={t.work.next} />
        </ul>
      </div>
    </section>
  );
}
