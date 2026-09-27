import Image from "next/image";
import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { BrowserFrame, PhoneFrame } from "./Frames";
import loopiHero from "../../public/work/loopi/loopi-hero.webp";
import qbHero from "../../public/work/quality-bikes/quality-bikes-hero.webp";
import mcHero from "../../public/work/mar-caribe/mar-caribe-hero.webp";
import loopiMobile from "../../public/work/loopi/loopi-mobile-hero.webp";

export function Hero({ t }: { t: Dictionary }) {
  const [loopi, qb, mc] = t.work.cases;
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-10 sm:pt-16 lg:pb-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <h1 className="display mt-6 text-[length:var(--text-display)] text-green">
            {t.hero.titleA} <span className="text-coral-ink">{t.hero.titleB}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl">{t.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trabajo" className="btn btn-coral">{t.hero.ctaWork}</a>
            <a href="#contacto" className="btn btn-ghost">{t.hero.ctaTalk}</a>
          </div>
          <p className="mt-10 text-sm text-muted">
            {t.hero.proof}{" "}
            {t.work.cases.map((c, i) => (
              <span key={c.slug}>
                <a href={`#caso-${c.slug}`} className="font-semibold text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-green">
                  {c.name}
                </a>
                {i < t.work.cases.length - 1 ? (i === t.work.cases.length - 2 ? " y " : ", ") : "."}
              </span>
            ))}
          </p>
        </div>

        {/* Collage con capturas reales de los tres sitios: el trabajo es la imagen del hero. */}
        <div className="relative mx-auto aspect-[1/0.86] w-full max-w-[640px]" aria-hidden>
          <BrowserFrame domain={mc.domain} className="absolute right-0 top-0 w-[78%]">
            <Image src={mcHero} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={65} preload />
          </BrowserFrame>
          <BrowserFrame domain={qb.domain} className="absolute right-[11%] top-[19%] w-[78%]">
            <Image src={qbHero} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={65} loading="eager" />
          </BrowserFrame>
          <BrowserFrame domain={loopi.domain} className="absolute right-[22%] top-[38%] w-[78%]">
            <Image src={loopiHero} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={70} loading="eager" />
          </BrowserFrame>
          <PhoneFrame src={loopiMobile} alt="" sizes="150px" className="absolute bottom-[-4%] right-[1%] w-[23%]" statusBg={loopi.statusBg} preload />
        </div>
      </div>
    </section>
  );
}
