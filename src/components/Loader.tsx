import { Logo } from "./Logo";

// Pantalla de carga con el logo vertical (isotipo + "D&A Lab" apilados).
// Solo CSS: aparece al instante, se retira sola en ~1.2 s y nunca bloquea la
// interacción. Una vez por sesión (ver script en layout) y se omite con
// prefers-reduced-motion.
export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader-logo text-green">
        <Logo variant="mark" className="loader-mark w-[150px] sm:w-[190px]" title="" />
        <Logo variant="word" className="loader-word mt-4 w-[150px] sm:w-[190px]" title="" />
      </div>
    </div>
  );
}
