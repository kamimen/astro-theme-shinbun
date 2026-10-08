import test from "node:test";
import assert from "node:assert/strict";
import { formatDateKanji, toKanjiNumber, verticalHeadlineSize } from "../src/utils/format.ts";

test("漢数字: 1〜31", () => {
  assert.deepEqual([1, 9, 10, 11, 20, 21, 30, 31].map(toKanjiNumber), ["一", "九", "十", "十一", "二十", "二十一", "三十", "三十一"]);
});

test("縦組みの日付は、年を一桁ずつの漢数字、月日を漢数字にする", () => {
  assert.equal(formatDateKanji(new Date("2026-10-05T00:00:00+09:00"), "Asia/Tokyo"), "二〇二六年十月五日");
});

test("縦組みの見出しの大きさは、字数が多いほど小さくする", () => {
  assert.equal(verticalHeadlineSize("短い見出し"), "xl");
  assert.equal(verticalHeadlineSize("川のまちの書斎、開館まで"), "l");
  assert.equal(verticalHeadlineSize("川のまちの書斎、開館までの道のり、その後"), "m");
});
