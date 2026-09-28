import { Logo } from "./Logo";

// Pantalla de carga en tres fases (solo CSS, ~1.6 s, no bloquea la interacción):
// 1. Arranque: rejilla técnica, línea de escaneo y contador 000 → 100 %.
// 2. Ensamblaje: el monograma se revela por escaneo con interferencia; corchetes y "D&A Lab".
// 3. Salida: la pantalla se abre en dos paneles (arriba / abajo).
// Se omite con "reducir movimiento".
export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader-panel loader-panel--top" />
      <div className="loader-panel loader-panel--bottom" />
      <div className="loader-grid" />
      <div className="loader-scan" />
      <div className="loader-core">
        <div className="loader-mark-wrap">
          <Logo variant="mark" className="loader-mark w-[140px] text-bone sm:w-[180px]" title="" />
          <Logo variant="mark" mono className="loader-ghost w-[140px] text-coral sm:w-[180px]" title="" />
        </div>
        <Logo variant="word" mono className="loader-word mt-4 w-[128px] text-bone sm:w-[156px]" title="" />
        <p className="loader-status">
          <span className="loader-tag">‹ D&amp;A Lab ›</span>
          <span className="loader-count" />
        </p>
        <span className="loader-bar" />
      </div>
    </div>
  );
}
