import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="bracket-pattern bg-green py-10 text-bone sm:py-12">
      <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-12">
        <div>
          <Eyebrow n="09" tone="dark">{c.eyebrow}</Eyebrow>
          <h2 id="contacto-titulo" className="mt-3 font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[30px]">{c.title}</h2>
          <p className="mt-2 text-[15px] text-mist">{c.lead}</p>

          {/* PENDIENTE: correo en src/lib/site.ts */}
          <ul data-selectable className="mt-4 space-y-0.5" aria-label={c.direct}>
            <li>
              <a href={whatsappLink(c.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5 font-semibold hover:text-coral-soft">
                <WhatsAppIcon className="size-5" />
                {site.whatsappDisplay}
                <span className="sr-only">{c.whatsapp}, (se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2.5 font-semibold hover:text-coral-soft">
                <span aria-hidden className="w-5 text-center font-mono text-coral-soft">@</span>
                {site.email}
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
