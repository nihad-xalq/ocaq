import { NextResponse } from "next/server";

import {
  getClientIp,
  isAllowedOrigin,
  isHoneypotFilled,
  looksLikeSpam,
} from "@/lib/contact-guard";
import { parseContactSubmission } from "@/lib/contact-form";
import {
  createContactFormToken,
  hashClientKey,
  verifyContactFormToken,
} from "@/lib/contact-token";
import { appendContactToSheet } from "@/lib/google-sheet";
import { consumeRateLimit } from "@/lib/rate-limit";

const POST_BURST = { windowMs: 20_000, max: 1 };
const POST_WINDOW = { windowMs: 15 * 60 * 1000, max: 5 };
const POST_FLOOD = { windowMs: 5 * 60 * 1000, max: 30 };
const TOKEN_WINDOW = { windowMs: 5 * 60 * 1000, max: 20 };

function json(body: { ok: boolean }, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function clientKey(request: Request, kind: "get" | "post" | "flood"): string {
  const ip = getClientIp(request) ?? "unknown";
  return hashClientKey(`${kind}:${ip}`);
}

function tooMany(retryAfterMs: number) {
  return json(
    { ok: false },
    429,
    { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
  );
}

function limitAcceptedPost(request: Request) {
  const windowLimit = consumeRateLimit(clientKey(request, "post"), POST_WINDOW);
  if (!windowLimit.ok) return windowLimit;

  return consumeRateLimit(`${clientKey(request, "post")}:burst`, POST_BURST);
}

export async function GET(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json({ ok: false }, 403);
  }

  const limited = consumeRateLimit(clientKey(request, "get"), TOKEN_WINDOW);
  if (!limited.ok) return tooMany(limited.retryAfterMs);

  return NextResponse.json(
    { ok: true, token: createContactFormToken() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json({ ok: false }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false }, 415);
  }

  const flood = consumeRateLimit(clientKey(request, "flood"), POST_FLOOD);
  if (!flood.ok) return tooMany(flood.retryAfterMs);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ ok: false }, 400);
  }

  const data = body as Record<string, unknown>;
  if (isHoneypotFilled(data)) {
    const limited = limitAcceptedPost(request);
    if (!limited.ok) return tooMany(limited.retryAfterMs);
    return json({ ok: true });
  }

  const tokenStatus = verifyContactFormToken(data.token);
  if (tokenStatus !== "ok") {
    return json({ ok: false }, 400);
  }

  const submission = parseContactSubmission(body);
  if (!submission) {
    return json({ ok: false }, 400);
  }

  const limited = limitAcceptedPost(request);
  if (!limited.ok) return tooMany(limited.retryAfterMs);

  if (looksLikeSpam(submission)) {
    return json({ ok: true });
  }

  try {
    await appendContactToSheet(submission);
    return json({ ok: true });
  } catch {
    return json({ ok: false }, 502);
  }
}
