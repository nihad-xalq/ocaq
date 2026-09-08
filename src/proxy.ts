import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, localeHeader, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Never show /az in the URL — redirect to the unprefixed path.
  if (first === defaultLocale) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url);
  }

  // Prefixed locales pass through.
  if (first && locales.includes(first as (typeof locales)[number])) {
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, first) },
    });
  }

  // Unprefixed paths rewrite internally to /az/...
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url, {
    request: { headers: withLocaleHeader(request, defaultLocale) },
  });
}

function withLocaleHeader(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeader, locale);
  return requestHeaders;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
