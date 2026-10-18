// Versión y ruta de cada documento legal, sin sus textos: el formulario de contacto
// (cliente) solo necesita esto, así no carga los documentos completos en el navegador.
// Al cambiar el texto de un documento en legal.ts, sube aquí su versión.
export const legalMeta = {
  terms: { path: "/terminos", version: "2026-10-18" },
  privacy: { path: "/privacidad", version: "2026-10-18" },
  cookies: { path: "/cookies", version: "2026-10-18" },
  refunds: { path: "/reembolsos", version: "2026-10-18" },
} as const;
