import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
      <SectionHeading
        title={dict.works.title}
        subtitle={dict.works.subtitle}
        action={
          <Button href={localePath(locale, `/${routes.works}`)} variant="ghost">
            {dict.works.seeAll}
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((work) => (
          <WorkCard key={work.id} work={work} dict={dict} />
        ))}
      </div>
    </Container>
  );
}
