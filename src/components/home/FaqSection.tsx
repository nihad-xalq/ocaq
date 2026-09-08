import { FaqItem } from "@/components/home/FaqItem";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import type { Dictionary } from "@/i18n/get-dictionary";

type FaqSectionProps = {
  dict: Dictionary;
};

export function FaqSection({ dict }: FaqSectionProps) {
  return (
    <Container as="section" className="py-20 sm:py-24">
      <FadeIn>
        <SectionHeading title={dict.faq.title} subtitle={dict.faq.subtitle} />
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {faqs.map((faq) => {
            const item = dict.faqs[faq.id];
            return (
              <FaqItem
                key={faq.id}
                question={item.question}
                answer={item.answer}
              />
            );
          })}
        </div>
      </FadeIn>
    </Container>
  );
}
