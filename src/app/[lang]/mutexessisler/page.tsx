import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { specialists } from "@/data/specialists";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/mutexessisler">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.specialists.pageTitle,
    description: dict.specialists.pageSubtitle,
  };
}

export default async function SpecialistsPage({
  params,
}: PageProps<"/[lang]/mutexessisler">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <Container className="py-16 sm:py-24">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
            {dict.specialists.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {dict.specialists.pageSubtitle}
          </p>
        </div>
      </FadeIn>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {specialists.map((specialist, index) => (
          <FadeIn key={specialist.id} delay={index * 60} className="h-full">
            <SpecialistCard
              specialist={specialist}
              dict={dict}
              className="h-full"
            />
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}
