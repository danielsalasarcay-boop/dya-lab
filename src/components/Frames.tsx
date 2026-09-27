import Image, { type StaticImageData } from "next/image";

// Marco de navegador mínimo: barra con el dominio real del cliente.
export function BrowserFrame({
  domain,
  children,
  className = "",
}: {
  domain: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgb(20_38_27/0.06),0_30px_60px_-30px_rgb(20_38_27/0.35)] ${className}`}>
      <div className="flex h-8 items-center gap-2 border-b border-line bg-bone px-3">
        <span aria-hidden className="font-mono text-[11px] text-coral-ink">‹›</span>
        <span className="truncate font-mono text-[11px] text-muted">{domain}</span>
      </div>
      {children}
    </div>
  );
}

// Página completa dentro de un marco con proporción fija. Al pasar el cursor
// (o enfocar el enlace del caso) se recorre la página de arriba a abajo.
export function ScrollShot({ src, alt, sizes, ratio = "16 / 10" }: { src: StaticImageData; alt: string; sizes: string; ratio?: string }) {
  const seconds = Math.min(14, Math.max(4, (src.height / src.width) * 1.1));
  return (
    <div className="scrollshot relative overflow-hidden" style={{ aspectRatio: ratio, containerType: "size", ["--dur" as string]: `${seconds}s` }}>
      <Image src={src} alt={alt} sizes={sizes} className="scrollshot-img block h-auto w-full" quality={70} />
    </div>
  );
}

// Mockup estilo iPhone Pro Max en CSS puro (sin imágenes de Apple): marco de
// titanio, bisel negro fino, Dynamic Island y botones laterales. Todo en
// unidades de contenedor (cqw) para que escale igual a cualquier tamaño.
export function PhoneFrame({
  src,
  alt,
  sizes,
  className = "",
  preload = false,
  statusBg = "#000",
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Color de fondo de la barra de estado (el tope de la captura). */
  statusBg?: string;
}) {
  return (
    <div className={`iphone ${className}`}>
      <span aria-hidden className="iphone-btn iphone-btn-l top-[19%] h-[5.5%]" />
      <span aria-hidden className="iphone-btn iphone-btn-l top-[27%] h-[9%]" />
      <span aria-hidden className="iphone-btn iphone-btn-l top-[38%] h-[9%]" />
      <span aria-hidden className="iphone-btn iphone-btn-r top-[29%] h-[13%]" />
      <span aria-hidden className="iphone-btn iphone-btn-r iphone-btn-cam top-[55%] h-[8%]" />
      <div className="iphone-body">
        <div className="iphone-screen">
          <div aria-hidden className="iphone-status" style={{ background: statusBg }}>
            <span>9:41</span>
            <span className="iphone-status-icons">
              <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
              <svg viewBox="0 0 16 12"><path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.5 10.5 0 0 0 8 .3 10.5 10.5 0 0 0 .5 3.4l1.3 1.3A8.7 8.7 0 0 1 8 2.2Zm0 3.7c1.4 0 2.7.5 3.6 1.4l1.3-1.3A7 7 0 0 0 8 4 7 7 0 0 0 3.1 6l1.3 1.3c.9-.9 2.2-1.4 3.6-1.4Zm0 3.6c-.5 0-1 .2-1.3.5L8 11.3l1.3-1.3c-.3-.3-.8-.5-1.3-.5Z" /></svg>
              <svg viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" strokeOpacity=".4" /><rect x="2" y="2" width="18" height="8" rx="2" /><path d="M25 4v4c.8-.3 1.3-1 1.3-2S25.8 4.3 25 4Z" fillOpacity=".4" /></svg>
            </span>
          </div>
          <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full" quality={70} {...(preload ? { loading: "eager" as const } : {})} />
          <span aria-hidden className="iphone-island" />
        </div>
      </div>
    </div>
  );
}
