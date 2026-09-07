import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(246,149,35,0.2),_transparent_50%),radial-gradient(ellipse_at_15%_80%,_rgba(75,54,124,0.1),_transparent_45%)]"
      />

      <Container className="relative flex min-h-[78vh] flex-col justify-center py-16 sm:py-24">
        <div className="relative mb-8 h-40 w-full max-w-md sm:h-52 sm:max-w-lg md:h-60">
          <Image
            src={site.logo}
            alt={site.name}
            fill
            priority
            className="object-contain object-left"
            sizes="(max-width: 768px) 90vw, 512px"
          />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
          {dict.hero.tagline}
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {dict.hero.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={localePath(locale, `/${routes.contact}`)}>
            {dict.hero.ctaPrimary}
          </Button>
          <Button href="#services" variant="ghost">
            {dict.hero.ctaSecondary}
          </Button>
        </div>
      </Container>
    </section>
  );
}
