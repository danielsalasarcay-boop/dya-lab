import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { refunds } from "@/content/legal";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { Footer } from "@/components/Footer";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: refunds.metaTitle,
  description: refunds.metaDescription,
  alternates: { canonical: "/reembolsos" },
  openGraph: { url: "/reembolsos", title: refunds.metaTitle, description: refunds.metaDescription },
};

export default function ReembolsosPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <LegalPage doc={refunds} />
      </main>
      <Footer t={t} />
    </>
  );
}
