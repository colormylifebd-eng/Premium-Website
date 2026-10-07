const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

const banglaNumber = new Intl.NumberFormat("bn-BD");

const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

/** Replaces ASCII digits with Bangla digits without grouping, e.g. 2026 → "২০২৬". */
export function toBanglaDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => BANGLA_DIGITS[Number(digit)]);
}

/** Converts Bangla digits to ASCII so input like "৮৫০০" can be parsed. */
export function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => String(BANGLA_DIGITS.indexOf(digit)));
}

/** Formats a number with Bangla digits and grouping, e.g. 125000 → "১,২৫,০০০". */
export function toBanglaNumber(value: number): string {
  return banglaNumber.format(value);
}

/** Formats a Taka price for display, e.g. 8500 → "৳৮,৫০০". */
export function formatPrice(value: number): string {
  return `৳${toBanglaNumber(value)}`;
}

/** Formats a date in Bangla using Bangladesh time, e.g. "৬ অক্টোবর, ২০২৬". */
export function formatDate(date: Date): string {
  return banglaDate.format(date);
}

/** Collapses whitespace and shortens text to `max` characters for meta descriptions. */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}
