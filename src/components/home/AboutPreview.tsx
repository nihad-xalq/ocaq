import { DutiesGrid } from "@/components/about/DutiesGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatIds } from "@/data/about";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

type AboutPreviewProps = {
  locale: Locale;
  dict: Dictionary;
};

export function AboutPreview({ locale, dict }: AboutPreviewProps) {
  return (
    <section className="border-y border-border bg-primary-soft/40">
      <Container className="py-20 sm:py-24">
        <FadeIn>
          <SectionHeading
            title={dict.about.title}
            subtitle={dict.about.subtitle}
            action={
              <Button
                href={localePath(locale, `/${routes.about}`)}
                variant="ghost"
              >
                {dict.about.seeAll}
              </Button>
            }
          />
        </FadeIn>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <FadeIn>
              <p className="text-base leading-relaxed text-secondary/90">
                {dict.about.missionBody}
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <blockquote className="mt-8 border-l-4 border-primary bg-surface px-5 py-4 font-display text-lg leading-relaxed font-medium text-secondary sm:px-6 sm:py-5 sm:text-xl">
                {dict.about.missionHighlight}
              </blockquote>
            </FadeIn>
          </div>

          <div>
            <FadeIn>
              <h3 className="font-display text-xl font-semibold text-secondary sm:text-2xl">
                {dict.about.dutiesTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {dict.about.dutiesSubtitle}
              </p>
            </FadeIn>
            <DutiesGrid dict={dict} columns={1} className="mt-8" />
          </div>
        </div>

        <FadeIn delay={80}>
          <ul className="mt-14 flex flex-col gap-3 border-t border-border/80 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {formatIds.map((id) => (
              <li
                key={id}
                className="flex items-center gap-2.5 text-sm font-medium text-secondary"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {dict.about.formats[id].title}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
