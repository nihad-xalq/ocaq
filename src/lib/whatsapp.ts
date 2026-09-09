import { site } from "@/data/site";
import { stripLocaleFromPathname } from "@/i18n/locale-path";
import { routes } from "@/i18n/paths";

export type WhatsAppMessages = {
  therapies: string;
  about: string;
  library: string;
  specialists: string;
  works: string;
  contact: string;
  specialist: string;
};

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getTelHref(): string {
  return `tel:${site.phoneTel}`;
} 

export function namedWhatsAppMessage(template: string, name: string): string {
  return template.replace(/\{\{name\}\}/g, name);
}

export function whatsappMessageForPath(
  pathname: string,
  messages: WhatsAppMessages,
): string {
  const path = stripLocaleFromPathname(pathname).pathname;

  if (matchesRoute(path, routes.about)) return messages.about;
  if (matchesRoute(path, routes.library)) return messages.library;
  if (matchesRoute(path, routes.specialists)) return messages.specialists;
  if (matchesRoute(path, routes.works)) return messages.works;
  if (matchesRoute(path, routes.contact)) return messages.contact;

  return messages.therapies;
}

function matchesRoute(path: string, segment: string): boolean {
  const prefix = `/${segment}`;
  return path === prefix || path.startsWith(`${prefix}/`);
}
