import { mkdirSync } from "node:fs";
import sharp from "sharp";

const OUT = "src/assets/photos";
mkdirSync(OUT, { recursive: true });

const photos = [
  { name: "library", from: "#b9c4cf", to: "#5f7389", label: "ダミー画像: 煉瓦倉庫" },
  { name: "river", from: "#c9cfb8", to: "#6f7d6c", label: "ダミー画像: 夜の川沿い" },
  { name: "bento", from: "#d8c9b0", to: "#8e7a5f", label: "ダミー画像: 駅弁" },
];

for (const p of photos) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1067">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.from}"/><stop offset="1" stop-color="${p.to}"/></linearGradient></defs>
    <rect width="1600" height="1067" fill="url(#g)"/>
    <path d="M0 820 L360 560 L600 720 L860 480 L1180 700 L1600 520 L1600 1067 L0 1067 Z" fill="#000" opacity=".18"/>
    <circle cx="1220" cy="260" r="90" fill="#fff" opacity=".55"/>
    <text x="800" y="980" font-size="56" text-anchor="middle" fill="#fff" opacity=".85" font-family="sans-serif">${p.label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`${OUT}/${p.name}.jpg`);
  console.log(`作りました: ${OUT}/${p.name}.jpg`);
}
