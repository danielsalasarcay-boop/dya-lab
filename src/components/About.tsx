import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { LogoCard } from "./LogoCard";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { LabScene } from "./LabScene";

// Página "Quiénes somos", corta y al grano: el logo animado con quiénes somos,
// cómo trabajamos en tres líneas y un cierre directo a WhatsApp.
export function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <div className="about-dark text-bone">
      <section aria-labelledby="nosotros-titulo" className="about-col pt-10 sm:pt-14">
        <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,12rem)_1fr]">
          <LogoCard label={a.logoLabel} />
          <header>
            <h1 id="nosotros-titulo" className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
              {a.title}
            </h1>
            <p className="mt-3 font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.7rem)] font-medium leading-[1.25] tracking-[-0.02em] text-mist">
              {a.subtitle}
            </p>
            <p className="mt-5 text-[16px] leading-[1.65] text-mist/80">{a.intro}</p>
          </header>
        </div>
      </section>

      <section aria-labelledby="trabajamos-titulo" className="about-col mt-10">
        <h2 id="trabajamos-titulo" className="about-h2">{a.philosophyTitle}</h2>
        <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-5">
          {a.philosophy.map((p) => (
            <li key={p.n} className="border-t border-bone/15 pt-5">
              <span aria-hidden className="font-mono text-[12px] tracking-[0.14em] text-coral-soft">‹ {p.n} ›</span>
              <h3 className="mt-3 font-display text-[19px] font-extrabold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-mist/80">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="nosotros-cta" className="about-col overflow-x-clip pb-12 pt-8">
        <div className="about-cta grid items-end gap-4 rounded-3xl px-6 pt-6 sm:grid-cols-[1fr_auto] sm:gap-6 sm:px-8 sm:pt-0">
          <div className="sm:py-8">
            <h2 id="nosotros-cta" className="font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.3rem)] font-extrabold leading-none tracking-[-0.03em]">{a.ctaTitle}</h2>
            <p className="mt-2 max-w-[30ch] text-mist">{a.ctaLead}</p>
            <p className="mt-5">
              <a href={whatsappLink(a.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-coral btn-shine">
                <WhatsAppIcon className="size-5" /> {a.cta}
              </a>
            </p>
          </div>
          {/* El zorro vierte una sustancia en otra; el vapor forma el botón "Ver portafolio" */}
          <div className="w-[200px] justify-self-center sm:w-[230px]">
            <LabScene cta={a.ctaWork} href="/#trabajo" />
          </div>
        </div>
      </section>
    </div>
  );
}
