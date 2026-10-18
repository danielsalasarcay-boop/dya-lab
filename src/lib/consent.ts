import type { Dictionary } from "@/content/es";

// Registro de consentimientos del formulario de contacto (compartido cliente/servidor).
// El código de referencia viaja en el mensaje de WhatsApp: así cada aceptación guardada
// se puede cruzar con su conversación.

export const REF_PATTERN = /^DAL-\d{6}-[A-Z2-9]{6}$/;

export function makeRef(now = new Date()) {
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `DAL-${ymd}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

type Consent = Dictionary["contact"]["form"]["consent"];
export const consentLabel = {
  terms: (c: Consent) => `${c.termsPre} ${c.termsLink}${c.termsPost}`,
  privacy: (c: Consent) => `${c.privacyPre} ${c.privacyLink}${c.privacyPost}`,
};
