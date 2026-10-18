"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";
import { legalMeta } from "@/content/legal-meta";
import { makeRef } from "@/lib/consent";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Field = "name" | "business" | "need" | "acceptTerms" | "acceptPrivacy";

export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const needRef = useRef<HTMLTextAreaElement>(null);

  // Los botones de "Paquetes" llevan a /contacto?plan=…: prellenamos el campo con el plan elegido.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan && needRef.current && !needRef.current.value) needRef.current.value = `Paquete ${plan}. `;
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      business: String(data.get("business") ?? "").trim(),
      need: String(data.get("need") ?? "").trim(),
    };
    const acceptTerms = data.get("acceptTerms") === "on";
    const acceptPrivacy = data.get("acceptPrivacy") === "on";
    const nextErrors = { name: !values.name, business: !values.business, need: !values.need, acceptTerms: !acceptTerms, acceptPrivacy: !acceptPrivacy };
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[]).find((k) => nextErrors[k]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Prueba de aceptación: se envía en segundo plano (keepalive) para no frenar la
    // apertura de WhatsApp; el código de referencia va en el mensaje para poder cruzarlos.
    const ref = makeRef();
    fetch("/api/consentimiento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ref,
        name: values.name,
        business: values.business,
        acceptTerms,
        acceptPrivacy,
        termsVersion: legalMeta.terms.version,
        privacyVersion: legalMeta.privacy.version,
        page: window.location.pathname + window.location.search,
      }),
    }).catch(() => {});
    const message = t.message.replace("{name}", values.name).replace("{business}", values.business).replace("{need}", values.need).replace("{ref}", ref);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const field = "mt-1.5 block w-full rounded-xl border border-bone/25 bg-green-deep px-3.5 py-2.5 text-[16px] text-bone placeholder:text-mist/70 focus:border-coral-soft focus:outline-none focus-visible:outline-3 focus-visible:outline-coral";
  const label = "text-[13px] font-semibold";
  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-1 text-[13px] text-coral-soft">
        {f === "acceptTerms" ? t.consent.termsRequired : f === "acceptPrivacy" ? t.consent.privacyRequired : t.required}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>{t.name}</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={errors.name || undefined} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="business" className={label}>{t.business}</label>
        <input id="business" name="business" autoComplete="organization" placeholder={t.businessHint} className={field} aria-invalid={errors.business || undefined} aria-describedby={errors.business ? "business-error" : undefined} />
        {err("business")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="need" className={label}>{t.need}</label>
        <textarea ref={needRef} id="need" name="need" rows={2} placeholder={t.needHint} className={`${field} resize-y`} aria-invalid={errors.need || undefined} aria-describedby={errors.need ? "need-error" : undefined} />
        {err("need")}
      </div>
      {/* Dos casillas separadas, sin marcar por defecto, cada una con su documento */}
      <div className="grid gap-2 sm:col-span-2">
        {([
          ["acceptTerms", t.consent.termsPre, t.consent.termsLink, t.consent.termsPost, legalMeta.terms.path],
          ["acceptPrivacy", t.consent.privacyPre, t.consent.privacyLink, t.consent.privacyPost, legalMeta.privacy.path],
        ] as const).map(([id, pre, link, post, href]) => (
          <div key={id}>
            <div className="flex items-start gap-2.5">
              <input
                id={id}
                name={id}
                type="checkbox"
                className="consent-box mt-0.5"
                aria-invalid={errors[id] || undefined}
                aria-describedby={errors[id] ? `${id}-error` : undefined}
              />
              <label htmlFor={id} className="text-[14px] leading-snug text-mist">
                {pre}{" "}
                <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone underline decoration-coral underline-offset-2 hover:text-coral-soft">
                  {link}
                </a>
                {post}
              </label>
            </div>
            {err(id)}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
        {/* Mismo botón que "Quiero este" y "Tu proyecto": círculo que llena el botón y flecha que gira */}
        <button type="submit" className="plan-cta plan-cta--coral contact-cta shrink-0 whitespace-nowrap">
          <span className="plan-cta-fill" aria-hidden />
          <span className="plan-cta-label flex items-center gap-2"><WhatsAppIcon className="size-4" /> {t.submit}</span>
          <span aria-hidden className="plan-cta-arrow">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </span>
        </button>
        <p className="text-[13px] text-mist">{t.note}</p>
      </div>
    </form>
  );
}
