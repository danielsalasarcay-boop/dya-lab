import Link from "next/link";
import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { LogoCard } from "./LogoCard";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Página "Quiénes somos", corta y al grano: el logo animado con quiénes somos,
// cómo trabajamos en tres líneas y un cierre directo a WhatsApp.
export function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <div className="about-dark text-bone">
      <section aria-labelledby="nosotros-titulo" className="about-col pt-14 sm:pt-24">
        <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,17rem)_1fr]">
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

      <section aria-labelledby="trabajamos-titulo" className="about-col mt-20">
        <h2 id="trabajamos-titulo" className="about-h2">{a.philosophyTitle}</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-5">
          {a.philosophy.map((p) => (
            <li key={p.n} className="border-t border-bone/15 pt-5">
              <span aria-hidden className="font-mono text-[12px] tracking-[0.14em] text-coral-soft">‹ {p.n} ›</span>
              <h3 className="mt-3 font-display text-[19px] font-extrabold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-mist/80">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="nosotros-cta" className="about-col pb-20 pt-20 sm:pb-28">
        <div className="about-cta flex flex-col gap-6 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <h2 id="nosotros-cta" className="font-display text-[clamp(1.8rem,1.4rem+1.5vw,2.4rem)] font-extrabold leading-none tracking-[-0.03em]">{a.ctaTitle}</h2>
            <p className="mt-2 text-mist">{a.ctaLead}</p>
          </div>
          <p className="flex flex-col items-start gap-2 sm:items-center">
            <a href={whatsappLink(a.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-coral btn-shine">
              <WhatsAppIcon className="size-5" /> {a.cta}
            </a>
            <Link href="/#trabajo" className="svc-link inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-mist hover:!text-bone">
              {a.ctaWork} <span aria-hidden className="svc-arrow">→</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
