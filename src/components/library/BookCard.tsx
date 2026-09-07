import type { Dictionary } from "@/i18n/get-dictionary";
import type { Book } from "@/types/content";
import { cn } from "@/lib/cn";

type BookCardProps = {
  book: Book;
  dict: Dictionary;
  /** When true, show PDF download control. Homepage preview keeps this false. */
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
      <div className="mb-4 aspect-[3/4] w-28 shrink-0 rounded-md bg-gradient-to-b from-primary/30 to-secondary/20 sm:mb-0" />
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-xl font-semibold text-secondary">
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
