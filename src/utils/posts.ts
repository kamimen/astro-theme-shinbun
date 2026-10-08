import type { PostLike } from "../types.ts";

export interface FilterOptions {
  now?: number;
  dev?: boolean;
  scheduledMargin?: number;
}

export function isPublished(post: PostLike, { now = Date.now(), dev = false, scheduledMargin = 0 }: FilterOptions = {}): boolean {
  if (post.data.draft) return false;
  return dev || now > post.data.pubDatetime.getTime() - scheduledMargin;
}

export function sortPosts<T extends PostLike>(posts: T[]): T[] {
  const time = (p: T) => (p.data.modDatetime ?? p.data.pubDatetime).getTime();
  return [...posts].sort((a, b) => time(b) - time(a));
}

export function publishedPosts<T extends PostLike>(posts: T[], options: FilterOptions = {}): T[] {
  return sortPosts(posts.filter((p) => isPublished(p, options)));
}

export function uniqueTags(posts: PostLike[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const tag of p.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
}

export function postsByTag<T extends PostLike>(posts: T[], tag: string): T[] {
  return posts.filter((p) => p.data.tags.includes(tag));
}

export function groupByMonth<T extends PostLike>(posts: T[], timeZone: string): { key: string; label: string; posts: T[] }[] {
  const fmt = new Intl.DateTimeFormat("ja-JP", { timeZone, year: "numeric", month: "numeric" });
  const groups = new Map<string, { key: string; label: string; posts: T[] }>();
  for (const p of posts) {
    const parts = fmt.formatToParts(p.data.pubDatetime);
    const y = parts.find((x) => x.type === "year")?.value ?? "";
    const m = parts.find((x) => x.type === "month")?.value ?? "";
    const key = `${y}-${m.padStart(2, "0")}`;
    const group = groups.get(key) ?? { key, label: `${y}年${m}月`, posts: [] };
    group.posts.push(p);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => b.key.localeCompare(a.key));
}

export function paginate<T>(items: T[], perPage: number, page: number): { items: T[]; page: number; pages: number } {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(page, 1), pages);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, pages };
}
