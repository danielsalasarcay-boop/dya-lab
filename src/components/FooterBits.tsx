"use client";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex min-h-11 items-center gap-2 shrink-0 justify-center rounded-full border border-bone/20 px-4 max-sm:size-11 max-sm:px-0 text-[14px] text-mist transition-colors hover:border-coral hover:text-bone"
    >
      <span className="sr-only sm:not-sr-only">{label}</span>
      <span aria-hidden className="transition-transform group-hover:-translate-y-0.5">↑</span>
    </button>
  );
}
