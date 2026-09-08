import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookCard } from "@/components/library/BookCard";
import { books, booksPreviewCount } from "@/data/books";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

type LibraryPreviewProps = {
  locale: Locale;
  dict: Dictionary;
};

export function LibraryPreview({ locale, dict }: LibraryPreviewProps) {
  const items = books.slice(0, booksPreviewCount);

  return (
    <Container as="section" className="py-20 sm:py-24">
      <FadeIn>
        <SectionHeading
          title={dict.library.title}
          subtitle={dict.library.subtitle}
          action={
            <Button
              href={localePath(locale, `/${routes.library}`)}
              variant="ghost"
            >
              {dict.library.seeAll}
            </Button>
          }
        />
      </FadeIn>
      <div className="space-y-8">
        {items.map((book, index) => (
          <FadeIn key={book.id} delay={index * 60}>
            <BookCard book={book} dict={dict} showDownload />
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}
