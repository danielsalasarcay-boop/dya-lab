// Versión y ruta de cada documento legal, sin sus textos: el formulario de contacto
// (cliente) solo necesita esto, así no carga los documentos completos en el navegador.
// Al cambiar el texto de un documento en legal.ts, sube aquí su versión (fecha AAAA-MM-DD;
// si cambia dos veces el mismo día, se añade .2, .3…).
export const legalMeta = {
  terms: { path: "/terminos", version: "2026-10-25.4" },
  privacy: { path: "/privacidad", version: "2026-10-25.2" },
  cookies: { path: "/cookies", version: "2026-10-18" },
} as const;
