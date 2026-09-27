"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/es";
import { whatsappLink } from "@/lib/site";

type Field = "name" | "business" | "need";

export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const needRef = useRef<HTMLTextAreaElement>(null);

  // Los botones de "Paquetes" llevan data-plan: prellenamos el campo con el plan elegido.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-plan]");
      if (el && needRef.current && !needRef.current.value) needRef.current.value = `Paquete ${el.dataset.plan}. `;
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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

  const field = "mt-2 block w-full rounded-2xl border border-bone/25 bg-green-deep px-4 py-3.5 text-[16px] text-bone placeholder:text-mist/70 focus:border-coral-soft focus:outline-none focus-visible:outline-3 focus-visible:outline-coral";
  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 text-sm text-coral-soft">
        {t.required}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-[15px] font-semibold">{t.name}</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={errors.name || undefined} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="business" className="text-[15px] font-semibold">{t.business}</label>
        <input id="business" name="business" autoComplete="organization" placeholder={t.businessHint} className={field} aria-invalid={errors.business || undefined} aria-describedby={errors.business ? "business-error" : undefined} />
        {err("business")}
      </div>
      <div>
        <label htmlFor="need" className="text-[15px] font-semibold">{t.need}</label>
        <textarea ref={needRef} id="need" name="need" rows={4} placeholder={t.needHint} className={`${field} resize-y`} aria-invalid={errors.need || undefined} aria-describedby={errors.need ? "need-error" : undefined} />
        {err("need")}
      </div>
      <button type="submit" className="btn btn-coral w-full sm:w-auto">
        {t.submit}
      </button>
      <p className="text-sm text-mist">{t.note}</p>
    </form>
  );
}
