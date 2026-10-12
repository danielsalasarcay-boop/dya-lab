import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Ficha de cierre del portafolio: "tu proyecto". Una ventana de navegador que se
// está construyendo (dominio que se escribe, bloques que aparecen) y CTA a WhatsApp.
// En desktop ocupa 2 columnas para completar la última fila.
export function NextProjectCard({ t }: { t: Dictionary["work"]["next"] }) {
  return (
    <li className="next-card w-[86%] shrink-0 snap-start md:w-auto lg:col-span-2">
      <article className="bracket-pattern relative flex h-full flex-col overflow-hidden rounded-3xl bg-green text-bone lg:flex-row">
        {/* Navegador en construcción */}
        <div className="relative px-4 pb-6 pt-4 lg:w-[55%] lg:shrink-0 lg:py-6 lg:pl-6 lg:pr-0">
          <div className="np-browser overflow-hidden rounded-2xl border border-bone/15 bg-green-deep/70 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            <div className="flex h-8 items-center gap-2 border-b border-bone/10 px-3">
              <span aria-hidden className="font-mono text-[11px] text-coral-soft">‹›</span>
              <span className="np-domain font-mono text-[11px] text-mist" aria-label={t.domain}>
                <span className="np-type">{t.domain}</span>
              </span>
            </div>
            <div aria-hidden className="relative aspect-[16/10] p-4">
              <div className="np-block np-b1 h-3 w-1/3 rounded-full bg-bone/15" />
              <div className="np-block np-b2 mt-3 h-8 w-3/4 rounded-lg bg-bone/20" />
              <div className="np-block np-b3 mt-2 h-3 w-1/2 rounded-full bg-bone/10" />
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="np-block np-b4 aspect-square rounded-lg bg-coral/30" />
                <div className="np-block np-b5 aspect-square rounded-lg bg-bone/10" />
                <div className="np-block np-b6 aspect-square rounded-lg bg-bone/10" />
              </div>
              <span className="np-badge absolute right-3 top-3 rounded-full bg-coral px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
                {t.building}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-0 lg:justify-center lg:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
            <span className="text-coral-soft">‹</span> {t.label} <span className="text-coral-soft">›</span>
          </p>
          <h3 className="mt-2 font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.025em] lg:text-[30px]">{t.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-mist">{t.text}</p>
          <a
            href={whatsappLink(t.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="plan-cta plan-cta--coral mt-6 lg:max-w-[300px]"
          >
            <span className="plan-cta-fill" aria-hidden />
            <span className="plan-cta-label flex items-center gap-2"><WhatsAppIcon className="size-4" /> {t.cta}</span>
            <span aria-hidden className="plan-cta-arrow">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </span>
            <span className="sr-only">(se abre WhatsApp en una pestaña nueva)</span>
          </a>
        </div>
      </article>
    </li>
  );
}
