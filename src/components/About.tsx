import Link from "next/link";
import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { LogoCard } from "./LogoCard";

// Página "Quiénes somos", en clave editorial: fondo oscuro, una sola columna de
// lectura y la tarjeta del logo donde otros estudios ponen la foto del fundador.
export function About({ t }: { t: Dictionary }) {
  const a = t.about;
  return (
    <div className="about-dark text-bone">
      <section aria-labelledby="nosotros-titulo" className="about-col pt-16 sm:pt-28">
        <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,18rem)_1fr]">
          <LogoCard label={a.logoLabel} />
          <header>
            <h1 id="nosotros-titulo" className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
              {a.title}
            </h1>
            <p className="mt-3 font-display text-[clamp(1.35rem,1.1rem+1vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.02em] text-mist">
              {a.subtitle}
            </p>
          </header>
        </div>
        <div className="about-prose mt-14">
          {a.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section aria-labelledby="hacemos-titulo" className="about-col mt-24">
        <h2 id="hacemos-titulo" className="about-h2">{a.servicesTitle}</h2>
        <ol className="mt-8 border-t border-bone/10">
          {a.services.map((s, i) => (
            <li key={s.eyebrow} className="about-service grid gap-3 border-b border-bone/10 py-8 sm:grid-cols-[12rem_1fr] sm:items-start sm:gap-6">
              <div className="whitespace-nowrap sm:pt-2"><Eyebrow n={String(i + 1).padStart(2, "0")} tone="dark">{s.eyebrow}</Eyebrow></div>
              <div>
                <h3 className="font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[26px]">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.65] text-mist/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-right">
          <Link href="/#paquetes" className="svc-link inline-flex min-h-11 items-center gap-2 font-semibold text-coral-soft hover:!text-bone">
            {a.servicesCta} <span aria-hidden className="svc-arrow">→</span>
          </Link>
        </p>
      </section>

      <section aria-labelledby="mueve-titulo" className="about-col mt-20">
        <h2 id="mueve-titulo" className="about-h2">{a.drivesTitle}</h2>
        <div className="about-prose mt-6">
          {a.drives.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section aria-labelledby="trabajamos-titulo" className="about-col mt-20">
        <h2 id="trabajamos-titulo" className="about-h2">{a.philosophyTitle}</h2>
        <div className="about-prose mt-6">
          {a.philosophy.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section aria-labelledby="nosotros-cta" className="about-col pb-24 pt-28 sm:pb-32">
        <div className="grid items-center gap-10 sm:grid-cols-[1fr_minmax(0,15rem)]">
          <div>
            <h2 id="nosotros-cta" className="font-display text-[clamp(1.9rem,1.4rem+1.8vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
              {a.ctaTitleA}<br />{a.ctaTitleB}
            </h2>
            <p className="mt-3 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)] font-medium leading-[1.25] tracking-[-0.02em] text-mist">{a.ctaLead}</p>
            <Link href="/contacto" className="btn btn-coral btn-shine mt-8">
              {a.cta} <span aria-hidden>→</span>
            </Link>
          </div>
          <LogoCard label={a.logoLabel} size="sm" />
        </div>
      </section>
    </div>
  );
}
