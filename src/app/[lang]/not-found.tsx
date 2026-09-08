import { MissingPage } from "@/components/missing-page/MissingPage";
import { loadMissingPage } from "@/i18n/missing-page";

export default async function LangNotFound() {
  const { locale, dict } = await loadMissingPage();
  return <MissingPage locale={locale} dict={dict} />;
}
