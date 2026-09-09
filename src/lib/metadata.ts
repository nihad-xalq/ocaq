import type { Metadata } from "next";

import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
import { languageAlternatePaths, pagePath } from "@/lib/site-urls";
import { isLocale, locales, openGraphLocales, type Locale } from "@/i18n/config";
import { ogImageSize, site } from "@/data/site";

type PageMetaInput = {
  locale: Locale;
  segment?: string;
  title: string;
  description: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

/** Canonical, hreflang, Open Graph, and Twitter tags for one localized page. */
export function pageMetadata({
  locale,
  segment = "",
  title,
  description,
  imageAlt = site.name,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const path = pagePath(locale, segment);
  const ogImage = {
    url: site.ogImage,
    width: ogImageSize.width,
    height: ogImageSize.height,
    alt: imageAlt,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternatePaths(segment),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => openGraphLocales[code]),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function localePageMetadata(
  lang: string,
  segment: string,
  pick: (dict: Dictionary) => { title: string; description: string },
  options?: { absoluteTitle?: boolean },
): Promise<Metadata> {
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = pick(dict);
  return pageMetadata({
    locale: lang,
    segment,
    title,
    description,
    imageAlt: dict.hero.imageAlt,
    absoluteTitle: options?.absoluteTitle,
  });
}
