"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

type FaqItemProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  const panelId = useId();

  return (
    <div
      className={cn(
        "py-2 transition-colors duration-300 ease-out motion-reduce:transition-none",
        open && "bg-primary-soft/40",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="py-3 flex w-full cursor-pointer items-start justify-between gap-4 text-left font-medium text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>{question}</span>
        <span
          className={cn(
            "mt-0.5 shrink-0 text-primary transition-transform duration-300 ease-out motion-reduce:transition-none",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "text-sm leading-relaxed text-muted transition-opacity duration-300 ease-out motion-reduce:transition-none",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
