import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocumentLang } from "@/components/layout/DocumentLang";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.meta.title,
      template: `%s · Ocaq`,
    },
    description: dict.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <DocumentLang lang={locale} />
      <ToastProvider dismissLabel={dict.common.dismiss}>
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppWidget
          label={dict.nav.whatsapp}
          messages={dict.whatsappMessages}
        />
        <BackToTop label={dict.common.backToTop} />
      </ToastProvider>
    </>
  );
}
