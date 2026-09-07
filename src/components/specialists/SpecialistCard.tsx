import type { Dictionary } from "@/i18n/get-dictionary";
import type { Specialist } from "@/types/content";
import { cn } from "@/lib/cn";

type SpecialistCardProps = {
  specialist: Specialist;
  dict: Dictionary;
  className?: string;
};

export function SpecialistCard({
  specialist,
  dict,
  className,
}: SpecialistCardProps) {
  const item =
    dict.specialistsItems[
      specialist.dictionaryKey as keyof typeof dict.specialistsItems
    ];

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      <div className="aspect-[4/5] bg-gradient-to-br from-primary/25 via-primary-soft to-secondary/10" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-secondary">
          {item.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary-dark">{item.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.bio}</p>
      </div>
    </article>
  );
}
