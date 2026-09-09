import { ContactCta } from "@/components/home/ContactCta";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { LibraryPreview } from "@/components/home/LibraryPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SpecialistsPreview } from "@/components/home/SpecialistsPreview";
import { WorksPreview } from "@/components/home/WorksPreview";
import { localePageMetadata } from "@/lib/metadata";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/json-ld";
import { routes } from "@/i18n/paths";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return localePageMetadata(
    lang,
    routes.home,
    (dict) => ({
      title: dict.meta.title,
      description: dict.meta.description,
    }),
    { absoluteTitle: true },
  );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(dict)} />
      <Hero locale={locale} dict={dict} />
      <AboutPreview locale={locale} dict={dict} />
      <ServicesSection dict={dict} />
      <SpecialistsPreview locale={locale} dict={dict} />
      <LibraryPreview locale={locale} dict={dict} />
      <WorksPreview locale={locale} dict={dict} />
      <FaqSection dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
