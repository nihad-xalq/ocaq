import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type ContactCtaProps = {
  locale: Locale;
  dict: Dictionary;
};

export function ContactCta({ locale, dict }: ContactCtaProps) {
  return (
    <section className="border-y border-border bg-primary-soft/60">
      <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div>
          <h2 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-3 max-w-md text-muted">{dict.contact.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={getWhatsAppUrl()} variant="whatsapp" target="_blank" rel="noopener noreferrer">
            {dict.contact.whatsapp}
          </Button>
          <Button href={localePath(locale, `/${routes.contact}`)} variant="secondary">
            {dict.nav.contact}
          </Button>
        </div>
      </Container>
    </section>
  );
}
