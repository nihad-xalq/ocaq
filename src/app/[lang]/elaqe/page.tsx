import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactContent } from "@/components/contact/ContactContent";
import { localePageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/paths";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/elaqe">): Promise<Metadata> {
  const { lang } = await params;
  return localePageMetadata(lang, routes.contact, (dict) => ({
    title: dict.contact.title,
    description: dict.contact.pageDescription,
  }));
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/elaqe">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <ContactContent locale={locale} dict={dict} />;
}
