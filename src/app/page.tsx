import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Motion } from "@/components/Motion";
import { Process } from "@/components/Process";
import { Plans } from "@/components/Plans";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  const t = getDictionary("es");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description: t.meta.description,
        email: site.email,
        areaServed: "VE",
        knowsAbout: ["Diseño web", "Desarrollo web", "Identidad visual", "Diseño de logos"],
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
      },
      {
        "@type": "ItemList",
        name: t.work.title,
        itemListElement: t.work.cases.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: `Sitio web de ${c.name}`,
            url: c.url,
            description: c.summary,
            genre: c.tags.join(", "),
            image: `${site.url}/work/${c.slug}/${c.slug}-hero.webp`,
            creator: { "@id": `${site.url}/#organization` },
            about: { "@type": "Organization", name: c.name, url: c.url },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Loader />
      <Header t={t} />
      <main id="contenido">
        <Hero t={t} />
        <Services t={t} />
        <Work t={t} />
        <Motion t={t} />
        <Process t={t} />
        <Plans t={t} />
        <Faq t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <WhatsAppFloat label={t.contact.floating} message={t.contact.whatsappGreeting} hover={t.contact.floatHover} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
