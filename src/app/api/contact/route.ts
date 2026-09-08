import { NextResponse } from "next/server";

import { parseContactSubmission } from "@/lib/contact-form";
import { appendContactToSheet } from "@/lib/google-sheet";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const submission = parseContactSubmission(body);
  if (!submission) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await appendContactToSheet(submission);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
