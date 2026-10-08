import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { PhoneIcon } from "./PhoneIcon";
import { BackToTop } from "./FooterBits";
import { BehanceIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";

const socials = [
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { name: "Behance", href: site.social.behance, Icon: BehanceIcon },
];

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

          {/* 8 enlaces en 2 columnas de 4: grid-flow-col llena primero la columna izquierda */}
          <nav aria-label={f.colNav}>
            <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-10 gap-y-1 md:gap-x-12">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ft-link ft-nav">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <div data-selectable className="ft-phones flex flex-col items-start gap-y-1">
              <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="ft-link gap-2">
                <WhatsAppIcon className="size-4" /> {site.whatsappDisplay}
              </a>
              <a href={`tel:${site.phone}`} className="ft-link gap-2">
                <PhoneIcon className="size-4" /> {site.phoneDisplay}
              </a>
            </div>
            <ul aria-label={f.social} className="-ml-2.5 flex items-center gap-1">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  {/* Sin URL todavía: se muestra el icono sin enlace */}
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="ft-social">
                      <Icon className="size-6" />
                    </a>
                  ) : (
                    <span role="img" aria-label={name} className="ft-social">
                      <Icon className="size-6" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior: apilada y centrada en móvil, repartida a los lados en escritorio */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-bone/10 pt-5 text-center text-[12px] text-mist/75 sm:text-[13px] md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} D&amp;A Lab<span className="hidden sm:inline"> · {f.rights}</span></p>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <nav aria-label={f.legal}>
              <ul className="flex flex-col items-center gap-x-6 sm:flex-row">
                {/* PENDIENTE: enlazar a /privacidad y /terminos cuando existan esas páginas */}
                <li><span className="ft-legal">{f.privacy}</span></li>
                <li><span className="ft-legal">{f.terms}</span></li>
              </ul>
            </nav>
            <BackToTop label={f.backToTop} />
          </div>
        </div>
      </div>
    </footer>
  );
}
