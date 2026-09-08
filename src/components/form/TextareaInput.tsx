import { useId, type ComponentProps } from "react";

import { controlClassName } from "@/components/form/control-class";
import { Field } from "@/components/form/Field";
import { cn } from "@/lib/cn";

type TextareaInputProps = Omit<ComponentProps<"textarea">, "id"> & {
  label: string;
  error?: string;
  optionalLabel?: string;
};

export function TextareaInput({
  label,
  error,
  optionalLabel,
  required,
  className,
  rows = 4,
  ...props
}: TextareaInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <Field
      label={label}
      htmlFor={id}
      error={error}
      errorId={errorId}
      required={required}
      optionalLabel={optionalLabel}
    >
      <textarea
        id={id}
        rows={rows}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={controlClassName(error, cn("min-h-24 resize-y", className))}
        {...props}
      />
    </Field>
  );
}
