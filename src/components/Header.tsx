"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";
import type { Dictionary } from "@/content/es";

// Header interactivo:
// - arriba: barra verde a todo el ancho; al bajar se convierte en una "isla" flotante;
// - píldora que se desliza al enlace de la sección visible;
// - barra de progreso de lectura;
// - móvil/tablet: menú a pantalla completa con enlaces en cascada.
export function Header({ t }: { t: Dictionary }) {
  const pathname = usePathname();
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
    const ids = t.nav.filter((n) => n.href.startsWith("/#")).map((n) => n.href.slice(2));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(`/#${e.target.id}`); });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => { if (window.scrollY < window.innerHeight * 0.5) setActive(null); };
    if (!els.length) return () => io.disconnect();
    window.addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", top); };
  }, [t.nav]);

  // Posición de la píldora bajo el enlace activo.
  useEffect(() => {
    const place = () => {
      const key = pathname === "/contacto" ? "/contacto" : active;
      const a = key && navRef.current?.querySelector<HTMLElement>(`a[href="${key}"]`);
      if (!a || !navRef.current) return setPill(null);
      const base = navRef.current.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      setPill({ x: r.left - base.left, w: r.width });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, scrolled, pathname]);

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
          <Link href="/#inicio" onClick={() => setOpen(false)} className="header-logo rounded-xl bg-paper px-3 py-1.5 text-green shadow-[0_1px_2px_rgb(0_0_0/0.15)]" aria-label="D&A Lab, ir al inicio">
            <Logo className="h-7 w-auto sm:h-8" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={navRef} className="relative flex items-center gap-1 text-[15px] font-medium">
              <span
                aria-hidden
                className="nav-pill absolute inset-y-0 rounded-full bg-bone/12"
                style={{ transform: `translateX(${pill?.x ?? 0}px)`, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
              />
              {t.nav.map((item) => {
                const on = active === item.href || pathname === item.href;
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
            <a href="/contacto" className="btn btn-coral btn-shine hidden min-h-10 px-5 text-[14px] sm:inline-flex">
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
              <span aria-hidden className="burger" data-open={open || undefined}>
                <span /><span /><span />
              </span>
            </button>
          </div>

          <div ref={barRef} aria-hidden className="header-progress" />
        </div>
      </div>

      {/* Menú a pantalla completa (móvil y tablet): sobrio, tipografía mediana */}
      <div id="menu-movil" className="mobile-menu lg:hidden" data-open={open || undefined} aria-hidden={!open} inert={!open}>
        <div aria-hidden className="mm-grid" />
        <div aria-hidden className="mm-glow" />
        <nav aria-label="Principal móvil" className="wrap relative mx-auto flex h-full max-w-xl flex-col overflow-y-auto pb-6 pt-[92px]">
          <p className="mm-fade mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mist/70" style={{ ["--i" as string]: 0 }}>{t.menuLabel}</p>
          <ul className="flex flex-col">
            {t.nav.map((item, i) => {
              const on = active === item.href || pathname === item.href;
              return (
                <li key={item.href} className="mm-line border-b border-bone/10" style={{ ["--i" as string]: i }}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={on ? "true" : undefined}
                    className="mm-link group flex min-h-[54px] items-center gap-4"
                  >
                    <span className="mm-num w-6 shrink-0 font-mono text-[11px] text-mist/60" style={{ ["--i" as string]: i }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mm-mask relative block overflow-hidden">
                      <span className="mm-roll block" style={{ ["--i" as string]: i }}>
                        <span className="mm-word block font-display text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-bone">{item.label}</span>
                        <span aria-hidden className="mm-word mm-word--alt absolute left-0 top-full block font-display text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-coral-soft">{item.label}</span>
                      </span>
                    </span>
                    {on && <span aria-hidden className="size-1.5 rounded-full bg-coral" />}
                    <span aria-hidden className="mm-arrow ml-auto text-lg text-mist/70">→</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mm-fade mt-auto pt-8" style={{ ["--i" as string]: t.nav.length }}>
            <a href="/contacto" onClick={() => setOpen(false)} className="btn btn-coral w-full">
              {t.navCta} <span aria-hidden>→</span>
            </a>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-[14px] text-mist">
              <a href={whatsappLink(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-bone">
                <WhatsAppIcon className="size-4" /> {site.whatsappDisplay}
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mist/70">
                <span aria-hidden className="live-dot !mr-0 !size-1.5" /> {t.menuAvailable}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
