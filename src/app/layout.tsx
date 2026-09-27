import type { Metadata, Viewport } from "next";
import { Montserrat, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import "./globals.css";

// Montserrat = tipografía del logo (manual de marca). Texto corrido en Instrument Sans.
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["600", "700", "800"], display: "swap" });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], display: "swap" });
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

// Muestra la pantalla de carga una sola vez por sesión. Corre antes de pintar.
const loaderOnce = `try{var k="dal-loader";if(sessionStorage.getItem(k))document.documentElement.classList.add("no-loader");else sessionStorage.setItem(k,"1")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${montserrat.variable} ${instrument.variable} ${jetbrains.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderOnce }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
