import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.contact.metaTitle,
  description: t.contact.metaDescription,
  alternates: { canonical: "/contacto" },
  openGraph: { url: "/contacto", title: t.contact.metaTitle, description: t.contact.metaDescription },
};

export default function ContactoPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <WhatsAppFloat label={t.contact.floating} message={t.contact.whatsappGreeting} hover={t.contact.floatHover} />
    </>
  );
}
