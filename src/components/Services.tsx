import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Bento en 12 columnas. Arriba: el titular con su CTA y, al lado, el porqué en
// verde (llena el hueco que dejaba el titular solo). Abajo: los dos servicios,
// asimétricos (la web pesa más que la marca) y encajados con subgrid.
export function Services({ t }: { t: Dictionary }) {
  const s = t.services;
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="svc-bg py-16 sm:py-20">
      <div className="wrap grid gap-4 lg:grid-cols-12 lg:gap-5">
        <header className="pb-6 lg:col-span-7 lg:pb-0 lg:pr-6">
          {/* Titular principal del sitio (antes en la portada) */}
          <h1 id="servicios-titulo" className="display max-w-[20ch] text-[clamp(2.1rem,1.1rem+3.4vw,3.9rem)] text-green">
            {t.hero.titleA} <span className="text-coral-ink">{t.hero.titleB}</span>
          </h1>
          <p className="hero-lead mt-5 max-w-[34rem] font-serif text-[19px] leading-[1.5] text-muted sm:text-[21px]">{t.hero.lead}</p>
          <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={whatsappLink(s.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-shine">
              <WhatsAppIcon className="size-5" />
              {s.cta}
            </a>
            <span className="text-[14px] text-muted">{s.ctaNote}</span>
          </p>
        </header>

        <aside aria-label={s.why.eyebrow} className="svc-card svc-reveal bracket-pattern svc-why flex flex-col justify-between gap-10 rounded-3xl bg-green p-7 text-bone sm:p-8 lg:col-span-5">
          <Eyebrow tone="dark">{s.why.eyebrow}</Eyebrow>
          <div>
            <p className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.2rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
              {s.why.big}
            </p>
            <p className="mt-4 max-w-[30ch] text-[16px] leading-snug text-mist">{s.why.small}</p>
          </div>
        </aside>

        <ul aria-label={s.listLabel} className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-subgrid lg:gap-5">
          {s.cards.map((c, i) => (
            <li key={c.n} className={`svc-card svc-glass svc-reveal flex flex-col rounded-3xl p-7 sm:p-8 ${i === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}>
              <article aria-labelledby={`svc-${c.n}`} className="flex grow flex-col">
                <Eyebrow n={c.n}>{c.eyebrow}</Eyebrow>
                <h2 id={`svc-${c.n}`} className="mt-5 font-display text-[24px] font-extrabold leading-[1.12] tracking-[-0.03em] text-green text-balance sm:text-[27px]">
                  {c.big}
                </h2>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-snug text-muted">{c.small}</p>
                <ul aria-label={`Incluye: ${c.eyebrow}`} className="mt-auto flex flex-wrap gap-2 pt-6">
                  {c.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line bg-bone/70 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-green">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <p className="flex flex-wrap items-center justify-end gap-3 pt-2 lg:col-span-12">
          <a href="#paquetes" className="svc-link inline-flex min-h-11 items-center gap-2 font-semibold text-green">
            {s.ctaAlt} <span aria-hidden className="svc-arrow">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
