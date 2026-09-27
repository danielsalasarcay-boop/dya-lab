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
    <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-md">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:text-bone">
        {t.skip}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#inicio" className="text-green" aria-label="D&A Lab, ir al inicio">
          <Logo className="h-8 w-auto sm:h-9" />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink/80 transition-colors hover:text-green">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contacto" className="btn btn-primary hidden min-h-10 px-5 text-[14px] sm:inline-flex">
            {t.navCta}
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      <nav id="menu-movil" aria-label="Principal móvil" hidden={!open} className="border-t border-line md:hidden">
        <ul className="wrap flex flex-col py-3">
          {[...t.nav, { href: "#contacto", label: t.navCta }].map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="display flex min-h-12 items-center text-[28px] text-green">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
