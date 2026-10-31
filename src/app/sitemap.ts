import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Al añadir inglés: sumar alternates.languages por URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/nosotros`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/contacto`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];
}
