"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrowserFrame, PhoneFrame } from "./Frames";

type Site = { slug: string; domain: string; statusBg: string; statusFg?: string };
type Shot = Site & { img: StaticImageData; mobile: StaticImageData };

// Orden de las 3 ventanas: cambia en cada visita. Lo decide un script en el <head>
// (layout.tsx) ANTES de pintar, escribiendo html[data-hero-turn]; el CSS coloca cada
// ventana según ese atributo. Así las imágenes nunca cambian de src tras hidratar
// (antes eso provocaba una segunda descarga y retrasaba el LCP en móvil).
function readTurn() {
  return Number(document.documentElement.dataset.heroTurn ?? "0") || 0;
}
const noop = () => () => {};

// Collage del hero:
// - las ventanas entran en cascada y flotan; con cursor, se mueven en capas (parallax 3D);
// - la ventana del frente y el iPhone reproducen los videos reales de cada sitio,
//   uno tras otro (cambia el dominio de la barra). El video se monta encima de la
//   captura y solo aparece cuando ya se reproduce: la carga inicial no cambia.
export function HeroCollage({ trio, extras }: { trio: Shot[]; extras: Site[] }) {
  const k = useSyncExternalStore(noop, readTurn, () => 0) % trio.length;
  const frontShot = trio[k];
  // Videos del frente: primero el sitio que está al frente, luego los demás proyectos.
  const sites: Site[] = [frontShot, ...extras];
  const rootRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [live, setLive] = useState(false);
  const site = sites[idx];

  // Parallax con el cursor (solo con mouse y sin "reducir movimiento").
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const section = el.closest("section") ?? el;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
        const py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    const reset = () => { el.style.setProperty("--px", "0"); el.style.setProperty("--py", "0"); };
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", reset);
    };
  }, []);

  // Encender los videos cuando la página ya cargó y el collage está en pantalla.
  useEffect(() => {
    const el = rootRef.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!el || conn?.saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | null = null;
    const arm = () => {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLive(true); io?.disconnect(); } }, { threshold: 0.3 });
      io.observe(el);
    };
    const timer = window.setTimeout(() => (document.readyState === "complete" ? arm() : window.addEventListener("load", arm, { once: true })), 1800);
    return () => { window.clearTimeout(timer); io?.disconnect(); window.removeEventListener("load", arm); };
  }, []);

  // Reproducir el sitio actual en la ventana y en el iPhone.
  useEffect(() => {
    const el = rootRef.current;
    if (!live || !el) return;
    el.querySelectorAll<HTMLVideoElement>("video.hero-live").forEach((v) => {
      v.classList.remove("is-playing");
      v.onplaying = () => v.classList.add("is-playing");
      v.load();
      v.play().catch(() => {});
    });
  }, [live, idx]);

  const media = (fmt: "desktop" | "mobile") => ({
    src: `/work/${site.slug}/${site.slug}-${fmt}.mp4`,
    poster: `/work/${site.slug}/${site.slug}-${fmt}-poster.webp`,
  });

  return (
    <div ref={rootRef} className="hero-collage relative mx-auto aspect-[1/0.86] w-full max-w-[640px]" aria-hidden>
      <div aria-hidden className="hero-glow" />
      {/* Las 3 ventanas en orden fijo; su lugar (atrás / medio / frente) lo pone el CSS. */}
      {trio.map((shot, j) => (
        <div key={shot.slug} className={`hero-layer hero-item hero-item-${j} absolute w-[78%]`}>
          <div className="hero-fly"><div className="hero-float">
            <BrowserFrame domain={shot.domain}>
              <Image src={shot.img} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={70} preload={j === 0} loading="eager" />
            </BrowserFrame>
          </div></div>
        </div>
      ))}
      {/* Video del frente: capa encima de la ventana delantera, solo cuando ya se reproduce */}
      {live && (
        <div className="hero-layer hero-front-video absolute w-[78%]">
          <div className="hero-fly"><div className="hero-float">
            <BrowserFrame domain={site.domain}>
              <video
                key={site.slug}
                className="hero-live block aspect-[16/10] w-full object-cover"
                src={media("desktop").src}
                poster={media("desktop").poster}
                muted
                playsInline
                preload="auto"
                onEnded={() => setIdx((i) => (i + 1) % sites.length)}
              />
            </BrowserFrame>
          </div></div>
        </div>
      )}
      {/* iPhone: uno por sitio, superpuestos; se ve el del sitio que va al frente */}
      <div className="hero-layer hero-phone absolute bottom-[-4%] right-[1%] w-[23%]">
        <div className="hero-fly"><div className="hero-float" style={{ ["--f" as string]: "5.9s" }}>
          <div className="relative">
            {trio.map((shot, j) => (
              <div key={shot.slug} className={`hero-phone-item hero-phone-${j} ${j === 0 ? "" : "absolute inset-0"}`}>
                <PhoneFrame
                  src={shot.mobile}
                  video={live && j === k ? media("mobile") : undefined}
                  alt=""
                  sizes="150px"
                  statusBg={live && j === k ? site.statusBg : shot.statusBg}
                  statusFg={live && j === k ? site.statusFg : shot.statusFg}
                  preload={j === 0}
                />
              </div>
            ))}
          </div>
        </div></div>
      </div>
    </div>
  );
}
