import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { cookies } from "@/content/legal";
import { Header } from "@/components/Header";
import { LegalPage } from "@/components/LegalPage";
import { Footer } from "@/components/Footer";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: cookies.metaTitle,
  description: cookies.metaDescription,
  alternates: { canonical: "/cookies" },
  openGraph: { url: "/cookies", title: cookies.metaTitle, description: cookies.metaDescription },
};

export default function CookiesPage() {
  return (
    <>
      <Header t={t} />
      <main id="contenido">
        <LegalPage doc={cookies} />
      </main>
      <Footer t={t} />
    </>
  );
}
