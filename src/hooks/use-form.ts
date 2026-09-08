import {
  useCallback,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

type Touched<T> = {
  [K in keyof T]?: boolean;
};

type UseFormOptions<T extends Record<string, string>> = {
  initialValues: T;
  validate: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void | boolean | Promise<void | boolean>;
};

function hasErrors<T>(errors: FormErrors<T>) {
  return Object.values(errors).some(Boolean);
}

export function useForm<T extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    const field = name as keyof T;

    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as keyof T;
    setTouched((current) => ({ ...current, [field]: true }));

    const nextErrors = validate({
      ...values,
      [field]: event.target.value,
    });
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextTouched = Object.fromEntries(
      Object.keys(values).map((key) => [key, true]),
    ) as Touched<T>;
    const nextErrors = validate(values);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
      if (result !== false) reset();
    } catch {
      // Keep values so the user can retry after a failed submit.
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldProps(name: keyof T & string) {
    return {
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name] ? errors[name] : undefined,
      disabled: isSubmitting,
    };
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    reset,
    fieldProps,
  };
}
