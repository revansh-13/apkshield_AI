/**
 * Formats a timestamp into a deterministic UTC date string.
 * This prevents hydration mismatches caused by differing local timezones
 * or browser locale settings between server and client.
 *
 * Output format: "Jan 1, 2026 12:00 UTC"
 */
export function formatDeterministicDate(timestamp: string): string {
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return "N/A";

  const year = d.getUTCFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getUTCMonth()];
  const day = d.getUTCDate();
  
  const hours = String(d.getUTCHours()).padStart(2, "0");
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
}
