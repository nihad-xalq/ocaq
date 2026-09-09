"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { EmailInput } from "@/components/form/EmailInput";
import { PhoneInput } from "@/components/form/PhoneInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "@/hooks/use-form";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import {
  CONTACT_HONEYPOT_FIELD,
  emptyContactForm,
  fetchContactFormToken,
  submitContactForm,
  validateContactForm,
} from "@/lib/contact-form";

type ContactFormProps = {
  copy: Dictionary["contact"]["form"];
  locale: Locale;
};

export function ContactForm({ copy, locale }: ContactFormProps) {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [token, setToken] = useState("");
  const { handleSubmit, fieldProps, isSubmitting } = useForm({
    initialValues: emptyContactForm,
    validate: (values) => validateContactForm(values, copy),
    onSubmit: async (values) => {
      const honeypot = formRef.current
        ? String(new FormData(formRef.current).get(CONTACT_HONEYPOT_FIELD) ?? "")
        : "";
      const result = await submitContactForm(
        { ...values, locale },
        { token, honeypot },
      );
      if (result === "rate-limited") {
        toast.error(copy.rateLimited);
        return false;
      }
      if (result !== "ok") {
        toast.error(copy.error);
        fetchContactFormToken().then((nextToken) => {
          if (nextToken) setToken(nextToken);
        });
        return false;
      }
      toast.success(copy.success);
    },
  });

  useEffect(() => {
    let cancelled = false;

    fetchContactFormToken().then((nextToken) => {
      if (!cancelled && nextToken) setToken(nextToken);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative w-full min-w-0 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="contact-fax">Fax</label>
        <input
          id="contact-fax"
          type="text"
          name={CONTACT_HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h3 className="font-display text-xl font-semibold text-secondary">
        {copy.title}
      </h3>

      <div className="mt-5 flex flex-col gap-4">
        <TextInput
          label={copy.fullName}
          placeholder={copy.fullNamePlaceholder}
          autoComplete="name"
          required
          {...fieldProps("fullName")}
        />
        <PhoneInput
          label={copy.phone}
          placeholder={copy.phonePlaceholder}
          required
          {...fieldProps("phone")}
        />
        <EmailInput
          label={copy.email}
          placeholder={copy.emailPlaceholder}
          optionalLabel={copy.optional}
          {...fieldProps("email")}
        />
        <TextareaInput
          label={copy.message}
          placeholder={copy.messagePlaceholder}
          optionalLabel={copy.optional}
          {...fieldProps("message")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full cursor-pointer px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? copy.submitting : copy.submit}
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        {copy.privacyNoteBefore}
        <Link
          href={localePath(locale, `/${routes.privacy}`)}
          className="underline decoration-border underline-offset-2 transition-colors hover:text-secondary"
        >
          {copy.privacyLink}
        </Link>
        {copy.privacyNoteAfter}
      </p>
    </form>
  );
}
