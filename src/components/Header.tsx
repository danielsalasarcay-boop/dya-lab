"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";
import type { Dictionary } from "@/content/es";

// Header interactivo:
// - arriba: barra verde a todo el ancho; al bajar se convierte en una "isla" flotante;
// - píldora que se desliza al enlace de la sección visible;
// - barra de progreso de lectura;
// - móvil/tablet: menú a pantalla completa con enlaces en cascada.
export function Header({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Estado "scrolled" + progreso de lectura (una sola escucha, con rAF).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        barRef.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, y / max) : 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Sección activa: la que cruza la franja central de la pantalla.
  useEffect(() => {
    const ids = t.nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => { if (window.scrollY < window.innerHeight * 0.5) setActive(null); };
    window.addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", top); };
  }, [t.nav]);

  // Posición de la píldora bajo el enlace activo.
  useEffect(() => {
    const place = () => {
      const a = active && navRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
      if (!a || !navRef.current) return setPill(null);
      const base = navRef.current.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      setPill({ x: r.left - base.left, w: r.width });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, scrolled]);

  // Menú: bloquear scroll, Escape, foco.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, [open]);

  const island = scrolled && !open;

  return (
    <header className="site-header sticky top-0 z-40" data-island={island || undefined}>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-green">
        {t.skip}
      </a>
      <div className="header-shell">
        <div className="header-bar relative flex items-center justify-between gap-4">
          {/* Logo a color sobre placa blanca */}
          <a href="#inicio" onClick={() => setOpen(false)} className="header-logo rounded-xl bg-paper px-3 py-1.5 text-green shadow-[0_1px_2px_rgb(0_0_0/0.15)]" aria-label="D&A Lab, ir al inicio">
            <Logo className="h-7 w-auto sm:h-8" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={navRef} className="relative flex items-center gap-1 text-[15px] font-medium">
              <span
                aria-hidden
                className="nav-pill absolute inset-y-0 rounded-full bg-bone/12"
                style={{ transform: `translateX(${pill?.x ?? 0}px)`, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
              />
              {t.nav.map((item) => {
                const on = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={on ? "true" : undefined}
                      className={`nav-link relative flex min-h-11 items-center rounded-full px-3.5 transition-colors ${on ? "text-bone" : "text-sage hover:text-bone"}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contacto" className="btn btn-coral btn-shine hidden min-h-10 px-5 text-[14px] sm:inline-flex">
              {t.navCta} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-50 inline-flex size-11 items-center justify-center rounded-full border border-bone/30 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[2px] w-5 bg-bone transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] w-5 bg-bone transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
              </span>
            </button>
          </div>

          <div ref={barRef} aria-hidden className="header-progress" />
        </div>
      </div>

      {/* Menú a pantalla completa (móvil y tablet) */}
      <div id="menu-movil" className="mobile-menu bracket-pattern lg:hidden" data-open={open || undefined} aria-hidden={!open} inert={!open}>
        <nav aria-label="Principal móvil" className="wrap flex h-full flex-col pb-8 pt-24">
          <ul className="flex flex-col">
            {t.nav.map((item, i) => (
              <li key={item.href} className="mm-item border-b border-bone/12" style={{ ["--i" as string]: i }}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex min-h-16 items-center justify-between gap-4 font-display text-[32px] font-extrabold tracking-[-0.03em] text-bone sm:text-[40px]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-coral-soft">0{i + 1}</span>
                    {item.label}
                  </span>
                  <span aria-hidden className="text-coral-soft transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mm-item mt-auto flex flex-col gap-3 pt-8 sm:flex-row" style={{ ["--i" as string]: t.nav.length }}>
            <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-coral flex-1">{t.navCta}</a>
            <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="btn flex-1 border border-bone/30 text-bone">
              <WhatsAppIcon className="size-5" /> WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
