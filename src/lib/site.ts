// Datos de contacto y de dominio. Todo lo marcado PENDIENTE lo completa el dueño.

export const site = {
  name: "D&A Lab",
  // PENDIENTE: dominio definitivo. Se puede sobreescribir con NEXT_PUBLIC_SITE_URL en Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dyalab.vercel.app",
  // PENDIENTE: número de WhatsApp en formato internacional sin "+" ni espacios (ej. 58414XXXXXXX).
  whatsapp: "580000000000",
  // PENDIENTE: correo de contacto.
  email: "hola@tu-dominio.com",
  locale: "es_VE",
  // PENDIENTE: perfiles públicos del estudio (Instagram, LinkedIn…). Se usan en JSON-LD.
  sameAs: [] as string[],
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
