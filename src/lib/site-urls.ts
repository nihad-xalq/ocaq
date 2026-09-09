import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { getSiteUrl } from "@/data/site";

/** Locale-aware pathname, e.g. `/kitabxana` or `/en/kitabxana`. */
export function pagePath(locale: Locale, segment = ""): string {
  return localePath(locale, segment ? `/${segment}` : "/");
}

export function pageUrl(
  locale: Locale,
  segment = "",
  origin = getSiteUrl(),
): string {
  return new URL(pagePath(locale, segment), origin).href;
}

/** Relative hreflang map for Next.js `metadata.alternates.languages`. */
export function languageAlternatePaths(segment = ""): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": pagePath(defaultLocale, segment),
  };

  for (const locale of locales) {
    languages[locale] = pagePath(locale, segment);
  }

  return languages;
}

/** Absolute hreflang map for sitemap XML. */
export function languageAlternateUrls(
  segment = "",
  origin = getSiteUrl(),
): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": pageUrl(defaultLocale, segment, origin),
  };

  for (const locale of locales) {
    languages[locale] = pageUrl(locale, segment, origin);
  }

  return languages;
}
