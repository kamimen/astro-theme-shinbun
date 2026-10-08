import { withBase } from "./url.ts";

export function formatDate(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("ja-JP", { timeZone, year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function formatDateWithWeekday(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("ja-JP", { timeZone, year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString();
}

export function tagHref(tag: string): string {
  return withBase(`/tags/${encodeURIComponent(tag)}/`);
}

const DIGITS = "〇一二三四五六七八九";

export function toKanjiNumber(n: number): string {
  if (n < 10) return DIGITS[n] ?? "";
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${tens === 1 ? "" : DIGITS[tens]}十${ones === 0 ? "" : DIGITS[ones]}`;
}

export function formatDateKanji(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("ja-JP", { timeZone, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const year = [...get("year")].map((c) => DIGITS[Number(c)] ?? c).join("");
  return `${year}年${toKanjiNumber(Number(get("month")))}月${toKanjiNumber(Number(get("day")))}日`;
}

export function verticalHeadlineSize(title: string): "xl" | "l" | "m" {
  const length = [...title].length;
  if (length <= 7) return "xl";
  return length <= 13 ? "l" : "m";
}
