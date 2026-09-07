import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Build a public URL for a locale.
 * Default locale (az) has no prefix: /kitabxana
 * Other locales keep the prefix: /en/kitabxana
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = normalizePath(path);

  if (locale === defaultLocale) {
    return normalized;
  }

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}

/** Strip /az|/en|/ru from a pathname and return the bare path + detected locale. */
export function stripLocaleFromPathname(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = `/${segments.slice(1).join("/")}`;
    return {
      locale: maybeLocale,
      pathname: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/",
    };
  }

  return {
    locale: defaultLocale,
    pathname: pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/",
  };
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/$/, "") || "/";
}
