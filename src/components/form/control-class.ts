import { cn } from "@/lib/cn";

export function controlClassName(error?: string, className?: string) {
  return cn(
    "w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-0",
    error
      ? "border-red-400 focus-visible:outline-red-300"
      : "border-border focus-visible:border-primary focus-visible:outline-primary/25",
    "disabled:cursor-not-allowed disabled:opacity-60",
    className,
  );
}
