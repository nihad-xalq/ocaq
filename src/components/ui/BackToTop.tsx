"use client";

import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { cn } from "@/lib/cn";

type BackToTopProps = {
  label: string;
};

export function BackToTop({ label }: BackToTopProps) {
  const visible = useScrollVisibility(400);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-6 bottom-20 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-secondary shadow-md transition-all duration-300 hover:border-primary hover:text-primary cursor-pointer",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 15L12 9L18 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
