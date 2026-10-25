import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { MailIcon } from "./MailIcon";
import { InstagramIcon, LinkedInIcon } from "./SocialIcons";

export function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="bracket-pattern flex min-h-[calc(100svh-64px)] items-center bg-green py-14 text-bone sm:py-20">
      <div className="wrap grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-14">
        <div>
          <Eyebrow tone="dark">{c.eyebrow}</Eyebrow>
          <h1 id="contacto-titulo" className="mt-4 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[48px]">{c.title}</h1>
          <p className="mt-2 text-[15px] text-mist">{c.lead}</p>

          {/* Mismas fichas que el footer: icono en círculo coral y flecha que sale al pasar el cursor */}
          <ul data-selectable className="mt-5 flex flex-col items-start gap-2.5" aria-label={c.direct}>
            <li>
              <a href={whatsappLink(c.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="ft-chip ft-chip--lg">
                <span className="ft-chip-ic"><WhatsAppIcon className="size-4" /></span>
                {site.whatsappDisplay}
                <span className="sr-only">{c.whatsapp}, (se abre en una pestaña nueva)</span>
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="ft-chip ft-chip--lg">
                <span className="ft-chip-ic"><MailIcon className="size-4" /></span>
                {site.email}
                <span className="sr-only">(correo)</span>
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="ft-chip ft-chip--lg">
                <span className="ft-chip-ic"><InstagramIcon className="size-4" /></span>
                {site.social.instagramHandle}
                <span className="sr-only">(Instagram, se abre en una pestaña nueva)</span>
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="ft-chip ft-chip--lg">
                <span className="ft-chip-ic"><LinkedInIcon className="size-4" /></span>
                LinkedIn
                <span className="sr-only">(se abre en una pestaña nueva)</span>
                <span aria-hidden className="ft-chip-arrow">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-bone/15 bg-green-deep/40 p-4 sm:p-5">
          <ContactForm t={c.form} />
        </div>
      </div>
    </section>
  );
}
