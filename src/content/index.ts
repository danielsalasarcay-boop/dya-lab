import { es, type Dictionary } from "./es";

// Solo español por ahora. Para inglés: import { en } from "./en" y añadirlo aquí,
// luego mover app/page.tsx a app/[lang]/page.tsx con generateStaticParams.
export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
