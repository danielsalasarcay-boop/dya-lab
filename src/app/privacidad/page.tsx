import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { privacy } from "@/content/legal";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { Footer } from "@/components/Footer";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: privacy.metaTitle,
  description: privacy.metaDescription,
  alternates: { canonical: "/privacidad" },
  openGraph: { url: "/privacidad", title: privacy.metaTitle, description: privacy.metaDescription },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <LegalPage doc={privacy} />
      </main>
      <Footer t={t} />
    </>
  );
}
