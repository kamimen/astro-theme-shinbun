import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import config from "../config.ts";
import { withBase } from "../utils/url.ts";
import { publishedPosts } from "../utils/posts.ts";

export async function GET(context: APIContext) {
  const posts = publishedPosts(await getCollection("posts"), { scheduledMargin: config.posts.scheduledMargin });
  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site ?? config.site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.modDatetime ?? p.data.pubDatetime,
      link: withBase(`/posts/${p.id}/`),
    })),
  });
}
