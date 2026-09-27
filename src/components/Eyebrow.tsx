// Etiqueta de sección con los corchetes del logo (‹ ›) como recurso gráfico.
export function Eyebrow({ n, children, tone = "light" }: { n?: string; children: React.ReactNode; tone?: "light" | "dark" | "sage" }) {
  const text = tone === "dark" ? "text-mist" : "text-muted";
  const accent = { light: "text-coral-ink", dark: "text-coral-soft", sage: "text-green" }[tone];
  return (
    <p className={`flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.14em] ${text}`}>
      <span aria-hidden className={accent}>‹</span>
      {n && <span className={accent}>{n}</span>}
      <span>{children}</span>
      <span aria-hidden className={accent}>›</span>
    </p>
  );
}
