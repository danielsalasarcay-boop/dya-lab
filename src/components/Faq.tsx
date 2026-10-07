"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";
import { Eyebrow } from "./Eyebrow";
import { WhatsAppIcon } from "./WhatsAppIcon";

// FAQ en tarjetas: la respuesta corta se ve sin abrir nada; el detalle se
// despliega con una animación de altura (grid 0fr → 1fr). Una abierta a la vez.
export function Faq({ t }: { t: Dictionary }) {
  const f = t.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="svc-bg py-10 sm:py-12">
      {/* CONFIRMAR: cada respuesta en src/content/es.ts (faq) */}
      <div className="wrap">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow n="06">{f.eyebrow}</Eyebrow>
            <h2 id="preguntas-titulo" className="h2 mt-5 max-w-[18ch] text-green">{f.title}</h2>
          </div>
          <p className="max-w-[24rem] text-muted">{f.lead}</p>
        </div>

        <ul className="mt-10 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`faq-card ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="text-[16px] font-semibold leading-snug text-ink sm:text-[17px]">
                      <span className="mr-2 font-mono text-[11px] font-medium tracking-[0.1em] text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {item.q}
                    </span>
                    <span className="faq-short font-display text-[21px] font-extrabold leading-tight tracking-[-0.02em] text-coral-ink sm:text-[23px]">
                      {item.short}
                    </span>
                  </span>
                  <span aria-hidden className="faq-plus mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-green">
                    <span className="relative block size-3">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 bg-current" />
                      <span className="faq-plus-v absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 bg-current" />
                    </span>
                  </span>
                </button>
                <div id={`faq-${i}`} role="region" aria-label={item.q} className="faq-body">
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6 sm:pb-6">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}

          {/* Tarjeta final: otra pregunta → WhatsApp */}
          <li className="flex flex-col justify-between gap-5 rounded-3xl bg-green p-5 text-bone sm:col-span-2 sm:flex-row sm:items-center sm:p-6 lg:col-span-3">
            <div>
              <p className="font-display text-[22px] font-extrabold tracking-[-0.02em]">{f.askTitle}</p>
              <p className="mt-1 text-mist">{f.askLead}</p>
            </div>
            <a href={whatsappLink(f.askMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-coral btn-shine shrink-0">
              <WhatsAppIcon className="size-5" /> {f.askCta}
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
