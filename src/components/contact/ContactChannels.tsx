import { FadeIn } from "@/components/ui/FadeIn";
import {
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTelHref } from "@/lib/whatsapp";

const cardClass =
  "flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50";

type ContactChannelsProps = {
  dict: Dictionary;
};

export function ContactChannels({ dict }: ContactChannelsProps) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <a href={getTelHref()} className={cardClass}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <PhoneIcon />
          </span>
          <span>
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
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.whatsapp}
            </span>
            <span className="mt-1.5 block font-display text-xl font-semibold text-secondary">
              {site.phoneDisplay}
            </span>
          </span>
        </WhatsAppLink>

        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <InstagramIcon />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-dark">
              {dict.contact.instagram}
            </span>
            <span className="mt-1.5 block truncate font-medium text-secondary">
              {site.instagramHandle}
            </span>
          </span>
        </a>
      </div>
    </FadeIn>
  );
}
