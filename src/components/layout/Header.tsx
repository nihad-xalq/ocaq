"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { isActivePath, localePath } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import { getTelHref } from "@/lib/whatsapp";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const menuId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, `/${routes.about}`), label: dict.nav.about },
    {
      href: localePath(locale, `/${routes.specialists}`),
      label: dict.nav.specialists,
    },
    { href: localePath(locale, `/${routes.library}`), label: dict.nav.library },
    { href: localePath(locale, `/${routes.works}`), label: dict.nav.works },
    { href: localePath(locale, `/${routes.contact}`), label: dict.nav.contact },
  ];

  const legalLinks = [
    {
      href: localePath(locale, `/${routes.privacy}`),
      label: dict.privacy.title,
    },
    {
      href: localePath(locale, `/${routes.terms}`),
      label: dict.terms.title,
    },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const media = window.matchMedia("(min-width: 1024px)");
    const onViewport = () => {
      if (media.matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onViewport);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onViewport);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-17">
          <Link
            href={localePath(locale, "/")}
            className="relative block h-11 w-30 shrink-0 sm:h-12 sm:w-36"
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

          <nav className="hidden items-center gap-3 xl:gap-6 lg:flex" aria-label="Main">
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap text-[13px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary xl:text-sm",
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
            <span
              className="hidden h-5 w-px bg-border sm:block"
              aria-hidden="true"
            />
            <a
              href={getTelHref()}
              className="hidden h-10 items-center gap-2 whitespace-nowrap text-sm font-semibold tabular-nums tracking-wide text-secondary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
            >
              <PhoneIcon className="shrink-0 text-primary-dark" />
              {site.phoneDisplay}
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-secondary transition-colors hover:border-primary/55 hover:bg-primary-soft hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden cursor-pointer"
              aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
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
      </header>

      <div className="lg:hidden" aria-hidden={!open} inert={!open}>
        <div
          className={cn(
            "fixed inset-0 z-60 bg-secondary/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none",
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          onClick={() => setOpen(false)}
        />

        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label={dict.common.openMenu}
          className={cn(
            "fixed top-0 right-0 z-60 flex h-dvh max-h-dvh w-[min(22rem,88vw)] flex-col border-l border-border bg-surface shadow-[0_24px_64px_-20px_rgba(30,37,44,0.45)] transition-transform duration-300 ease-out motion-reduce:transition-none",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-5 sm:h-17">
            <Link
              href={localePath(locale, "/")}
              onClick={() => setOpen(false)}
              className="relative block h-10 w-27 shrink-0"
            >
              <Image
                src={site.logo}
                alt={site.name}
                fill
                sizes="108px"
                className="object-contain object-left"
              />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-secondary transition-colors hover:border-primary/55 hover:bg-primary-soft hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
              aria-label={dict.common.closeMenu}
              onClick={() => setOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4"
            aria-label="Main"
          >
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary-soft text-primary-dark"
                      : "text-secondary hover:bg-primary-soft",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="my-3 h-px bg-border" aria-hidden="true" />

            {legalLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-primary-soft text-primary-dark"
                      : "text-muted hover:bg-primary-soft hover:text-secondary",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto shrink-0 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={getTelHref()}
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold tabular-nums text-white shadow-[0_8px_24px_-12px_rgba(94,139,138,0.55)] transition-colors hover:bg-primary-dark"
            >
              <PhoneIcon className="shrink-0" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
