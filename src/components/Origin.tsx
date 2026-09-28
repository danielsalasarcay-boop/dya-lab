import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

export function Origin({ t }: { t: Dictionary }) {
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="bg-sage py-16 sm:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Eyebrow n="01" tone="sage">{t.origin.eyebrow}</Eyebrow>
          <p className="mt-5 max-w-[20ch] font-display text-[20px] font-semibold leading-snug tracking-[-0.01em] text-green sm:text-[22px]">
            {t.origin.aside}
          </p>
        </div>
        <div>
          <h2 id="origen-titulo" className="h2 text-green">{t.origin.title}</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
            {t.origin.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
