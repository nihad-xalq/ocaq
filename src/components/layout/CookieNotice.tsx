"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";
import { routes } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import Link from "next/link";

const STORAGE_KEY = "ocaq.cookie-notice";
const SHOW_DELAY_MS = 2500;
const HIDE_AFTER_MS = 12000;

type CookieNoticeProps = {
  locale: Locale;
  copy: Dictionary["cookieNotice"];
  dismissLabel: string;
};

function readSeen(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

function writeSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "seen");
  } catch {
    // Private mode or blocked storage — notice still hides for this visit.
  }
}

export function CookieNotice({
  locale,
  copy,
  dismissLabel,
}: CookieNoticeProps) {
  const [open, setOpen] = useState(false);
  const pausedRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    writeSeen();
    setOpen(false);
  }, []);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const startHideTimer = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      if (pausedRef.current) return;
      dismiss();
    }, HIDE_AFTER_MS);
  }, [clearHideTimer, dismiss]);

  useEffect(() => {
    if (readSeen()) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const showTimer = window.setTimeout(
      () => setOpen(true),
      reducedMotion ? 0 : SHOW_DELAY_MS,
    );

    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!open) return;
    startHideTimer();
    return clearHideTimer;
  }, [open, startHideTimer, clearHideTimer]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "toast-in-up fixed bottom-5 left-4 right-20 z-50 rounded-xl border border-primary/25 bg-surface px-3 py-2.5 shadow-[0_16px_40px_-18px_rgba(30,37,44,0.35)]",
        "sm:right-auto sm:left-5 sm:w-max sm:max-w-[calc(100vw-2.5rem)] sm:px-4 sm:py-3",
      )}
      onMouseEnter={() => {
        pausedRef.current = true;
        clearHideTimer();
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        startHideTimer();
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
        clearHideTimer();
      }}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return;
        }
        pausedRef.current = false;
        startHideTimer();
      }}
    >
      <div className="flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-12">
        <p className="text-sm leading-relaxed text-secondary sm:whitespace-nowrap sm:leading-snug">
          {copy.before}
          <Link
            href={localePath(locale, `/${routes.privacy}`)}
            onClick={dismiss}
            className="font-medium text-primary-dark underline underline-offset-4 transition-colors hover:text-secondary"
          >
            {copy.privacyLink}
          </Link>
          {copy.after}
        </p>
        <div className="flex shrink-0 items-center justify-end gap-1">
          <Button type="button" onClick={dismiss} className="px-3 py-1 text-xs">
            {copy.ok}
          </Button>
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={dismiss}
            className="cursor-pointer rounded-md p-1 text-muted transition-colors hover:bg-primary-soft hover:text-secondary"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
