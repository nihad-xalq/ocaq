import type { FormErrors } from "@/hooks/use-form";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export const CONTACT_HONEYPOT_FIELD = "fax";

export type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

export type ContactSubmission = ContactFormValues & {
  locale: Locale;
};

export type ContactSubmitMeta = {
  token: string;
  honeypot: string;
};

export type ContactSubmitResult = "ok" | "rate-limited" | "error";

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

function isCompleteContactForm(values: ContactFormValues): boolean {
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.fullName.trim()) return false;
  if (phoneDigits.length < 9 || phoneDigits.length > 15) return false;
  if (values.email && !emailPattern.test(values.email)) return false;
  return true;
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function parseContactSubmission(input: unknown): ContactSubmission | null {
  if (!input || typeof input !== "object") return null;

  const data = input as Record<string, unknown>;
  const fullName = readString(data.fullName);
  const phone = readString(data.phone);
  const email = readString(data.email);
  const message = readString(data.message);
  const locale = readString(data.locale);

  if (
    fullName === null ||
    phone === null ||
    email === null ||
    message === null ||
    !locale ||
    !isLocale(locale)
  ) {
    return null;
  }

  const values: ContactFormValues = {
    fullName: fullName.trim().slice(0, 120),
    phone: phone.trim().slice(0, 32),
    email: email.trim().slice(0, 254),
    message: message.trim().slice(0, 2000),
  };

  if (!isCompleteContactForm(values)) return null;

  return { ...values, locale };
}

export async function fetchContactFormToken(): Promise<string | null> {
  try {
    const response = await fetch("/api/contact", {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;

    const token = (data as { token?: unknown }).token;
    return typeof token === "string" && token ? token : null;
  } catch {
    return null;
  }
}

export async function submitContactForm(
  submission: ContactSubmission,
  meta: ContactSubmitMeta,
): Promise<ContactSubmitResult> {
  const hadToken = Boolean(meta.token);
  const token = meta.token || (await fetchContactFormToken());
  if (!token) return "error";
  if (!hadToken) {
    await new Promise((resolve) => setTimeout(resolve, 1100));
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...submission,
        token,
        [CONTACT_HONEYPOT_FIELD]: meta.honeypot,
      }),
    });

    if (response.status === 429) return "rate-limited";
    if (!response.ok) return "error";
    return "ok";
  } catch {
    return "error";
  }
}
