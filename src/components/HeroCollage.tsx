"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { BrowserFrame, PhoneFrame } from "./Frames";

type Site = { slug: string; domain: string; statusBg: string; statusFg?: string };

// Collage del hero:
// - las ventanas entran en cascada y flotan; con cursor, se mueven en capas (parallax 3D);
// - la ventana del frente y el iPhone reproducen los videos reales de cada sitio,
//   uno tras otro (cambia el dominio de la barra). El video se monta encima de la
//   captura y solo aparece cuando ya se reproduce: la carga inicial no cambia.
export function HeroCollage({
  sites,
  back,
  middle,
  front,
  phone,
}: {
  sites: Site[];
  back: { src: StaticImageData; domain: string };
  middle: { src: StaticImageData; domain: string };
  front: StaticImageData;
  phone: StaticImageData;
}) {
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
      <div className="hero-layer absolute right-0 top-0 w-[78%]" style={{ ["--d" as string]: 0.35, ["--i" as string]: 0 }}>
        <div className="hero-fly"><div className="hero-float" style={{ ["--f" as string]: "7.5s" }}>
          <BrowserFrame domain={back.domain}>
            <Image src={back.src} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={65} preload />
          </BrowserFrame>
        </div></div>
      </div>
      <div className="hero-layer absolute right-[11%] top-[19%] w-[78%]" style={{ ["--d" as string]: 0.7, ["--i" as string]: 1 }}>
        <div className="hero-fly"><div className="hero-float" style={{ ["--f" as string]: "8.5s" }}>
          <BrowserFrame domain={middle.domain}>
            <Image src={middle.src} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={65} loading="eager" />
          </BrowserFrame>
        </div></div>
      </div>
      <div className="hero-layer absolute right-[22%] top-[38%] w-[78%]" style={{ ["--d" as string]: 1.1, ["--i" as string]: 2 }}>
        <div className="hero-fly"><div className="hero-float" style={{ ["--f" as string]: "6.8s" }}>
          <BrowserFrame domain={live ? site.domain : sites[0].domain}>
            <div className="relative">
              <Image src={front} alt="" sizes="(min-width:1024px) 440px, 72vw" quality={70} loading="eager" />
              {live && (
                <video
                  key={site.slug}
                  className="hero-live absolute inset-0 h-full w-full object-cover"
                  src={media("desktop").src}
                  poster={media("desktop").poster}
                  muted
                  playsInline
                  preload="auto"
                  onEnded={() => setIdx((i) => (i + 1) % sites.length)}
                />
              )}
            </div>
          </BrowserFrame>
        </div></div>
      </div>
      <div className="hero-layer absolute bottom-[-4%] right-[1%] w-[23%]" style={{ ["--d" as string]: 1.6, ["--i" as string]: 3 }}>
        <div className="hero-fly"><div className="hero-float" style={{ ["--f" as string]: "5.9s" }}>
          <PhoneFrame
            key={live ? site.slug : "static"}
            src={phone}
            video={live ? media("mobile") : undefined}
            alt=""
            sizes="150px"
            statusBg={live ? site.statusBg : sites[0].statusBg}
            statusFg={live ? site.statusFg : sites[0].statusFg}
            preload
          />
        </div></div>
      </div>
    </div>
  );
}
