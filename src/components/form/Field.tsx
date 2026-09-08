import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  required?: boolean;
  optionalLabel?: string;
  children: ReactNode;
};

export function Field({
  label,
  htmlFor,
  error,
  errorId,
  required,
  optionalLabel,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-secondary">
        {label}
        {required ? (
          <span className="text-red-500" aria-hidden="true">
            {" "}
            *
          </span>
        ) : optionalLabel ? (
          <span className="font-normal text-muted"> ({optionalLabel})</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
