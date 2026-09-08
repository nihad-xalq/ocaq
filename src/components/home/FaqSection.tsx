"use client";

import { useState } from "react";

import { FaqItem } from "@/components/home/FaqItem";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { FaqId } from "@/types/content";

type FaqSectionProps = {
  dict: Dictionary;
};

export function FaqSection({ dict }: FaqSectionProps) {
  const [openId, setOpenId] = useState<FaqId | null>(null);

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
                open={openId === faq.id}
                onToggle={() =>
                  setOpenId((current) => (current === faq.id ? null : faq.id))
                }
              />
            );
          })}
        </div>
      </FadeIn>
    </Container>
  );
}
