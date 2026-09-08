import { useId, type ComponentProps } from "react";

import { controlClassName } from "@/components/form/control-class";
import { Field } from "@/components/form/Field";

type PhoneInputProps = Omit<ComponentProps<"input">, "type" | "id"> & {
  label: string;
  error?: string;
  optionalLabel?: string;
};

export function PhoneInput({
  label,
  error,
  optionalLabel,
  required,
  className,
  autoComplete = "tel",
  ...props
}: PhoneInputProps) {
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
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={controlClassName(error, className)}
        {...props}
      />
    </Field>
  );
}
