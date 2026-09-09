import { WorkCard } from "@/components/works/WorkCard";
import { localePageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { FadeIn } from "@/components/ui/FadeIn";
import { notFound } from "next/navigation";
import { routes } from "@/i18n/paths";
import type { Metadata } from "next";
import { works } from "@/data/works";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/islerimiz">): Promise<Metadata> {
  const { lang } = await params;
  return localePageMetadata(lang, routes.works, (dict) => ({
    title: dict.works.pageTitle,
    description: dict.works.pageDescription,
  }));
}

export default async function WorksPage({
  params,
}: PageProps<"/[lang]/islerimiz">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <Container className="py-16 sm:py-24">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
            {dict.works.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-muted">{dict.works.pageSubtitle}</p>
        </div>
      </FadeIn>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work, index) => (
          <FadeIn key={work.id} delay={index * 60} className="h-full">
            <WorkCard work={work} dict={dict} className="h-full" />
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}
