import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/form/ContactForm";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";

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

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <ContactChannels dict={dict} />
        <FadeIn delay={80}>
          <ContactForm copy={dict.contact.form} />
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
