import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Botón flotante de WhatsApp, fijo en todas las pantallas.
export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (se abre en una pestaña nueva)`}
      className="fixed bottom-4 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full border-2 border-bone bg-[#1f7a4d] text-white shadow-[0_12px_30px_-8px_rgb(20_38_27/0.55)] transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6 md:size-16"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
