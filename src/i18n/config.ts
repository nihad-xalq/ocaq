export const locales = ["az", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export const localeLabels: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

export const localeNames: Record<Locale, string> = {
  az: "Azərbaycan",
  en: "English",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
