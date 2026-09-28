import { Logo } from "./Logo";

// Pantalla de carga en cada visita. Solo CSS: aparece al instante, no bloquea
// la interacción y se retira sola (~1.9 s) con un barrido hacia arriba.
// Secuencia: monograma → corchetes coral entran desde los lados → "D&A Lab" →
// barra de progreso → cortina. Se omite con "reducir movimiento".
export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader-logo">
        <Logo variant="mark" className="loader-mark w-[150px] text-bone sm:w-[190px]" title="" />
        <Logo variant="word" mono className="loader-word mt-5 w-[140px] text-bone sm:w-[170px]" title="" />
        <span className="loader-bar" />
      </div>
    </div>
  );
}
