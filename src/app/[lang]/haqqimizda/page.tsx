import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutContent } from "@/components/about/AboutContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/haqqimizda">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.about.pageTitle,
    description: dict.about.pageSubtitle,
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/haqqimizda">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <AboutContent locale={locale} dict={dict} />;
}
