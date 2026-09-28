import type { Dictionary } from "@/content/es";
import { Logo } from "./Logo";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="bg-green-deep pb-24 pt-14 text-bone">
      <div className="wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo mono className="h-10 w-auto text-bone" />
          <p className="mt-4 max-w-xs text-mist">{t.footer.tagline}</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 text-[15px] text-mist">
            {t.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-11 items-center hover:text-bone">{n.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-mist">
            © {new Date().getFullYear()} D&amp;A Lab. {t.footer.rights}
          </p>
        </nav>
      </div>
    </footer>
  );
}
