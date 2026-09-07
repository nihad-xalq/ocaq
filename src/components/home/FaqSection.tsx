import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import type { Dictionary } from "@/i18n/get-dictionary";

type FaqSectionProps = {
  dict: Dictionary;
};

export function FaqSection({ dict }: FaqSectionProps) {
  return (
    <Container as="section" className="py-20 sm:py-24">
      <SectionHeading title={dict.faq.title} subtitle={dict.faq.subtitle} />
      <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {faqs.map((faq) => {
          const item = dict.faqs[faq.id];
          return (
            <details
              key={faq.id}
              className="group py-5 open:bg-primary-soft/40"
            >
              <summary className="cursor-pointer list-none pr-8 font-medium text-secondary marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="mt-0.5 text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          );
        })}
      </div>
    </Container>
  );
}
