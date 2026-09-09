import { MissingPage } from "@/components/missing-page/MissingPage";
import { loadMissingPage, missingPageMetadata } from "@/i18n/missing-page";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return missingPageMetadata();
}

export default async function LangNotFound() {
  const { locale, dict } = await loadMissingPage();
  return <MissingPage locale={locale} dict={dict} />;
}
