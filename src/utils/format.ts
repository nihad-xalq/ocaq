/** Shared formatting helpers — keep pure and side-effect free. */

export function formatYear(date = new Date()): number {
  return date.getFullYear();
}
