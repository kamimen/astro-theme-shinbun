import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const name = process.argv[2];
if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error("使い方: npm run new-post <ファイル名（半角の英小文字、数字、ハイフン）>");
  process.exit(1);
}

const file = join("src", "content", "posts", `${name}.md`);
if (existsSync(file)) {
  console.error(`すでにあります: ${file}`);
  process.exit(1);
}

const now = new Date();
const pad = (n: number) => String(n).padStart(2, "0");
const offset = -now.getTimezoneOffset();
const sign = offset >= 0 ? "+" : "-";
const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:00${sign}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;

writeFileSync(
  file,
  `---\ntitle: 見出しを入れる\ndescription: 記事の要点を、一文で書く。リードとして表示される。\npubDatetime: ${stamp}\ntags: [その他]\ndraft: true\n---\n\n本文を書く。\n`,
);
console.log(`作りました: ${file}`);
