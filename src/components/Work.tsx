import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { BrowserFrame, PhoneFrame, SiteVideo } from "./Frames";
import { CaseCard } from "./CaseCard";

// Videos grabados con scripts/record.mjs (recorrido con scroll de cada sitio).
const media = (slug: string, fmt: "desktop" | "mobile") => ({
  src: `/work/${slug}/${slug}-${fmt}.mp4`,
  poster: `/work/${slug}/${slug}-${fmt}-poster.webp`,
});

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="trabajo" aria-labelledby="trabajo-titulo" className="py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow n="02">{t.work.eyebrow}</Eyebrow>
            <h2 id="trabajo-titulo" className="h2 mt-5 max-w-[16ch] text-green">{t.work.title}</h2>
          </div>
          <p className="hero-lead max-w-[26rem] text-[17px] leading-[1.5] text-muted">
            {t.work.lead} <span className="md:hidden">{t.work.swipeHint}</span> <span className="hidden [@media(hover:hover)]:inline">{t.work.hoverHint}.</span>
          </p>
        </div>

        {/* Móvil: carrusel deslizable; tablet/desktop: cuadrícula */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {t.work.cases.map((c) => {
            const desktop = media(c.slug, "desktop");
            return (
              <CaseCard key={c.slug} id={`caso-${c.slug}`}>
                <article className="card flex h-full flex-col overflow-hidden bg-paper">
                  {/* Captura web con recorrido + iPhone */}
                  <div className="relative bg-sage/60 px-4 pb-6 pt-4">
                    <BrowserFrame domain={c.domain}>
                      <SiteVideo src={desktop.src} poster={desktop.poster} label={t.work.desktopAlt.replace("{name}", c.name)} className="aspect-[16/10]" />
                    </BrowserFrame>
                    <PhoneFrame
                      video={media(c.slug, "mobile")}
                      alt={t.work.mobileAlt.replace("{name}", c.name)}
                      className="absolute -bottom-1 right-3 w-[22%] max-w-[130px]"
                      statusBg={c.statusBg}
                      statusFg={c.statusFg}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      <span className="text-coral-ink">Cliente</span> · {c.sector}
                    </p>
                    <h3 className="mt-2 font-display text-[24px] font-bold leading-tight tracking-[-0.02em] text-green">{c.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Qué incluyó">
                      {c.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-ink">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-green hover:text-coral-ink"
                      aria-label={`${t.work.visit}: ${c.name} (se abre en una pestaña nueva)`}
                    >
                      {t.work.visit} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </CaseCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
