import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import { formatYear } from "@/utils/format";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const year = formatYear();

  return (
    <footer className="mt-auto border-t border-border bg-secondary text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="relative h-16 w-40 overflow-hidden rounded-md bg-white/95 p-1.5">
            <div className="relative h-full w-full">
              <Image
                src={site.logo}
                alt={site.name}
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {dict.nav.contact}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a
                href={`tel:${site.phoneTel}`}
                className="hover:text-primary transition-colors"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {dict.nav.home}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link
                href={localePath(locale, `/${routes.specialists}`)}
                className="hover:text-primary transition-colors"
              >
                {dict.nav.specialists}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, `/${routes.library}`)}
                className="hover:text-primary transition-colors"
              >
                {dict.nav.library}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, `/${routes.works}`)}
                className="hover:text-primary transition-colors"
              >
                {dict.nav.works}
              </Link>
            </li>
            <li>
              <Link
                href={localePath(locale, `/${routes.contact}`)}
                className="hover:text-primary transition-colors"
              >
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <span>
            © {year} {site.name}. {dict.footer.rights}
          </span>
          <span className="text-white/40">{site.fullName}</span>
        </Container>
      </div>
    </footer>
  );
}
