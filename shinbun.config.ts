import { defineShinbunConfig } from "./src/types.ts";

export default defineShinbunConfig({
  site: {
    url: "https://example.com",
    title: "川のまち日報",
    subtitle: "架空の町の、架空の日報",
    description: "新聞の紙面のように書く、日本語のブログ。この内容はすべて架空です。",
    author: "架空太郎",
    lang: "ja",
    timezone: "Asia/Tokyo",
    base: "/",
  },
  writing: "horizontal",
  paper: { dan: 6, verticalDan: 6, fontSize: "0.95rem" },
  masthead: {
    left: ["架空の町の記録"],
    right: ["毎日更新（架空）"],
  },
  images: { domains: [] },
  nav: [
    { label: "トップ", href: "/" },
    { label: "アーカイブ", href: "/archives/" },
    { label: "タグ", href: "/tags/" },
    { label: "このブログについて", href: "/about/" },
  ],
  socials: [{ name: "GitHub", url: "https://github.com/kamimen/astro-theme-shinbun" }],
  posts: { perPage: 7, columns: 1, scheduledMargin: 15 * 60 * 1000 },
  features: { darkMode: true, archives: true, transitions: true },
});
