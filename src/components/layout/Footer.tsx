import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getMailtoHref, getMapsHref, site, externalLinkRel } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import { getTelHref } from "@/lib/whatsapp";
import { formatYear } from "@/utils/format";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const year = formatYear();

  return (
    <footer className="mt-auto border-t border-border bg-footer text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="relative h-16 w-40 overflow-hidden rounded-md bg-white/95 p-1.5">
            <div className="relative h-full w-full">
              <Image
                src={site.logo}
                alt={site.name}
                loading="lazy"
                fill
                sizes="160px"
                className="object-contain object-left"
              />
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {dict.nav.contact}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a
                href={getTelHref()}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
              >
                <PhoneIcon className="shrink-0 text-primary" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={getMailtoHref()}
                className="inline-flex min-w-0 items-center gap-2.5 hover:text-primary transition-colors"
              >
                <MailIcon className="shrink-0 text-primary" />
                <span className="break-all">{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={getMapsHref()}
                target="_blank"
                rel={externalLinkRel}
                className="inline-flex items-start gap-2.5 hover:text-primary transition-colors"
              >
                <MapPinIcon className="mt-0.5 shrink-0 text-primary" />
                <span>{site.address}</span>
              </a>
            </li>
            <li>
              <WhatsAppLink
                messages={dict.whatsappMessages}
                className="inline-flex items-center gap-2.5 hover:text-primary transition-colors"
              >
                <WhatsAppIcon className="shrink-0 text-primary" />
                WhatsApp
              </WhatsAppLink>
            </li>
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel={externalLinkRel}
                className="inline-flex max-w-full min-w-0 items-center gap-2.5 hover:text-primary transition-colors"
              >
                <InstagramIcon className="shrink-0 text-primary" />
                <span className="break-all">{site.instagramHandle}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {dict.nav.home}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link
                href={localePath(locale, `/${routes.about}`)}
                className="hover:text-primary transition-colors"
              >
                {dict.nav.about}
              </Link>
            </li>
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
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>
              © {year} {site.name}. {dict.footer.rights}
            </span>
            <span className="text-white/70">{site.fullName}</span>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label={dict.footer.legal}>
            <Link
              href={localePath(locale, `/${routes.privacy}`)}
              className="hover:text-primary transition-colors"
            >
              {dict.privacy.title}
            </Link>
            <Link
              href={localePath(locale, `/${routes.terms}`)}
              className="hover:text-primary transition-colors"
            >
              {dict.terms.title}
            </Link>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
