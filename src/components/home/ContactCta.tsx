import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref, getWhatsAppUrl } from "@/lib/whatsapp";

type ContactCtaProps = {
  dict: Dictionary;
};

export function ContactCta({ dict }: ContactCtaProps) {
  return (
    <section className="border-y border-border bg-primary-soft/50">
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
            {dict.contact.title}
          </h2>
          <p className="mt-3 max-w-md text-muted">{dict.contact.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={getTelHref()}
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
              <PhoneIcon />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
                {dict.contact.phone}
              </span>
              <span className="mt-1.5 block font-display text-xl font-semibold text-secondary">
                {site.phoneDisplay}
              </span>
            </span>
          </a>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebe57]">
              <WhatsAppIcon />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
                {dict.contact.whatsapp}
              </span>
              <span className="mt-1.5 block font-display text-xl font-semibold text-secondary">
                {site.phoneDisplay}
              </span>
            </span>
          </a>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 sm:col-span-2 lg:col-span-1 transition-colors hover:border-primary/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
              <InstagramIcon />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
                {dict.contact.instagram}
              </span>
              <span className="mt-1.5 block truncate font-medium text-secondary">
                {site.instagramHandle}
              </span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
