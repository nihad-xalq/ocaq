import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { WhatsAppButton } from "@/components/ui/WhatsAppLink";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref } from "@/lib/whatsapp";

type ContactContentProps = {
  dict: Dictionary;
};

export function ContactContent({ dict }: ContactContentProps) {
  return (
    <Container className="py-16 sm:py-24">
      <FadeIn immediate>
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{dict.contact.subtitle}</p>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FadeIn delay={0}>
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
        </FadeIn>

        <FadeIn delay={60}>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.whatsapp}
            </p>
            <WhatsAppButton messages={dict.whatsappMessages} className="mt-4">
              {dict.contact.cta}
            </WhatsAppButton>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
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
        </FadeIn>
      </div>

      <FadeIn delay={180}>
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
            {dict.contact.map}
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
            <iframe
              src={site.mapsEmbedUrl}
              title={dict.contact.map}
              className="h-80 w-full border-0 sm:h-[450px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
