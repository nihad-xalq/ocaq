import type { Metadata } from "next";

import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { getRequestLocale } from "@/i18n/request-locale";

export async function loadMissingPage(lang?: string) {
  const locale: Locale = lang && isLocale(lang) ? lang : await getRequestLocale();
  const dict = await getDictionary(locale);
  return { locale, dict };
}

export async function missingPageMetadata(lang?: string): Promise<Metadata> {
  const { dict } = await loadMissingPage(lang);
  return { title: dict.notFound.title };
}
