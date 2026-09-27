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

export function PhoneFrame({ src, alt, sizes, className = "" }: { src: StaticImageData; alt: string; sizes: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-ink shadow-[0_30px_50px_-25px_rgb(20_38_27/0.5)] ${className}`}>
      <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full rounded-[1.25rem]" quality={70} />
    </div>
  );
}
