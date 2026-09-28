import Link from "next/link";
import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BackToTop, LocalTime } from "./FooterBits";

// Footer: fondo verde profundo con rejilla de puntos que se desvanece, halo de
// luz animado y grano; cierre grande, columnas, estado en vivo y wordmark gigante.
export function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;
  return (
    <footer className="site-footer relative isolate overflow-hidden bg-green-deep text-bone">
      <div aria-hidden className="ft-dots" />
      <div aria-hidden className="ft-aurora" />
      <div aria-hidden className="ft-grain" />

      <div className="wrap relative pb-6 pt-16 sm:pt-20">
        {/* Cierre */}
        <div className="flex flex-col gap-6 border-b border-bone/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-coral-soft">‹ {f.kicker} ›</p>
            <p className="mt-4 max-w-[18ch] font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[52px]">
              {f.closing}
            </p>
          </div>
          <Link href="/contacto" className="ft-cta group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-coral py-2 pl-6 pr-2 text-[16px] font-semibold text-ink md:self-auto">
            {f.cta}
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-ink text-bone transition-transform duration-300 group-hover:-rotate-45">→</span>
          </Link>
        </div>

        {/* Columnas */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo mono className="h-9 w-auto text-bone" />
            <p className="mt-4 max-w-[26ch] text-mist">{f.tagline}</p>
            <p className="mt-6 flex items-center gap-2 text-[14px] text-mist">
              <span aria-hidden className="live-dot !mr-0 !size-2" /> {f.available}
            </p>
          </div>

          <nav aria-label={f.colNav}>
            <p className="ft-title">{f.colNav}</p>
            <ul className="mt-3">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ft-link">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="ft-title">{f.colWork}</p>
            <ul className="mt-3">
              {t.work.cases.map((c) => (
                <li key={c.slug}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="ft-link">
                    {c.name} <span aria-hidden className="ft-arrow">↗</span>
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-selectable className="col-span-2 lg:col-span-1">
            <p className="ft-title">{f.colContact}</p>
            <ul className="mt-3">
              <li>
                <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="ft-link gap-2">
                  <WhatsAppIcon className="size-4" /> {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="ft-link gap-2">
                  <span aria-hidden className="w-4 text-center font-mono text-coral-soft">@</span> {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-5"><LocalTime label={f.localTime} /></div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col gap-4 border-t border-bone/10 pt-6 text-[13px] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} D&amp;A Lab · {t.footer.rights} · {f.madeIn}</p>
          <BackToTop label={f.backToTop} />
        </div>
      </div>

      {/* Wordmark gigante recortado */}
      <div aria-hidden className="ft-giant relative mx-auto -mb-[3.2vw] mt-2 w-full max-w-[1400px] px-4 pb-20 md:pb-0">
        <Logo variant="word" mono className="h-auto w-full text-bone" title="" />
      </div>
    </footer>
  );
}
