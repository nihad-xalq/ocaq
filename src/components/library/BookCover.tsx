import Image from "next/image";

import { cn } from "@/lib/cn";

type BookCoverProps = {
  title: string;
  authors: string;
  brand: string;
  cover?: string;
  tone?: "slate" | "teal";
  className?: string;
};

export function BookCover({
  title,
  authors,
  brand,
  cover,
  tone = "slate",
  className,
}: BookCoverProps) {
  if (cover) {
    return (
      <div
        className={cn(
          "relative mb-4 aspect-3/4 w-28 shrink-0 overflow-hidden rounded-md sm:mb-0",
          className,
        )}
      >
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "mb-4 flex aspect-3/4 w-28 shrink-0 flex-col justify-between overflow-hidden rounded-md px-2.5 py-3 shadow-[inset_3px_0_0_rgba(255,255,255,0.14)] sm:mb-0",
        tone === "slate"
          ? "bg-secondary text-white"
          : "bg-accent text-white",
        className,
      )}
    >
      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] opacity-80">
        {brand}
      </p>
      <p className="font-display text-[0.68rem] leading-snug font-semibold line-clamp-6">
        {title}
      </p>
      <p className="text-[0.58rem] leading-tight opacity-80 line-clamp-2">
        {authors}
      </p>
    </div>
  );
}
