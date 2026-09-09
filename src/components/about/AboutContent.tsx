import { brochurePdf, formatIds, founderImage, teamPhotos } from "@/data/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getMailtoHref, getMapsHref, site } from "@/data/site";
import { MailIcon, MapPinIcon } from "@/components/ui/icons";
import { DutiesGrid } from "@/components/about/DutiesGrid";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { localePath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";
import { routes } from "@/i18n/paths";
import Image from "next/image";
import { cn } from "@/lib/cn";

type AboutContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export function AboutContent({ locale, dict }: AboutContentProps) {
  const isSingleTeamPhoto = teamPhotos.length === 1;

  return (
    <>
      <Container className="py-16 sm:py-24">
        <FadeIn immediate>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
              {dict.about.pageTitle}
            </h1>
            <p className="mt-4 text-lg text-muted">{dict.about.pageSubtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          <a
            href={getMailtoHref()}
            className="inline-flex min-w-0 items-center gap-2.5 text-sm text-secondary transition-colors hover:text-primary-dark"
          >
            <MailIcon className="shrink-0 text-primary-dark" />
            <span className="break-all">{site.email}</span>
          </a>
          <a
            href={getMapsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 items-center gap-2.5 text-sm text-secondary transition-colors hover:text-primary-dark"
          >
            <MapPinIcon className="shrink-0 text-primary-dark" />
            <span>{site.address}</span>
          </a>
        </div>

        <section className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <FadeIn immediate delay={40}>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-primary-soft">
              <Image
                src={founderImage}
                alt={dict.about.founderImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="object-cover object-left"
              />
            </div>
          </FadeIn>
          <FadeIn immediate delay={80}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-dark">
              {dict.about.founderLabel}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              {dict.about.founderName}
            </h2>
            <p className="mt-2 text-base font-medium text-primary-dark">
              {dict.about.founderRole}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {dict.about.founderTribute}
            </p>
            <p className="mt-6 font-display text-xl italic text-secondary/80">
              {dict.about.founderRest}
            </p>
          </FadeIn>
        </section>
      </Container>

      <section className="border-y border-border bg-primary-soft/45">
        <Container className="py-16 sm:py-24">
          <FadeIn>
            <SectionHeading
              title={dict.about.missionTitle}
              subtitle={dict.about.missionBody}
            />
          </FadeIn>
          <FadeIn delay={80}>
            <blockquote className="max-w-3xl border-l-4 border-primary bg-surface px-6 py-5 font-display text-xl leading-relaxed font-medium text-secondary sm:px-8 sm:py-6 sm:text-2xl">
              {dict.about.missionHighlight}
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <FadeIn>
          <SectionHeading
            title={dict.about.dutiesTitle}
            subtitle={dict.about.dutiesSubtitle}
          />
        </FadeIn>
        <DutiesGrid dict={dict} />
      </Container>

      <section className="border-y border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <FadeIn>
            <SectionHeading
              title={dict.about.formatTitle}
              subtitle={dict.about.formatSubtitle}
            />
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {formatIds.map((id, index) => {
              const item = dict.about.formats[id];
              return (
                <FadeIn key={id} delay={index * 60}>
                  <article className="group border-t border-primary/40 pt-6 transition-transform duration-300 hover:-translate-y-1">
                    <span className="font-display text-4xl font-semibold text-primary/40 transition-colors group-hover:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-secondary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <FadeIn>
          <SectionHeading
            title={dict.about.teamTitle}
            subtitle={dict.about.teamSubtitle}
            action={
              <Button
                href={localePath(locale, `/${routes.specialists}`)}
                variant="ghost"
              >
                {dict.specialists.seeAll}
              </Button>
            }
          />
        </FadeIn>
        <div
          className={cn(
            "grid gap-4 sm:gap-5",
            isSingleTeamPhoto ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {teamPhotos.map((photo, index) => (
            <FadeIn key={photo.id} delay={index * 80}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border bg-primary-soft",
                  isSingleTeamPhoto ? "aspect-16/10" : "aspect-4/3",
                )}
              >
                <Image
                  src={photo.src}
                  alt={dict.about.teamPhotoAlt}
                  fill
                  sizes={
                    isSingleTeamPhoto
                      ? "(max-width: 1024px) 100vw, 1152px"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover object-[center_30%]"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-16 border-t border-border pt-8">
            <a
              href={brochurePdf}
              download
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-secondary underline"
            >
              {dict.about.brochureDownload}
            </a>
          </p>
        </FadeIn>
      </Container>
    </>
  );
}
