// Iconos lineales 24x24 (trazo, sin relleno) para el footer. Siguen el estilo de PhoneIcon.
type P = { className?: string };
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function InstagramIcon({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.5v.01M11.5 16v-5.5M11.5 13a2.5 2.5 0 0 1 5 0v3" />
    </svg>
  );
}

export function BehanceIcon({ className = "size-6" }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3 6.5h5a2.75 2.75 0 0 1 0 5.5H3zM3 12h5.75a2.75 2.75 0 0 1 0 5.5H3zM14.5 7.5h5M14 14.25h7a3.5 3.5 0 1 0-1 2.5" />
    </svg>
  );
}
