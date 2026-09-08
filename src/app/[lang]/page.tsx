import { ContactCta } from "@/components/home/ContactCta";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { LibraryPreview } from "@/components/home/LibraryPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SpecialistsPreview } from "@/components/home/SpecialistsPreview";
import { WorksPreview } from "@/components/home/WorksPreview";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <ServicesSection dict={dict} />
      <SpecialistsPreview locale={locale} dict={dict} />
      <LibraryPreview locale={locale} dict={dict} />
      <WorksPreview locale={locale} dict={dict} />
      <FaqSection dict={dict} />
      <ContactCta dict={dict} />
    </>
  );
}
