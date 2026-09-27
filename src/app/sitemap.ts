import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Al añadir inglés: sumar alternates.languages por URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
