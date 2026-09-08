"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import {
  localeLabels,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
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
          "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-semibold tracking-[0.14em] text-secondary transition-colors cursor-pointer",
          "hover:border-primary/45 hover:bg-primary-soft/70",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          open && "border-primary/50 bg-primary-soft",
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
          "absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11.5rem] rounded-xl border border-border bg-surface p-1.5 shadow-[0_18px_40px_-16px_rgba(30,37,44,0.32)] transition-all duration-150 origin-top-right",
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
                "flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors",
                active
                  ? "bg-primary-soft text-secondary"
                  : "text-muted hover:bg-primary-soft/60 hover:text-secondary",
              )}
            >
              <span className="w-7 text-[11px] font-semibold tracking-[0.14em]">
                {localeLabels[code]}
              </span>
              <span className="flex-1 text-sm font-medium">
                {localeNames[code]}
              </span>
              {active ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-primary-dark"
                >
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className="w-3.5 shrink-0" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
