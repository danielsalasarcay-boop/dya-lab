# D&A Lab — sitio del estudio

Sitio de una página (Next.js 16 App Router + TypeScript + Tailwind 4) para vender diseño web e identidad visual.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Todos los textos (hero, servicios, casos, paquetes, FAQ…) | `src/content/es.ts` |
| WhatsApp, correo, dominio, redes | `src/lib/site.ts` |
| Colores y tipografías (manual de marca) | `src/app/globals.css` (`@theme`) |
| Logo (vector) | `src/components/Logo.tsx`, fuente en `brand/` |

Pendientes marcados en el código: `grep -rn "PENDIENTE\|FALTA CONTEXTO\|CONFIRMAR" src`

## Capturas de los casos

`node scripts/capture.mjs` vuelve a tomar las capturas reales de los tres sitios
(desktop 1440×900, móvil 390×844, hero con el mismo encuadre) y las guarda en WebP en `public/work/<cliente>/`.

`node scripts/og.mjs` regenera la imagen para redes (`src/app/opengraph-image.png`).

## Idiomas

Solo español. La estructura está lista para inglés: crear `src/content/en.ts` con el tipo `Dictionary`,
registrarlo en `src/content/index.ts` y mover la página a `app/[lang]/`.

## Deploy

Pensado para Vercel sin configuración extra. Definir `NEXT_PUBLIC_SITE_URL` con el dominio final.
