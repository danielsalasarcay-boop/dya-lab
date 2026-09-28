import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

// Filosofía y servicios en un solo bloque de lectura rápida. El primer cuadro
// va en verde con el patrón de corchetes: dice de dónde venimos, no es un
// servicio, y la diferencia tiene que verse antes de leerlo.
export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-sage py-16 sm:py-20">
      <div className="wrap">
        <h2 id="servicios-titulo" className="h2 max-w-[24ch] text-green">
          {t.services.title.a} <span className="text-coral-ink">{t.services.title.b}</span>
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">{t.services.lead}</p>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {t.services.cards.map((c, i) => {
            const oscuro = i === 0;
            return (
              <li
                key={c.n}
                className={`flex flex-col rounded-3xl border p-7 sm:p-9 ${
                  oscuro ? "bracket-pattern border-green bg-green text-bone" : "border-line bg-paper"
                }`}
              >
                <Eyebrow n={c.n} tone={oscuro ? "dark" : "light"}>{c.eyebrow}</Eyebrow>
                <p
                  className={`mt-6 font-display text-[21px] font-bold leading-snug tracking-[-0.02em] text-balance sm:text-[23px] ${
                    oscuro ? "" : "text-green"
                  }`}
                >
                  {c.hook}
                </p>
                <p className={`mt-4 leading-relaxed ${oscuro ? "text-mist" : "text-muted"}`}>{c.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
