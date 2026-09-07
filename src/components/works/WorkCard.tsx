import type { Dictionary } from "@/i18n/get-dictionary";
import type { WorkItem } from "@/types/content";
import { cn } from "@/lib/cn";

type WorkCardProps = {
  work: WorkItem;
  dict: Dictionary;
  className?: string;
};

export function WorkCard({ work, dict, className }: WorkCardProps) {
  const item =
    dict.worksItems[work.dictionaryKey as keyof typeof dict.worksItems];

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      <div className="aspect-[16/10] bg-gradient-to-tr from-secondary/90 via-secondary-soft to-primary/50 transition-transform duration-500 group-hover:scale-[1.02]" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
          {item.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-secondary">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      </div>
    </article>
  );
}
