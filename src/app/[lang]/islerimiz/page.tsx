import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WorkCard } from "@/components/works/WorkCard";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { works } from "@/data/works";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/islerimiz">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.works.pageTitle,
    description: dict.works.pageSubtitle,
  };
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
