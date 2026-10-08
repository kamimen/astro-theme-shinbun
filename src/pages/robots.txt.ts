import type { APIContext } from "astro";
import { withBase } from "../utils/url.ts";

export function GET({ site }: APIContext) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase("/sitemap-index.xml"), site).href}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
