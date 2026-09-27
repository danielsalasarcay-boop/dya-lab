"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import type { Dictionary } from "@/content/es";

export function Header({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-green/95 text-bone shadow-[0_1px_0_rgb(0_0_0/0.12)] backdrop-blur-md">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-green">
        {t.skip}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-6">
        {/* Logo a color sobre placa blanca para que conserve verde y coral sobre el header verde */}
        <a href="#inicio" className="rounded-xl bg-paper px-3 py-1.5 text-green shadow-[0_1px_2px_rgb(0_0_0/0.15)]" aria-label="D&A Lab, ir al inicio">
          <Logo className="h-7 w-auto sm:h-8" />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sage transition-colors hover:text-coral-soft">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contacto" className="btn btn-coral hidden min-h-10 px-5 text-[14px] sm:inline-flex">
            {t.navCta}
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-bone/30 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-bone transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-bone transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      <nav id="menu-movil" aria-label="Principal móvil" hidden={!open} className="border-t border-bone/15 md:hidden">
        <ul className="wrap flex flex-col py-3">
          {[...t.nav, { href: "#contacto", label: t.navCta }].map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="display flex min-h-12 items-center text-[28px] text-bone hover:text-coral-soft">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
