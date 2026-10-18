// Consulta el registro de consentimientos del formulario de contacto (Vercel Blob privado).
//   node --env-file=.env.local scripts/consentimientos.mjs              → lista todos (fecha, ref, nombre, negocio)
//   node --env-file=.env.local scripts/consentimientos.mjs DAL-261018-…  → registro completo de esa referencia
// Si falta .env.local: `npx vercel@latest env pull .env.local`.
import { get, list } from "@vercel/blob";

const ref = process.argv[2];
const read = async (pathname) => {
  const { stream } = await get(pathname, { access: "private", useCache: false });
  return JSON.parse(await new Response(stream).text());
};

let cursor;
const blobs = [];
do {
  const page = await list({ prefix: "consentimientos/", cursor });
  blobs.push(...page.blobs);
  cursor = page.cursor;
} while (cursor);

if (ref) {
  const hit = blobs.find((b) => b.pathname.endsWith(`/${ref}.json`));
  if (!hit) { console.error(`No hay registro con la referencia ${ref}`); process.exit(1); }
  console.log(JSON.stringify(await read(hit.pathname), null, 2));
} else {
  console.log("fecha (UTC);referencia;nombre;negocio;términos;privacidad;ip");
  for (const b of blobs) {
    const r = await read(b.pathname);
    console.log([r.acceptedAt, r.ref, r.person.name, r.person.business, r.terms.version, r.privacy.version, r.ip].join(";"));
  }
  console.error(`${blobs.length} registro(s)`);
}
