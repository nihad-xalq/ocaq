"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppLink";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { isActivePath, localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import { cn } from "@/lib/cn";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    {
      href: localePath(locale, `/${routes.specialists}`),
      label: dict.nav.specialists,
    },
    { href: localePath(locale, `/${routes.library}`), label: dict.nav.library },
    { href: localePath(locale, `/${routes.works}`), label: dict.nav.works },
    { href: localePath(locale, `/${routes.contact}`), label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link
          href={localePath(locale, "/")}
          className="relative block h-11 w-[7.5rem] shrink-0 sm:h-12 sm:w-36"
        >
          <Image
            src={site.logo}
            alt={site.name}
            priority
            loading="eager"
            fill
            sizes="144px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary",
                  active
                    ? "text-secondary after:opacity-100"
                    : "text-muted after:opacity-0 hover:text-secondary",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <WhatsAppButton
            messages={dict.whatsappMessages}
            className="hidden sm:inline-flex"
          >
            {dict.nav.whatsapp}
          </WhatsAppButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-secondary lg:hidden"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? dict.common.closeMenu : dict.common.openMenu}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-border bg-surface lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium",
                  active
                    ? "bg-primary-soft text-primary-dark"
                    : "text-secondary hover:bg-primary-soft",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <WhatsAppButton
            messages={dict.whatsappMessages}
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            {dict.nav.whatsapp}
          </WhatsAppButton>
        </Container>
      </div>
    </header>
  );
}
