import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";
import { routes } from "@/i18n/paths";

const pages = Object.values(routes);

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();

  return locales.flatMap((locale) =>
    pages.map((segment) => ({
      url: pageUrl(origin, locale, segment),
      priority: pagePriority(segment),
      alternates: {
        languages: languageAlternates(origin, segment),
      },
    })),
  );
}

function pageUrl(origin: URL, locale: Locale, segment: string): string {
  return new URL(localePath(locale, segment ? `/${segment}` : "/"), origin)
    .href;
}

function languageAlternates(origin: URL, segment: string) {
  const languages: Record<string, string> = {
    "x-default": pageUrl(origin, defaultLocale, segment),
  };

  for (const locale of locales) {
    languages[locale] = pageUrl(origin, locale, segment);
  }

  return languages;
}

function pagePriority(segment: string): number {
  if (!segment) return 1;
  if (segment === routes.privacy || segment === routes.terms) return 0.3;
  return 0.8;
}
