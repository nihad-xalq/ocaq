import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref, getWhatsAppUrl } from "@/lib/whatsapp";

type ContactContentProps = {
  dict: Dictionary;
};

export function ContactContent({ dict }: ContactContentProps) {
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
          {dict.contact.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{dict.contact.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
            {dict.contact.phone}
          </p>
          <a
            href={getTelHref()}
            className="mt-3 block font-display text-2xl font-semibold text-secondary hover:text-primary-dark"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
            {dict.contact.whatsapp}
          </p>
          <Button
            href={getWhatsAppUrl()}
            variant="whatsapp"
            className="mt-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.contact.cta}
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
            {dict.contact.instagram}
          </p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-lg font-medium text-secondary hover:text-primary-dark"
          >
            {site.instagramHandle}
          </a>
        </div>
      </div>
    </Container>
  );
}
