"use client";

import { useEffect } from "react";

/** Keeps <html lang> in sync when the root layout sits above [lang]. */
export function DocumentLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
