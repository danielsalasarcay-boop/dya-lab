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

// Portada: logo de partículas grande y centrado; debajo, las 3 webs con su
// animación (entrada en cascada, flotación, parallax y videos). El titular y el
// párrafo viven ahora en la sección siguiente (Services).
export function Hero({ t }: { t: Dictionary }) {
  const cases = t.work.cases;
  return (
    <section id="inicio" className="hero relative overflow-hidden pb-16 pt-12 sm:pt-16 lg:pb-24">
      <div className="wrap flex flex-col items-center">
        <div className="hero-up" style={{ ["--i" as string]: 0 }}>
          <HeroLogo label="D&A Lab" size="lg" />
        </div>
        <div className="mt-10 w-full max-w-[760px] sm:mt-14">
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
      </div>
    </section>
  );
}
