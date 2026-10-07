import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.about.metaTitle,
  description: t.about.metaDescription,
  alternates: { canonical: "/nosotros" },
  openGraph: { url: "/nosotros", title: t.about.metaTitle, description: t.about.metaDescription },
};

export default function NosotrosPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <About t={t} />
      </main>
      <Footer t={t} />
      <WhatsAppFloat label={t.contact.floating} message={t.contact.whatsappGreeting} hover={t.contact.floatHover} />
    </>
  );
}
