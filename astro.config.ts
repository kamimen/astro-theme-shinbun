import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import rehypeFigure from "./src/plugins/rehype-figure.ts";
import config from "./shinbun.config.ts";

export default defineConfig({
  site: process.env.SITE_URL || config.site.url,
  base: process.env.SITE_BASE || config.site.base || "/",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  image: {
    layout: "constrained",
    responsiveStyles: true,
    domains: config.images?.domains ?? [],
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeFigure] }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: true,
    },
  },
});
