import { FadeIn } from "@/components/ui/FadeIn";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getMailtoHref, getMapsHref, site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref } from "@/lib/whatsapp";

const cardClass =
  "flex w-full min-w-0 items-start gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/50 sm:gap-4 sm:p-5";

type ContactChannelsProps = {
  dict: Dictionary;
};

export function ContactChannels({ dict }: ContactChannelsProps) {
  return (
    <FadeIn className="min-w-0">
      <div className="flex min-w-0 flex-col gap-4">
        <a href={getTelHref()} className={cardClass}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <PhoneIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.phone}
            </span>
            <span className="mt-1.5 block font-display text-xl font-semibold text-secondary">
              {site.phoneDisplay}
            </span>
          </span>
        </a>

        <WhatsAppLink messages={dict.whatsappMessages} className={cardClass}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebe57]">
            <WhatsAppIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.whatsapp}
            </span>
            <span className="mt-1.5 block font-display text-xl font-semibold text-secondary">
              {site.phoneDisplay}
            </span>
          </span>
        </WhatsAppLink>

        <a href={getMailtoHref()} className={cardClass}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <MailIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.email}
            </span>
            <span className="mt-1.5 block break-all font-medium text-secondary">
              {site.email}
            </span>
          </span>
        </a>

        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <InstagramIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.instagram}
            </span>
            <span className="mt-1.5 block break-all font-medium text-secondary">
              {site.instagramHandle}
            </span>
          </span>
        </a>

        <a
          href={getMapsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <MapPinIcon />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.map}
            </span>
            <span className="mt-1.5 block font-medium text-secondary">
              {site.address}
            </span>
          </span>
        </a>
      </div>
    </FadeIn>
  );
}
