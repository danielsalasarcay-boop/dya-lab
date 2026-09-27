import type { Dictionary } from "@/content/es";
import { site, whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="bracket-pattern bg-green py-20 text-bone sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow n="07" tone="dark">{c.eyebrow}</Eyebrow>
          <h2 id="contacto-titulo" className="display mt-5 text-[length:var(--text-h2)] lg:text-[80px]">{c.title}</h2>
          <p className="mt-5 max-w-[26rem] text-lg text-mist">{c.lead}</p>

          {/* PENDIENTE: correo en src/lib/site.ts */}
          <div className="mt-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-mist">{c.direct}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-xl font-semibold hover:text-coral-soft">
                  <WhatsAppIcon className="size-6" />
                  {site.whatsappDisplay}
                  <span className="sr-only">{c.whatsapp}, </span>
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-xl font-semibold hover:text-coral-soft">
                  <span aria-hidden className="font-mono text-coral-soft">@</span>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-bone/15 bg-green-deep/40 p-6 sm:p-9">
          <ContactForm t={c.form} />
        </div>
      </div>
    </section>
  );
}
