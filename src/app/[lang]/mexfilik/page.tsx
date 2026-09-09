import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/legal/LegalPage";
import { localePageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/paths";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/mexfilik">): Promise<Metadata> {
  const { lang } = await params;
  return localePageMetadata(lang, routes.privacy, (dict) => ({
    title: dict.privacy.title,
    description: dict.privacy.description,
  }));
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/mexfilik">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <LegalPage copy={dict.privacy} />;
}
