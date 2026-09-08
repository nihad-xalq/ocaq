import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref } from "@/lib/whatsapp";

type ContactCtaProps = {
  dict: Dictionary;
};

export function ContactCta({ dict }: ContactCtaProps) {
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn delay={0}>
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
          </FadeIn>

          <FadeIn delay={60}>
            <WhatsAppLink
              messages={dict.whatsappMessages}
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
            </WhatsAppLink>
          </FadeIn>

          <FadeIn delay={120} className="sm:col-span-2 lg:col-span-1">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
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
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
