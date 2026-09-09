import {
  isLocale,
  locales,
  openGraphLocales,
  type Locale,
} from "@/i18n/config";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { DocumentLang } from "@/components/layout/DocumentLang";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { BackToTop } from "@/components/ui/BackToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ogImageSize, site } from "@/data/site";
import { siteJsonLd } from "@/lib/json-ld";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const ogImage = {
    url: site.ogImage,
    width: ogImageSize.width,
    height: ogImageSize.height,
    alt: dict.hero.imageAlt,
  };

  return {
    title: {
      default: dict.meta.title,
      template: `%s · Ocaq`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: openGraphLocales[lang],
      alternateLocale: locales
        .filter((code) => code !== lang)
        .map((code) => openGraphLocales[code]),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage],
    },
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
      <JsonLd data={siteJsonLd(locale, dict.meta.description)} />
      <ToastProvider dismissLabel={dict.common.dismiss}>
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppWidget
          label={dict.nav.whatsapp}
          messages={dict.whatsappMessages}
        />
        <BackToTop label={dict.common.backToTop} />
        <CookieNotice
          locale={locale}
          copy={dict.cookieNotice}
          dismissLabel={dict.common.dismiss}
        />
      </ToastProvider>
    </>
  );
}
