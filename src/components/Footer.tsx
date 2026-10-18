import Link from "next/link";
import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { PhoneIcon } from "./PhoneIcon";
import { MailIcon } from "./MailIcon";
import { BackToTop } from "./FooterBits";
import { BehanceIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";

// Solo se muestran las redes que ya tienen URL (sin perfiles "fantasma").
const socials = [
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { name: "Behance", href: site.social.behance, Icon: BehanceIcon },
].filter((s) => s.href);

// Footer compacto (tamaño original) con fondo moderno: rejilla de puntos que
// se desvanece, halo de luz animado y grano sutil.
export function Footer({ t }: { t: Dictionary }) {
  const f = t.footer;
  return (
    <footer className="site-footer relative isolate overflow-hidden bg-green-deep pb-20 pt-7 text-bone md:pb-8 md:pt-12">
      <div aria-hidden className="ft-dots" />
      <div aria-hidden className="ft-aurora" />
      <div aria-hidden className="ft-grain" />
      <div aria-hidden className="ft-beam" />

      <div className="wrap relative">
        <div className="grid gap-5 md:flex md:items-start md:justify-between md:gap-8">
          {/* Logo (+ redes en móvil, en la misma fila) */}
          <div className="flex items-center justify-between gap-4 md:block">
            <div>
              <Link href="/#inicio" aria-label="D&A Lab, ir al inicio" className="ft-logo inline-block"><Logo className="h-8 w-auto text-bone md:h-9" title="" /></Link>
              <p className="mt-3 hidden max-w-[30ch] text-[15px] text-mist md:block">{f.tagline}</p>
              <p className="mt-2 flex items-center gap-2 text-[12px] text-mist md:mt-3 md:text-[13px]">
                <span aria-hidden className="live-dot !mr-0 !size-2" /> {f.available}
              </p>
            </div>
            <div className="md:hidden">
              <ul aria-label={f.social} className="flex items-center gap-1 md:-ml-2.5">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="ft-social">
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* 8 enlaces en 2 columnas de 4: grid-flow-col llena primero la columna izquierda */}
          <nav aria-label={f.colNav}>
            <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-8 md:gap-x-12 md:gap-y-1">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ft-link ft-nav">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="ft-title hidden md:block">{f.colContact}</p>
            <div data-selectable className="ft-phones flex flex-wrap items-center gap-x-5 md:flex-col md:items-start md:gap-y-1">
              <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="ft-chip">
                <span className="ft-chip-ic"><WhatsAppIcon className="size-3.5" /></span> {site.whatsappDisplay}
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
              <a href={`tel:${site.phone}`} className="ft-chip">
                <span className="ft-chip-ic"><PhoneIcon className="size-3.5" /></span> {site.phoneDisplay}
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
              <a href={`mailto:${site.email}`} className="ft-chip">
                <span className="ft-chip-ic"><MailIcon className="size-3.5" /></span> {site.email}
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
            </div>
            <div className="hidden md:block">
              <ul aria-label={f.social} className="flex items-center justify-center gap-1">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="ft-social">
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>

        {/* Barra inferior: una sola franja también en móvil */}
        <div className="mt-5 flex flex-col items-start gap-1 border-t border-bone/10 pr-20 pt-4 text-[12px] text-mist/75 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-4 md:pr-0 md:pt-5 md:text-[13px]">
          <p>© {new Date().getFullYear()} D&amp;A Lab<span className="hidden sm:inline"> · {f.rights}</span></p>
          <nav aria-label={f.legal}>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:gap-x-5">
              <li><a href="/terminos" className="ft-legal">{f.terms}</a></li>
              <li><a href="/privacidad" className="ft-legal">{f.privacy}</a></li>
              <li><a href="/cookies" className="ft-legal">{f.cookies}</a></li>
              <li><a href="/reembolsos" className="ft-legal">{f.refunds}</a></li>
            </ul>
          </nav>
          <div className="hidden md:block"><BackToTop label={f.backToTop} /></div>
        </div>
      </div>
    </footer>
  );
}
