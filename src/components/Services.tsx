import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Mascot } from "./Mascot";

// Arriba: titular, párrafo y acciones. Abajo: tres tarjetas compactas en una fila
// (web, marca y el porqué). La mascota se asoma por el borde derecho de la última.
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="svc-bg relative z-20 py-14 sm:py-16">
      <div className="wrap">
        <header className="grid items-end gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* Titular principal del sitio (antes en la portada) */}
          <h1 id="servicios-titulo" className="display max-w-[20ch] text-[clamp(2rem,1.1rem+3vw,3.4rem)] text-green">
            {t.hero.titleA} <span className="text-coral-ink">{t.hero.titleB}</span>
          </h1>
          <div>
            <p className="hero-lead max-w-[34rem] font-serif text-[18px] leading-[1.5] text-muted sm:text-[19px]">{t.hero.lead}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={whatsappLink(s.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-shine">
                <WhatsAppIcon className="size-5" />
                {s.cta}
              </a>
              <a href="#paquetes" className="svc-link inline-flex min-h-11 items-center gap-2 font-semibold text-green">
                {s.ctaAlt} <span aria-hidden className="svc-arrow">→</span>
              </a>
            </p>
          </div>
        </header>

        <ul aria-label={s.listLabel} className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-5">
          {s.cards.map((c) => (
            <li key={c.n} className="svc-card svc-glass svc-reveal flex flex-col rounded-3xl p-5 sm:p-6">
              <article aria-labelledby={`svc-${c.n}`} className="flex grow flex-col">
                <Eyebrow n={c.n}>{c.eyebrow}</Eyebrow>
                <h2 id={`svc-${c.n}`} className="mt-3 font-display text-[21px] font-extrabold leading-[1.15] tracking-[-0.02em] text-green text-balance">
                  {c.big}
                </h2>
                <p className="mt-2 text-[15px] leading-snug text-muted">{c.small}</p>
                <ul aria-label={`Incluye: ${c.eyebrow}`} className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {c.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line bg-bone/70 px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-green">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}

          <li className="relative">
            <aside aria-label={s.why.eyebrow} className="svc-card svc-reveal bracket-pattern svc-why flex h-full flex-col rounded-3xl bg-green p-5 text-bone sm:p-6">
              <Eyebrow tone="dark">{s.why.eyebrow}</Eyebrow>
              <p className="mt-3 max-w-[13ch] font-display text-[21px] font-extrabold leading-[1.15] tracking-[-0.02em] text-balance">{s.why.big}</p>
              <p className="mt-2 max-w-[17ch] text-[15px] leading-snug text-mist sm:max-w-[20ch]">{s.why.small}</p>
            </aside>
            <Mascot label="Mascota de D&A Lab saludando" />
          </li>
        </ul>
      </div>
    </section>
  );
}
