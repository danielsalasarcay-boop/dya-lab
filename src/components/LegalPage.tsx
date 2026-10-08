import type { LegalDoc } from "@/content/legal";

// Página de texto legal con el mismo fondo oscuro de /nosotros:
// columna angosta, secciones numeradas y fecha de actualización arriba.
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="about-dark text-bone">
      <article aria-labelledby="legal-titulo" className="about-col pb-16 pt-10 sm:pt-14">
        <header>
          <h1 id="legal-titulo" className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
            {doc.title}
          </h1>
          <p className="mt-3 font-mono text-[12px] tracking-[0.14em] text-coral-soft">Última actualización: {doc.updated}</p>
        </header>

        <ol className="mt-10 grid gap-8">
          {doc.sections.map((s, i) => (
            <li key={s.h} className="border-t border-bone/15 pt-6">
              <h2 className="font-display text-[20px] font-extrabold tracking-[-0.02em]">
                <span aria-hidden className="mr-2 font-mono text-[12px] font-normal tracking-[0.14em] text-coral-soft">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              {s.blocks.map((b, j) =>
                typeof b === "string" ? (
                  <p key={j} className="mt-3 text-[16px] leading-[1.65] text-mist/85">{b}</p>
                ) : (
                  <ul key={j} className="mt-3 grid list-disc gap-1.5 pl-5 text-[16px] leading-[1.65] text-mist/85 marker:text-coral-soft">
                    {b.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ),
              )}
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
