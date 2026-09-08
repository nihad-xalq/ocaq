import { headers } from "next/headers";

import { defaultLocale, isLocale, localeHeader, type Locale } from "./config";

export async function getRequestLocale(): Promise<Locale> {
  const headerList = await headers();
  const value = headerList.get(localeHeader);
  if (value && isLocale(value)) return value;
  return defaultLocale;
}
