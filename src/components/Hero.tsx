import type { Dictionary } from "@/content/es";
import { HeroCollage } from "./HeroCollage";
import loopiHero from "../../public/work/loopi/loopi-hero.webp";
import qbHero from "../../public/work/quality-bikes/quality-bikes-hero.webp";
import mcHero from "../../public/work/mar-caribe/mar-caribe-hero.webp";
import loopiMobile from "../../public/work/loopi/loopi-mobile-hero.webp";
import qbMobile from "../../public/work/quality-bikes/quality-bikes-mobile-hero.webp";
import mcMobile from "../../public/work/mar-caribe/mar-caribe-mobile-hero.webp";
import { HeroLogo } from "./HeroLogo";

const HIDDEN_IN_HERO = ["casa-verde"];

const SHOTS = {
  loopi: { img: loopiHero, mobile: loopiMobile },
  "quality-bikes": { img: qbHero, mobile: qbMobile },
  "mar-caribe": { img: mcHero, mobile: mcMobile },
} as const;

// Titular que entra palabra por palabra (máscara). El texto completo sigue en el h1.
function Words({ text, from, className = "" }: { text: string; from: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className={`hw ${className}`}>
            <span className="hw-in" style={{ ["--i" as string]: from + i }}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export function Hero({ t }: { t: Dictionary }) {
  const cases = t.work.cases;
  const nA = t.hero.titleA.split(" ").length;
  const nB = t.hero.titleB.split(" ").length;
  const after = nA + nB; // los elementos siguientes entran después del titular

  return (
    <section id="inicio" className="hero relative overflow-hidden pb-16 pt-10 sm:pt-16 lg:pb-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <div className="hero-up mb-6 sm:mb-8" style={{ ["--i" as string]: 0 }}>
            <HeroLogo label="D&A Lab" />
          </div>
          <h1 className="display text-[clamp(2.1rem,1.1rem+3.4vw,3.9rem)] text-green">
            <Words text={t.hero.titleA} from={1} />
            <Words text={t.hero.titleB} from={1 + nA} className="text-coral-ink" />
          </h1>
          <p className="hero-up mt-6 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--i" as string]: after + 1 }}>
            {t.hero.lead}
          </p>
          <div className="hero-up mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: after + 2 }}>
            <a href="#trabajo" className="btn btn-coral btn-shine">{t.hero.ctaWork}</a>
            <a href="#contacto" className="btn btn-ghost">{t.hero.ctaTalk}</a>
          </div>
        </div>

        <HeroCollage
          trio={cases
            .filter((c) => c.slug in SHOTS)
            .map((c) => ({ slug: c.slug, domain: c.domain, statusBg: c.statusBg, statusFg: c.statusFg, ...SHOTS[c.slug as keyof typeof SHOTS] }))}
          // Videos que rotan en la ventana del frente (Casa Verde no se muestra en la portada).
          extras={cases
            .filter((c) => !(c.slug in SHOTS) && !HIDDEN_IN_HERO.includes(c.slug))
            .map((c) => ({ slug: c.slug, domain: c.domain, statusBg: c.statusBg, statusFg: c.statusFg }))}
        />
      </div>
    </section>
  );
}
