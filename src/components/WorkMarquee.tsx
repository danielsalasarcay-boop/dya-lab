// Divisor entre secciones: una franja fina con los nombres de nuestros trabajos
// pasando en carrusel infinito. Es decorativa (el portafolio ya los lista con
// sus enlaces), así que va oculta para lectores de pantalla y no recibe foco.
export function WorkMarquee({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const lista = (
    <ul className="wm-list">
      {names.map((n) => (
        <li key={n}>
          {n}
          <span className="wm-sep">‹ ›</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden className={`wm ${reverse ? "wm--reverse" : ""}`}>
      <div className="wm-track">
        {lista}
        {lista}
      </div>
    </div>
  );
}
