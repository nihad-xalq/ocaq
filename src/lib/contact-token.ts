import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const MIN_AGE_MS = 1_000;
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

export type ContactTokenStatus = "ok" | "invalid" | "too-fast" | "expired";

function secret(): string {
  return (
    process.env.CONTACT_FORM_SECRET ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    "ocaq-contact-dev-secret"
  );
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function equal(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createContactFormToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifyContactFormToken(token: unknown): ContactTokenStatus {
  if (typeof token !== "string") return "invalid";

  const separator = token.indexOf(".");
  if (separator <= 0 || separator === token.length - 1) return "invalid";

  const issuedAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!equal(signature, sign(issuedAt))) return "invalid";

  const timestamp = Number(issuedAt);
  if (!Number.isFinite(timestamp)) return "invalid";

  const age = Date.now() - timestamp;
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

export function hashClientKey(value: string): string {
  return createHash("sha256").update(`${secret()}:${value}`).digest("hex").slice(0, 24);
}
