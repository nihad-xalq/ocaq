import { BookCover } from "@/components/library/BookCover";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Book } from "@/types/content";
import { cn } from "@/lib/cn";

type BookCardProps = {
  book: Book;
  dict: Dictionary;
  /** When true, show PDF download or coming-soon. */
  showDownload?: boolean;
  className?: string;
};

export function BookCard({
  book,
  dict,
  showDownload = false,
  className,
}: BookCardProps) {
  const item =
    dict.booksItems[book.dictionaryKey as keyof typeof dict.booksItems];
  const canDownload = Boolean(showDownload && book.pdfPath);

  return (
    <article
      className={cn(
        "flex flex-col border-b border-border pb-6 sm:flex-row sm:items-start sm:gap-6",
        className,
      )}
    >
      <BookCover
        title={item.title}
        authors={item.authors}
        brand={dict.hero.brand}
        cover={book.cover}
        tone={book.coverTone}
      />
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-xl font-semibold leading-snug text-secondary">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-primary-dark">{item.authors}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        {showDownload ? (
          <div className="mt-4">
            {canDownload ? (
              <a
                href={book.pdfPath}
                download
                className="inline-flex text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                {dict.library.download}
              </a>
            ) : (
              <span className="text-sm font-medium text-muted">
                {dict.library.comingSoon}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
