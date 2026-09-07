import { site } from "@/data/site";

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getTelHref(): string {
  return `tel:${site.phoneTel}`;
}
