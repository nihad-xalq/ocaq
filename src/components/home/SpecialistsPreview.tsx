import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialistCard } from "@/components/specialists/SpecialistCard";
import {
  specialists,
  specialistsPreviewCount,
} from "@/data/specialists";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

type SpecialistsPreviewProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SpecialistsPreview({ locale, dict }: SpecialistsPreviewProps) {
  const items = specialists.slice(0, specialistsPreviewCount);

  return (
    <Container as="section" className="py-20 sm:py-24">
      <SectionHeading
        title={dict.specialists.title}
        subtitle={dict.specialists.subtitle}
        action={
          <Button
            href={localePath(locale, `/${routes.specialists}`)}
            variant="ghost"
          >
            {dict.specialists.seeAll}
          </Button>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            dict={dict}
          />
        ))}
      </div>
    </Container>
  );
}
