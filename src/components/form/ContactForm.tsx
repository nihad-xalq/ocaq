"use client";

import { EmailInput } from "@/components/form/EmailInput";
import { PhoneInput } from "@/components/form/PhoneInput";
import { TextareaInput } from "@/components/form/TextareaInput";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "@/hooks/use-form";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  emptyContactForm,
  submitContactForm,
  validateContactForm,
} from "@/lib/contact-form";

type ContactFormProps = {
  copy: Dictionary["contact"]["form"];
  locale: Locale;
};

export function ContactForm({ copy, locale }: ContactFormProps) {
  const toast = useToast();
  const { handleSubmit, fieldProps, isSubmitting } = useForm({
    initialValues: emptyContactForm,
    validate: (values) => validateContactForm(values, copy),
    onSubmit: async (values) => {
      const ok = await submitContactForm({ ...values, locale });
      if (!ok) {
        toast.error(copy.error);
        return false;
      }
      toast.success(copy.success);
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
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
    </form>
  );
}
