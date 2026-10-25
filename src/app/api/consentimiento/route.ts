import { createHash } from "node:crypto";
import { head, put } from "@vercel/blob";
import { getDictionary } from "@/content";
import { privacy, terms, type LegalDoc } from "@/content/legal";
import { REF_PATTERN, consentLabel } from "@/lib/consent";

// Guarda una prueba de aceptación por cada envío del formulario de contacto, en el
// almacenamiento privado de Vercel Blob "dya-lab-consentimientos":
//   consentimientos/AAAA/MM/<ref>.json
// Los textos de las casillas y la huella de cada documento salen del servidor, no del
// navegador, para que el registro refleje exactamente lo que se mostró.

const form = getDictionary("es").contact.form;
const fingerprint = (doc: LegalDoc) => createHash("sha256").update(JSON.stringify(doc)).digest("hex");
const text = (v: unknown, max: number) => (typeof v === "string" && v.trim() && v.length <= max ? v.trim() : null);

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 2000) return Response.json({ ok: false }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const ref = typeof body.ref === "string" && REF_PATTERN.test(body.ref) ? body.ref : null;
  const name = text(body.name, 120);
  const business = text(body.business, 160);
  if (!ref || !name || !business || body.acceptTerms !== true || body.acceptPrivacy !== true) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const now = new Date();
  const doc = (d: LegalDoc, shown: unknown) => ({
    document: d.title,
    url: d.path,
    version: typeof shown === "string" ? shown.slice(0, 20) : null,
    // Solo si la versión que vio la persona es la publicada ahora se puede afirmar su huella.
    sha256: shown === d.version ? fingerprint(d) : null,
  });

  const record = {
    ref,
    acceptedAt: now.toISOString(),
    method: "Formulario /contacto: dos casillas separadas, sin marcar por defecto, marcadas por la persona antes de pulsar \"Enviar por WhatsApp\".",
    person: { name, business },
    terms: { accepted: true, label: consentLabel.terms(form.consent), ...doc(terms, body.termsVersion) },
    privacy: { accepted: true, label: consentLabel.privacy(form.consent), ...doc(privacy, body.privacyVersion) },
    page: text(body.page, 300),
    ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? request.headers.get("x-real-ip"),
    userAgent: request.headers.get("user-agent")?.slice(0, 400) ?? null,
    deployment: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  };

  const month = now.toISOString().slice(0, 7).replace("-", "/");
  const pathname = `consentimientos/${month}/${ref}.json`;
  try {
    await put(pathname, JSON.stringify(record, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    });
  } catch (error) {
    // Reintento del navegador después de un guardado que sí llegó: el registro ya existe.
    if (await head(pathname).then(() => true, () => false)) return Response.json({ ok: true, ref });
    console.error("[consentimiento] no se pudo guardar", ref, error);
    return Response.json({ ok: false }, { status: 500 });
  }
  return Response.json({ ok: true, ref });
}
