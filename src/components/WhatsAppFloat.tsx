import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Botón flotante de WhatsApp con efectos: entrada con rebote, ondas que salen
// del botón, "timbre" del ícono, globito "¿Hablamos?" que aparece y se va, y en
// desktop se estira al pasar el cursor mostrando el texto. Solo CSS.
export function WhatsAppFloat({ label, message, hover, bubble }: { label: string; message: string; hover: string; bubble: string }) {
  return (
    <div className="wa-float fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
      <p aria-hidden className="wa-bubble">{bubble}</p>
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (se abre en una pestaña nueva)`}
        className="wa-btn group relative flex h-14 items-center rounded-full border-2 border-bone bg-[#1f7a4d] text-white md:h-16"
      >
        <span aria-hidden className="wa-wave" />
        <span aria-hidden className="wa-wave wa-wave--2" />
        <span aria-hidden className="wa-label">{hover}</span>
        <span className="wa-icon grid size-[52px] shrink-0 place-items-center md:size-[60px]">
          <WhatsAppIcon className="size-7" />
        </span>
      </a>
    </div>
  );
}
