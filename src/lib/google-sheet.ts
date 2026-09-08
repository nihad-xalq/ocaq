import type { ContactSubmission } from "@/lib/contact-form";

export async function appendContactToSheet(
  submission: ContactSubmission,
): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!url) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
    // Apps Script always 302s after doPost. Following that redirect as POST
    // often fails even though the row was already written.
    redirect: "manual",
  });

  if (response.ok) {
    await assertSheetOk(response);
    return;
  }

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location) return;

    try {
      const redirected = await fetch(location, {
        method: "GET",
        redirect: "follow",
      });
      await assertSheetOk(redirected);
    } catch (error) {
      if (error instanceof SheetWriteError) throw error;
      // Redirect body is often unreadable; the write may still have succeeded.
    }
    return;
  }

  if (response.type === "opaqueredirect") return;

  throw new Error(`Sheet webhook failed with ${response.status}`);
}

class SheetWriteError extends Error {}

async function assertSheetOk(response: Response) {
  const text = await response.text();
  if (!text) return;

  try {
    const payload = JSON.parse(text) as { ok?: boolean };
    if (payload.ok === false) {
      throw new SheetWriteError("Sheet webhook returned ok: false");
    }
  } catch (error) {
    if (error instanceof SyntaxError) return;
    throw error;
  }
}
