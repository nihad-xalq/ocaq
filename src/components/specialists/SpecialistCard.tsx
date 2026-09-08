import Image from "next/image";

import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Specialist } from "@/types/content";
import { cn } from "@/lib/cn";
import { namedWhatsAppMessage } from "@/lib/whatsapp";

type SpecialistCardProps = {
  specialist: Specialist;
  dict: Dictionary;
  className?: string;
};

export function SpecialistCard({
  specialist,
  dict,
  className,
}: SpecialistCardProps) {
  const item =
    dict.specialistsItems[
      specialist.dictionaryKey as keyof typeof dict.specialistsItems
    ];

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-border bg-surface",
        className,
      )}
    >
      <div className="relative aspect-4/5 bg-linear-to-br from-primary/25 via-primary-soft to-secondary/10">
        {specialist.image ? (
          <Image
            src={specialist.image}
            alt={item.name}
            fill
            className="object-cover object-[center_20%]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-secondary">
          {item.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary-dark">
          {item.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.bio}</p>
        <WhatsAppLink
          messages={dict.whatsappMessages}
          message={namedWhatsAppMessage(
            dict.whatsappMessages.specialist,
            item.name,
          )}
          className="mt-auto pt-4 text-sm font-semibold text-primary-dark hover:text-primary"
        >
          {dict.contact.whatsapp}
        </WhatsAppLink>
      </div>
    </article>
  );
}
