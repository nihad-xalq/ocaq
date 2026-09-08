"use client";

import { usePathname } from "next/navigation";

import {
  getWhatsAppUrl,
  whatsappMessageForPath,
  type WhatsAppMessages,
} from "@/lib/whatsapp";

export function useWhatsAppHref(
  messages: WhatsAppMessages,
  message?: string,
): string {
  const pathname = usePathname() || "/";
  return getWhatsAppUrl(message ?? whatsappMessageForPath(pathname, messages));
}
