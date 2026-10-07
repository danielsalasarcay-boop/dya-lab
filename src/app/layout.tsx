import type { Metadata, Viewport } from "next";
import { Montserrat, Familjen_Grotesk, JetBrains_Mono, Fraunces, Young_Serif } from "next/font/google";
import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import "./globals.css";

// Montserrat = tipografía del logo (manual de marca). Texto corrido en Familjen Grotesk.
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
// Texto corrido: Familjen Grotesk (grotesca con cortes en ángulo, eco de los corchetes del logo).
const familjen = Familjen_Grotesk({ variable: "--font-familjen", subsets: ["latin"], display: "swap" });
// Serif editorial para el párrafo de la portada.
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
// Párrafo bajo el titular: serif con personalidad (no la típica de plantillas IA).
const youngSerif = Young_Serif({ variable: "--font-young", subsets: ["latin"], weight: "400", display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500"], display: "swap" });

const t = getDictionary("es");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
    title: t.meta.title,
    description: t.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.title,
    description: t.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f4d38",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${montserrat.variable} ${familjen.variable} ${jetbrains.variable} ${fraunces.variable} ${youngSerif.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Orden de las ventanas del hero: rota en cada visita, antes de pintar */}
        <script dangerouslySetInnerHTML={{ __html: `try{var n=(+localStorage.getItem("dal-hero-turn")||0)+1;localStorage.setItem("dal-hero-turn",n);document.documentElement.dataset.heroTurn=n%3}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
