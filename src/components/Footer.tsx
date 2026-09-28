import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BackToTop, LocalTime } from "./FooterBits";

// Footer compacto (tamaño original) con fondo moderno: rejilla de puntos que
// se desvanece, halo de luz animado y grano sutil.
export function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;
  return (
    <footer className="site-footer relative isolate overflow-hidden bg-green-deep pb-24 pt-10 text-bone md:pb-8 md:pt-12">
      <div aria-hidden className="ft-dots" />
      <div aria-hidden className="ft-aurora" />
      <div aria-hidden className="ft-grain" />

      <div className="wrap relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <div>
            <Logo mono className="h-9 w-auto text-bone" />
            <p className="mt-3 hidden max-w-[30ch] text-[15px] text-mist md:block">{f.tagline}</p>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-mist">
              <span aria-hidden className="live-dot !mr-0 !size-2" /> {f.available}
            </p>
          </div>

          <nav aria-label={f.colNav} className="md:max-w-[26rem]">
            <ul className="flex flex-wrap gap-x-5 gap-y-0">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ft-link">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-selectable className="flex flex-wrap items-center gap-x-5 md:flex-col md:items-start md:gap-0.5">
            <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="ft-link gap-2">
              <WhatsAppIcon className="size-4" /> {site.whatsappDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="ft-link gap-2">
              <span aria-hidden className="w-4 text-center font-mono text-coral-soft">@</span> {site.email}
            </a>
            <div className="md:mt-2"><LocalTime label={f.localTime} /></div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-bone/10 pt-4 text-[12px] text-mist sm:text-[13px] md:mt-8">
          <p>© {new Date().getFullYear()} D&amp;A Lab<span className="hidden sm:inline"> · {t.footer.rights}</span> · {f.madeIn}</p>
          <BackToTop label={f.backToTop} />
        </div>
      </div>
    </footer>
  );
}
