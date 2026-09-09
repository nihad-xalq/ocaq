"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { useWhatsAppHref } from "@/hooks/use-whatsapp-href";
import type { WhatsAppMessages } from "@/lib/whatsapp";
import { externalLinkRel } from "@/data/site";

type WhatsAppLinkProps = Omit<ComponentProps<"a">, "href"> & {
  messages: WhatsAppMessages;
  message?: string;
};

export function WhatsAppLink({
  messages,
  message,
  children,
  target = "_blank",
  rel = externalLinkRel,
  ...props
}: WhatsAppLinkProps) {
  const href = useWhatsAppHref(messages, message);

  return (
    <a href={href} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
}

type WhatsAppButtonProps = {
  messages: WhatsAppMessages;
  message?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function WhatsAppButton({
  messages,
  message,
  children,
  className,
  onClick,
}: WhatsAppButtonProps) {
  const href = useWhatsAppHref(messages, message);

  return (
    <Button
      href={href}
      variant="whatsapp"
      className={className}
      target="_blank"
      rel={externalLinkRel}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
