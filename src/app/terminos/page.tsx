import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { terms } from "@/content/legal";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { Footer } from "@/components/Footer";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.metaDescription,
  alternates: { canonical: "/terminos" },
  openGraph: { url: "/terminos", title: terms.metaTitle, description: terms.metaDescription },
};

export default function TerminosPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <LegalPage doc={terms} />
      </main>
      <Footer t={t} />
    </>
  );
}
