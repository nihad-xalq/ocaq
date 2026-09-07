import type { Locale } from "./config";

import type az from "@/dictionaries/az.json";

export type Dictionary = typeof az;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  az: () => import("@/dictionaries/az.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
