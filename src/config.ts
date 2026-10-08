import user from "../shinbun.config.ts";
import type { ResolvedConfig, Writing } from "./types.ts";

const config: ResolvedConfig = {
  site: {
    ...user.site,
    subtitle: user.site.subtitle ?? "",
    lang: user.site.lang ?? "ja",
    timezone: user.site.timezone ?? "Asia/Tokyo",
    base: user.site.base ?? "/",
  },
  writing: user.writing ?? "horizontal",
  paper: { dan: user.paper?.dan ?? 6, verticalDan: user.paper?.verticalDan ?? 6, fontSize: user.paper?.fontSize ?? "0.95rem" },
  masthead: { left: user.masthead?.left ?? [], right: user.masthead?.right ?? [] },
  images: { domains: user.images?.domains ?? [] },
  nav: user.nav ?? [],
  socials: user.socials ?? [],
  posts: {
    perPage: user.posts?.perPage ?? 7,
    columns: user.posts?.columns ?? 1,
    scheduledMargin: user.posts?.scheduledMargin ?? 15 * 60 * 1000,
  },
  features: {
    darkMode: user.features?.darkMode ?? true,
    archives: user.features?.archives ?? true,
    transitions: user.features?.transitions ?? true,
  },
};

export default config;

export function danFor(writing: Writing): number {
  return writing === "vertical" ? config.paper.verticalDan : config.paper.dan;
}
