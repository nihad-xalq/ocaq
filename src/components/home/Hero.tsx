import type { Dictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";
import { routes } from "@/i18n/paths";
import { site } from "@/data/site";
import Image from "next/image";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(63,166,163,0.16),transparent_46%),radial-gradient(ellipse_at_8%_85%,rgba(30,37,44,0.08),transparent_42%)]"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:min-h-[78vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-dark">
            {dict.hero.tagline}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl lg:text-[3.4rem] lg:leading-[1.12]">
            {dict.hero.headline}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            {dict.hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              href={localePath(locale, `/${routes.contact}`)}
              variant="accent"
            >
              {dict.hero.ctaPrimary}
            </Button>
            <Button href="#services" variant="ghost">
              {dict.hero.ctaSecondary}
            </Button>
          </div>
          <ul className="mt-10 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {dict.hero.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm text-secondary"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rounded-4xl bg-primary-soft/70 lg:-inset-6" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-10 sm:px-10 sm:py-14">
            <div className="relative mx-auto h-48 w-full sm:h-64 lg:h-72">
              <Image
                src={site.logo}
                alt={site.name}
                priority
                loading="eager"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
