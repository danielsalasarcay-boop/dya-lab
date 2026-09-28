import type { Dictionary } from "@/content/es";
import { Eyebrow } from "./Eyebrow";

// Glifos monolínea: cada uno dibuja cómo te compra ese cliente, no un icono
// genérico. Van sobre el verde salvia, así que el trazo es verde y el acento coral.
function WayGlyph({ id }: { id: string }) {
  const line = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 96 56" className="h-11 w-auto" role="img" aria-hidden focusable="false">
      {id === "chat" && (
        <>
          {/* dos globos: la conversación que arma el pedido */}
          <rect x="2" y="2" width="54" height="26" rx="9" className="stroke-green" {...line} />
          <path d="M13 11h28M13 19h18" className="stroke-green" {...line} />
          <rect x="40" y="30" width="54" height="24" rx="9" className="fill-coral" />
          <path d="M52 42h30" className="stroke-ink" {...line} />
        </>
      )}
      {id === "catalogo" && (
        <>
          {/* tres productos y el que se aparta */}
          <rect x="2" y="3" width="26" height="26" rx="7" className="stroke-green" {...line} />
          <rect x="34" y="3" width="26" height="26" rx="7" className="stroke-green" {...line} />
          <rect x="66" y="3" width="26" height="26" rx="7" className="fill-coral" />
          <path d="M2 40h20M34 40h20" className="stroke-green" {...line} />
          <rect x="66" y="37" width="26" height="14" rx="7" className="stroke-coral-ink" {...line} />
        </>
      )}
      {id === "cotizacion" && (
        <>
          {/* la hoja de precios que espera respuesta */}
          <rect x="13" y="2" width="54" height="48" rx="7" className="stroke-green" {...line} />
          <path d="M24 15h32M24 24h30M24 33h18" className="stroke-green" {...line} />
          <rect x="24" y="39" width="24" height="7" rx="3.5" className="fill-coral" />
          <path d="M76 20v16M76 36l-6-6M76 36l6-6" className="stroke-coral-ink" {...line} />
        </>
      )}
    </svg>
  );
}

export function Origin({ t }: { t: Dictionary }) {
  return (
    <section id="origen" aria-labelledby="origen-titulo" className="bg-sage py-16 sm:py-20">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Eyebrow n="01" tone="sage">{t.origin.eyebrow}</Eyebrow>
            <p className="mt-5 max-w-[20ch] font-display text-[20px] font-bold leading-snug tracking-[-0.01em] text-green sm:text-[22px]">
              {t.origin.aside}
            </p>
          </div>
          <div>
            <h2 id="origen-titulo" className="h2 text-green">{t.origin.title}</h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
              {t.origin.body.map((linea) => (
                <p key={linea}>{linea}</p>
              ))}
            </div>
          </div>
        </div>

        {/* La prueba de lo de arriba: las tres formas de vender del portafolio */}
        <div className="mt-14 border-t border-green/15 pt-10 sm:mt-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-green">
            {t.origin.waysLabel}
          </p>
          <ul className="mt-7 grid gap-9 sm:grid-cols-3 sm:gap-0">
            {t.origin.ways.map((w, i) => (
              <li
                key={w.id}
                className={i > 0 ? "sm:border-l sm:border-green/15 sm:pl-7 lg:pl-10" : "sm:pr-7 lg:pr-10"}
              >
                <span className="block text-green">
                  <WayGlyph id={w.id} />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-bold leading-tight tracking-[-0.02em] text-green sm:text-[21px]">
                  {w.name}
                </h3>
                <p className="mt-2 max-w-[28ch] text-[15px] leading-snug text-muted">{w.line}</p>
                <p className="mt-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-coral-ink">
                  {w.proof}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
