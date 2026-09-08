import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/form/ContactForm";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactCtaProps = {
  locale: Locale;
  dict: Dictionary;
};

export function ContactCta({ locale, dict }: ContactCtaProps) {
  return (
    <section className="border-y border-border bg-primary-soft/50">
      <Container className="py-16 sm:py-20">
        <FadeIn>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
              {dict.contact.title}
            </h2>
            <p className="mt-3 max-w-md text-muted">{dict.contact.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ContactChannels dict={dict} />
          <FadeIn delay={80}>
            <ContactForm copy={dict.contact.form} locale={locale} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
