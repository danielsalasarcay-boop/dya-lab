"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";

type Field = "name" | "business" | "need";

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
    const nextErrors = { name: !values.name, business: !values.business, need: !values.need };
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[]).find((k) => nextErrors[k]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const message = t.message.replace("{name}", values.name).replace("{business}", values.business).replace("{need}", values.need);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const field = "mt-1.5 block w-full rounded-xl border border-bone/25 bg-green-deep px-3.5 py-2.5 text-[16px] text-bone placeholder:text-mist/70 focus:border-coral-soft focus:outline-none focus-visible:outline-3 focus-visible:outline-coral";
  const label = "text-[13px] font-semibold";
  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-1 text-[13px] text-coral-soft">
        {t.required}
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
      <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className="btn btn-coral min-h-11 w-full shrink-0 whitespace-nowrap sm:w-auto">
          {t.submit}
        </button>
        <p className="text-[13px] text-mist">
          {t.note} <a href="/privacidad" className="underline underline-offset-2 hover:text-bone">{t.privacyLink}</a>.
        </p>
      </div>
    </form>
  );
}
