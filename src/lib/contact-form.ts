import type { Dictionary } from "@/i18n/get-dictionary";
import type { FormErrors } from "@/hooks/use-form";

export type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

export const emptyContactForm: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues,
  copy: Dictionary["contact"]["form"],
): FormErrors<ContactFormValues> {
  const errors: FormErrors<ContactFormValues> = {};

  if (!values.fullName.trim()) {
    errors.fullName = copy.required;
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = copy.required;
  } else if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = copy.invalidPhone;
  }

  const email = values.email.trim();
  if (email && !emailPattern.test(email)) {
    errors.email = copy.invalidEmail;
  }

  return errors;
}
