import type { ContactFormValues } from "@/lib/contact-form";
import { CONTACT_HONEYPOT_FIELD } from "@/lib/contact-form";

const URL_PATTERN = /https?:\/\/|www\./i;
const MESSAGE_URL_LIMIT = 3;

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || null;
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host");

  if (origin) {
    try {
      return Boolean(host) && new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  return request.headers.get("sec-fetch-site") !== "cross-site";
}

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[CONTACT_HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

export function looksLikeSpam(values: ContactFormValues): boolean {
  if (URL_PATTERN.test(values.fullName) || URL_PATTERN.test(values.phone)) {
    return true;
  }

  const urls = values.message.match(/https?:\/\/|www\./gi);
  return (urls?.length ?? 0) > MESSAGE_URL_LIMIT;
}
