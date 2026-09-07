"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { localeLabels, locales, type Locale } from "@/i18n/config";
import { localePath, stripLocaleFromPathname } from "@/i18n/locale-path";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const { pathname: barePath } = stripLocaleFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-semibold tracking-wide text-secondary transition-colors",
          "hover:border-primary/50 hover:bg-primary-soft/40",
          open && "border-primary/50 bg-primary-soft/40",
        )}
      >
        <span>{localeLabels[locale]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn(
            "text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="listbox"
        aria-label={label}
        className={cn(
          "absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[7.5rem] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-[0_12px_30px_-18px_rgba(43,33,24,0.45)] transition-all duration-150 origin-top-right",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
      >
        {locales.map((code) => {
          const active = code === locale;

          return (
            <Link
              key={code}
              href={localePath(code, barePath)}
              hrefLang={code}
              role="option"
              aria-selected={active}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2 text-xs font-semibold tracking-wide transition-colors",
                active
                  ? "bg-primary-soft text-secondary"
                  : "text-muted hover:bg-primary-soft/50 hover:text-secondary",
              )}
            >
              <span>{localeLabels[code]}</span>
              {active ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="text-primary-dark"
                >
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
