import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

// Cada cuadro es un cartel, no un párrafo: una frase que se lee de un golpe,
// una línea que la explica y el número como marca de agua que el borde recorta.
// El 01 va en verde porque no es un servicio, es de dónde venimos.
export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-sage py-16 sm:py-20">
      <div className="wrap">
        <h2 id="servicios-titulo" className="h2 max-w-[22ch] text-green">
          {t.services.title.a} <span className="text-coral-ink">{t.services.title.b}</span>
        </h2>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 sm:mt-12">
          {t.services.cards.map((c, i) => {
            const oscuro = i === 0;
            return (
              <li
                key={c.n}
                className={`relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${
                  oscuro ? "bracket-pattern border-green bg-green text-bone" : "border-line bg-paper"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-7 -top-10 select-none font-display text-[150px] font-extrabold leading-none tracking-[-0.07em] ${
                    oscuro ? "text-bone/[0.08]" : "text-green/[0.05]"
                  }`}
                >
                  {c.n}
                </span>

                <div className="relative">
                  <Eyebrow tone={oscuro ? "dark" : "light"}>{c.eyebrow}</Eyebrow>

                  <p
                    className={`mt-5 font-display text-[22px] font-extrabold leading-[1.15] tracking-[-0.03em] text-balance sm:text-[25px] ${
                      oscuro ? "" : "text-green"
                    }`}
                  >
                    {c.big}
                  </p>

                  {/* La rayita del logotipo, repetida a escala de cuadro */}
                  <span
                    aria-hidden
                    className={`mt-4 block h-[3px] w-9 rounded-full ${oscuro ? "bg-coral-soft" : "bg-coral"}`}
                  />

                  <p className={`mt-4 text-[15px] leading-snug ${oscuro ? "text-mist" : "text-muted"}`}>{c.small}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-green">
          {t.services.note}
        </p>
      </div>
    </section>
  );
}
