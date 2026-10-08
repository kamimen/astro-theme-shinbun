import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/[^_]*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.coerce.date(),
      modDatetime: z.coerce.date().optional().nullable(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default(["その他"]),
      image: image().optional(),
      imageAlt: z.string().default(""),
      writing: z.enum(["horizontal", "vertical"]).optional(),
      kicker: z.string().optional(),
      dateline: z.string().optional(),
      byline: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, pages };
