![astro-theme-shinbun icon](assets/icon.svg)

# astro-theme-shinbun

An Astro blog theme for writing in Japanese in the style of a newspaper page. The page parts come from [shinbun.css](https://github.com/kamimen/shinbun-css).

![license: MIT](https://img.shields.io/badge/license-MIT-blue) ![Astro 7](https://img.shields.io/badge/Astro-7-ff5d01) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![tested: Chrome](https://img.shields.io/badge/tested-Chrome-brightgreen) ![not tested: Firefox, Safari](https://img.shields.io/badge/not%20tested-Firefox%20%C2%B7%20Safari-red)

[日本語](README.md) | English

![Home page (horizontal writing)](assets/preview-home.png)

![Post page (vertical writing)](assets/preview-vertical.png)

People, organizations, events and photos in the sample are fictional.

## Features

**The page**
- [x] The blog name becomes the nameplate, and the newest post becomes the top story
- [x] Tags become the "sections" of the paper (a page per section, and an index)
- [x] Horizontal writing is the default. Each post can be shown in vertical writing
- [x] Readers can switch between horizontal and vertical writing on a post page
- [x] Light and dark pages, and the choice is remembered

**Writing**
- [x] Markdown and MDX (post frontmatter is type-checked with Astro content collections)
- [x] Drafts (`draft: true`) and posts dated in the future are not published
- [x] A table of contents box for long posts
- [x] Code blocks switch colors between the light and dark pages (Shiki)
- [x] `npm run new-post` creates a post template

**Images**
- [x] Astro's image optimization (WebP, `srcset`, lazy loading)
- [x] Top story photo, list thumbnails, images in the post body (with captions), and OG images

**Publishing**
- [x] RSS, a sitemap, robots.txt, canonical URLs, Open Graph, and structured data (JSON-LD)
- [x] Page transitions (`ClientRouter`) and link prefetching
- [x] Base path support (`site.base`), so it works on GitHub Pages project pages
- [x] One configuration file: `shinbun.config.ts`

## Project structure

```
/
├── public/
│   └── favicon.svg
├── scripts/
│   ├── new-post.ts             create a post template
│   ├── update-theme.ts         pull in theme updates
│   └── make-sample-images.ts   generate the dummy sample images
├── src/
│   ├── assets/photos/          sample photos
│   ├── components/             nameplate, folio, article, pagination, ...
│   ├── content/
│   │   ├── pages/about.md
│   │   └── posts/              posts (.md and .mdx)
│   ├── i18n/ja.ts              UI strings
│   ├── layouts/                Layout.astro
│   ├── pages/                  home, post, tag, archives, about, 404, RSS
│   ├── plugins/rehype-figure.ts  turn body images into photos (figure)
│   ├── scripts/                light/dark switch, horizontal/vertical switch
│   ├── styles/blog.css         blog adjustments on top of shinbun.css
│   ├── utils/                  filtering, sorting, dates, ...
│   ├── config.ts               configuration with defaults filled in
│   └── content.config.ts       post frontmatter types
├── test/                       unit tests
├── vendor/                     shinbun.css (CSS and JavaScript)
├── astro.config.ts
└── shinbun.config.ts           the file you edit
```

Posts go in `src/content/posts/`.

## Getting started

1. Use this repository as a GitHub template, or fork it. You can also create a project with:

   ```sh
   npm create astro@latest -- --template kamimen/astro-theme-shinbun
   ```
2. Run:

   ```sh
   npm install
   npm run dev
   ```

3. Edit `shinbun.config.ts` (nameplate, description, author, URL, menu)
4. Run `npm run new-post <file-name>` to create a post (in `src/content/posts/`, with `draft: true`; remove it when you finish)
5. Run `npm run build` to build a static site in `dist/`

Node.js 22.12 or later is required.

## Configuration (`shinbun.config.ts`)

| Option | Meaning |
|---|---|
| `site.url`, `site.title`, `site.subtitle`, `site.description`, `site.author` | Site information. `url` is where you publish |
| `site.base` | Base path of the site. For GitHub Pages project pages, `"/repository-name/"` |
| `site.timezone` | Time zone for dates (default `Asia/Tokyo`) |
| `writing` | Writing direction of the site: `"horizontal"` or `"vertical"` |
| `paper.dan`, `paper.verticalDan`, `paper.fontSize` | Number of dan (columns) for horizontal and vertical pages, and the font size |
| `masthead.left`, `masthead.right` | Text on the left and right of the nameplate |
| `images.domains` | Remote image domains allowed for optimization |
| `nav`, `socials` | Menu and footer links |
| `posts.perPage`, `posts.columns`, `posts.scheduledMargin` | Posts per page, columns in a post (default 1), and how early scheduled posts appear (milliseconds) |
| `features.darkMode`, `features.archives`, `features.transitions` | Dark page switch, archives, and page transitions |

## Post frontmatter

```yaml
---
title: Headline
description: One sentence about the post. It is shown as the lead
pubDatetime: 2026-10-07T09:00:00+09:00
tags: [town, architecture]
kicker: Midori City   # small headline above the headline; defaults to the first tag
dateline: Midori City # place of dispatch
byline: Taro Kaku     # byline; defaults to the site author
writing: vertical     # show only this post in vertical writing
image: ../../assets/photos/library.jpg   # post photo
imageAlt: Photo description
draft: false
---
```

## Images

- **Post photo**: set `image` in the frontmatter with a path relative to the post's Markdown file. It appears large on the top story and the post page, as a thumbnail in lists, and as the OG image
- **Images in the body**: write `![description](../../assets/x.jpg "caption")` in Markdown. Images in `src/` are optimized automatically. A `"caption"` becomes the photo caption (`figcaption`)
- **MDX**: `.mdx` posts can use the `Image` component (see `src/content/posts/code-sample.mdx`)
- **Remote images**: list allowed domains in `images.domains`. Images from other domains are not optimized
- Images in `public/` are not optimized

## Writing vertical posts

- Dates are shown in kanji numerals (二〇二六年十月五日) in vertical writing
- Numbers in the body are shown as you write them. In vertical posts, two-digit numbers become tate-chu-yoko. For three or more digits, and for years, kanji numerals read better
- Photos are shown with a limited height in vertical writing

## Changing colors

The page colors come from shinbun.css tokens. Override them in `src/styles/blog.css`.

```css
.sb-paper {
  --sb-paper: light-dark(#f4eedd, #17140f);   /* paper color (light, dark) */
  --sb-ink: light-dark(#1b1812, #eee6d2);     /* text color */
  --sb-accent: light-dark(#a02a1f, #e5786b);  /* accent such as shoulder headlines */
}
```

The list of tokens is in the [shinbun.css API](https://github.com/kamimen/shinbun-css/blob/main/docs/API.md).

## License

[MIT License](LICENSE)
