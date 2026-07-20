/** Private report access — set REPORT_ACCESS_TOKEN in .env */

export function getReportAccessToken(): string | undefined {
  const token = process.env.REPORT_ACCESS_TOKEN?.trim();
  return token || undefined;
}

/** Returns true only when a token is configured and the query matches. */
export function canAccessReport(tokenFromQuery?: string | null): boolean {
  const required = getReportAccessToken();
  if (!required) return false;
  if (!tokenFromQuery) return false;
  return tokenFromQuery === required;
}

export function reportShareUrl(clientId: string, origin?: string): string {
  const token = getReportAccessToken() ?? "YOUR_TOKEN";
  const base = origin ?? "";
  return `${base}/raporlar/${clientId}?t=${encodeURIComponent(token)}`;
}
