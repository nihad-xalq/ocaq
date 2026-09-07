import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookCard } from "@/components/library/BookCard";
import { Container } from "@/components/ui/Container";
import { books } from "@/data/books";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kitabxana">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.library.pageTitle,
    description: dict.library.pageSubtitle,
  };
}

export default async function LibraryPage({
  params,
}: PageProps<"/[lang]/kitabxana">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
          {dict.library.pageTitle}
        </h1>
        <p className="mt-4 text-lg text-muted">{dict.library.pageSubtitle}</p>
      </div>
      <div className="mt-12 space-y-10">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            dict={dict}
            showDownload
          />
        ))}
      </div>
    </Container>
  );
}
