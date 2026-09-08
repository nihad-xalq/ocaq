import type { Metadata } from "next";

import { DocumentLang } from "@/components/layout/DocumentLang";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MissingPage } from "@/components/missing-page/MissingPage";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { loadMissingPage, missingPageMetadata } from "@/i18n/missing-page";

export async function generateMetadata(): Promise<Metadata> {
  return missingPageMetadata();
}

export default async function RootNotFound() {
  const { locale, dict } = await loadMissingPage();

  return (
    <>
      <DocumentLang lang={locale} />
      <Header locale={locale} dict={dict} />
      <main className="flex flex-1 flex-col">
        <MissingPage locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppWidget
        label={dict.nav.whatsapp}
        messages={dict.whatsappMessages}
      />
      <BackToTop label={dict.common.backToTop} />
    </>
  );
}
