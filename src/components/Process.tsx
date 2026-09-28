import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";
import { ProcessSteps } from "./ProcessSteps";

export function Process({ t }: { t: Dictionary }) {
  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="bracket-pattern bg-green py-10 text-bone sm:py-12">
      {/* CONFIRMAR: plazos de cada paso en src/content/es.ts (process) */}
      <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-12">
        <div>
          <Eyebrow n="06" tone="dark">{t.process.eyebrow}</Eyebrow>
          <h2 id="proceso-titulo" className="mt-3 font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[30px]">
            {t.process.title}
          </h2>
        </div>
        <ProcessSteps steps={t.process.steps} label={t.process.eyebrow} />
      </div>
    </section>
  );
}
