import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Fijo solo en móvil, donde es la vía de contacto natural.
export function WhatsAppFloat({ label }: { label: string }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (se abre en una pestaña nueva)`}
      className="fixed bottom-4 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-[0_12px_30px_-8px_rgb(20_38_27/0.55)] transition-transform active:scale-95 md:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
