import { dutyIds } from "@/data/about";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/cn";

type DutiesGridProps = {
  dict: Dictionary;
  className?: string;
  columns?: 1 | 2;
};

export function DutiesGrid({ dict, className, columns = 2 }: DutiesGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {dutyIds.map((id, index) => (
        <FadeIn key={id} delay={index * 60}>
          <article className="group border-t border-primary/40 pt-6 transition-transform duration-300 hover:-translate-y-1">
            <span className="font-display text-4xl font-semibold text-primary/40 transition-colors group-hover:text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              {dict.about.duties[id]}
            </p>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
