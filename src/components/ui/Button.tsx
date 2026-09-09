import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import Link from "next/link";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "whatsapp";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-dark text-white hover:bg-secondary shadow-[0_8px_24px_-12px_rgba(74,115,114,0.55)]",
  accent:
    "bg-accent-dark text-white hover:bg-accent-darker shadow-[0_8px_24px_-12px_rgba(42,122,120,0.6)]",
  secondary: "bg-secondary text-white hover:bg-secondary-soft",
  ghost:
    "bg-transparent text-secondary border border-border hover:border-primary hover:text-primary-dark",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as Omit<ButtonAsButton, "children" | "className" | "variant">)}
    >
      {children}
    </button>
  );
}
