import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/works/WorkCard";
import { works, worksPreviewCount } from "@/data/works";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

type WorksPreviewProps = {
  locale: Locale;
  dict: Dictionary;
};

export function WorksPreview({ locale, dict }: WorksPreviewProps) {
  const items = works.slice(0, worksPreviewCount);

  return (
    <Container as="section" className="py-20 sm:py-24">
      <FadeIn>
        <SectionHeading
          title={dict.works.title}
          subtitle={dict.works.subtitle}
          action={
            <Button href={localePath(locale, `/${routes.works}`)} variant="ghost">
              {dict.works.seeAll}
            </Button>
          }
        />
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((work, index) => (
          <FadeIn key={work.id} delay={index * 60} className="h-full">
            <WorkCard work={work} dict={dict} className="h-full" />
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}
