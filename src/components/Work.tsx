import type { StaticImageData } from "next/image";
import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { BrowserFrame, PhoneFrame, ScrollShot } from "./Frames";

import loopiDesktop from "../../public/work/loopi/loopi-desktop-full.webp";
import loopiMobile from "../../public/work/loopi/loopi-mobile-hero.webp";
import qbDesktop from "../../public/work/quality-bikes/quality-bikes-desktop-full.webp";
import qbMobile from "../../public/work/quality-bikes/quality-bikes-mobile-hero.webp";
import mcDesktop from "../../public/work/mar-caribe/mar-caribe-desktop-full.webp";
import mcMobile from "../../public/work/mar-caribe/mar-caribe-mobile-hero.webp";

const shots: Record<string, { desktop: StaticImageData; mobile: StaticImageData }> = {
  loopi: { desktop: loopiDesktop, mobile: loopiMobile },
  "quality-bikes": { desktop: qbDesktop, mobile: qbMobile },
  "mar-caribe": { desktop: mcDesktop, mobile: mcMobile },
};

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="trabajo" aria-labelledby="trabajo-titulo" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow n="03">{t.work.eyebrow}</Eyebrow>
            <h2 id="trabajo-titulo" className="h2 mt-5 max-w-[16ch] text-green">{t.work.title}</h2>
          </div>
          <p className="max-w-[26rem] text-lg text-muted">
            {t.work.lead} <span className="hidden [@media(hover:hover)]:inline">{t.work.hoverHint}.</span>
          </p>
        </div>

        <ol className="mt-14 space-y-20 sm:space-y-28">
          {t.work.cases.map((c, i) => {
            const img = shots[c.slug];
            const flip = i % 2 === 1;
            return (
              <li key={c.slug} id={`caso-${c.slug}`} className="case scroll-mt-24">
                <article className={`grid items-center gap-10 lg:gap-14 ${flip ? "lg:grid-cols-[1fr_1.45fr] lg:[&>*:first-child]:order-2" : "lg:grid-cols-[1.45fr_1fr]"}`}>
                  <div className="relative pb-10 pr-8 sm:pr-14">
                    <BrowserFrame domain={c.domain}>
                      <ScrollShot
                        src={img.desktop}
                        alt={t.work.desktopAlt.replace("{name}", c.name)}
                        sizes="(min-width:1240px) 680px, (min-width:1024px) 55vw, 90vw"
                      />
                    </BrowserFrame>
                    <PhoneFrame
                      src={img.mobile}
                      alt={t.work.mobileAlt.replace("{name}", c.name)}
                      sizes="(min-width:1024px) 150px, 26vw"
                      className="absolute bottom-0 right-0 w-[28%] max-w-[190px]"
                      statusBg={c.statusBg}
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-coral-ink">
                      {String(i + 1).padStart(2, "0")} / {String(t.work.cases.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] text-green sm:text-[44px]">
                      {c.name}
                    </h3>
                    <p className="mt-3 text-[15px] font-medium text-ink">{c.sector}</p>
                    <p className="mt-5 text-[17px] leading-relaxed text-muted">{c.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Qué incluyó">
                      {c.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-8"
                      aria-label={`${t.work.visit}: ${c.name} (se abre en una pestaña nueva)`}
                    >
                      {t.work.visit} <span aria-hidden>↗</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
