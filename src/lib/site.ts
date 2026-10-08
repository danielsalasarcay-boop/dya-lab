// Datos de contacto y de dominio. Todo lo marcado PENDIENTE lo completa el dueño.

export const site = {
  name: "D&A Lab",
  // PENDIENTE: dominio definitivo. Se puede sobreescribir con NEXT_PUBLIC_SITE_URL en Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dya-lab.vercel.app",
  // WhatsApp del estudio: +58 412 970 2711 (formato internacional sin "+" ni espacios).
  whatsapp: "584129702711",
  whatsappDisplay: "+58 412 970 2711",
  // Teléfono para llamadas (distinto al WhatsApp, que siempre va al número de arriba).
  phone: "+584123030332",
  phoneDisplay: "+58 412 303 0332",
  // PENDIENTE: correo de contacto.
  email: "hola@tu-dominio.com",
  locale: "es_VE",
  // PENDIENTE: URLs de los perfiles del estudio. Mientras estén vacías, el icono
  // del footer apunta a "#". Las que tengan URL se usan también en el JSON-LD.
  social: {
    instagram: "",
    linkedin: "",
    behance: "",
  },
} as const;

export const sameAs = Object.values(site.social).filter(Boolean);

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
