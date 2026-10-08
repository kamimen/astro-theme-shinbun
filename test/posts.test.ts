import test from "node:test";
import assert from "node:assert/strict";
import { groupByMonth, isPublished, paginate, postsByTag, publishedPosts, sortPosts, uniqueTags } from "../src/utils/posts.ts";
import type { PostLike } from "../src/types.ts";

const post = (id: string, date: string, extra: Partial<PostLike["data"]> = {}): PostLike => ({
  id,
  data: { title: id, description: "", pubDatetime: new Date(date), tags: ["a"], ...extra },
});

test("下書きは公開しない", () => {
  assert.equal(isPublished(post("x", "2020-01-01T00:00:00Z", { draft: true })), false);
});

test("予約投稿は、公開時刻の前は出さない。開発中は出す", () => {
  const p = post("x", "2030-01-01T00:00:00Z");
  const now = Date.parse("2029-12-31T00:00:00Z");
  assert.equal(isPublished(p, { now }), false);
  assert.equal(isPublished(p, { now, dev: true }), true);
});

test("予約投稿の余裕（margin）の分だけ、早く出る", () => {
  const p = post("x", "2030-01-01T00:10:00Z");
  const now = Date.parse("2030-01-01T00:00:00Z");
  assert.equal(isPublished(p, { now, scheduledMargin: 15 * 60 * 1000 }), true);
  assert.equal(isPublished(p, { now, scheduledMargin: 5 * 60 * 1000 }), false);
});

test("並べ替えは、更新日があればそれを使い、新しい順", () => {
  const a = post("a", "2020-01-01T00:00:00Z", { modDatetime: new Date("2020-03-01T00:00:00Z") });
  const b = post("b", "2020-02-01T00:00:00Z");
  assert.deepEqual(sortPosts([b, a]).map((p) => p.id), ["a", "b"]);
});

test("publishedPosts: 下書きを除いて新しい順", () => {
  const list = [post("old", "2020-01-01T00:00:00Z"), post("draft", "2021-01-01T00:00:00Z", { draft: true }), post("new", "2022-01-01T00:00:00Z")];
  assert.deepEqual(publishedPosts(list, { now: Date.parse("2025-01-01T00:00:00Z") }).map((p) => p.id), ["new", "old"]);
});

test("uniqueTags: 件数の多い順、同数は五十音順", () => {
  const list = [post("1", "2020-01-01T00:00:00Z", { tags: ["い", "あ"] }), post("2", "2020-01-02T00:00:00Z", { tags: ["い"] })];
  assert.deepEqual(uniqueTags(list), [{ tag: "い", count: 2 }, { tag: "あ", count: 1 }]);
});

test("postsByTag", () => {
  const list = [post("1", "2020-01-01T00:00:00Z", { tags: ["a"] }), post("2", "2020-01-02T00:00:00Z", { tags: ["b"] })];
  assert.deepEqual(postsByTag(list, "b").map((p) => p.id), ["2"]);
});

test("groupByMonth: 月ごとに、新しい月から。日本時間で数える", () => {
  const list = [post("a", "2026-09-30T16:00:00Z"), post("b", "2026-09-01T00:00:00Z"), post("c", "2026-08-15T00:00:00Z")];
  const groups = groupByMonth(list, "Asia/Tokyo");
  assert.deepEqual(groups.map((g) => g.label), ["2026年10月", "2026年9月", "2026年8月"]);
  assert.deepEqual(groups[0]?.posts.map((p) => p.id), ["a"]);
});

test("paginate: 範囲外のページは端に丸める", () => {
  const items = [1, 2, 3, 4, 5];
  assert.deepEqual(paginate(items, 2, 2), { items: [3, 4], page: 2, pages: 3 });
  assert.deepEqual(paginate(items, 2, 99).items, [5]);
  assert.deepEqual(paginate([], 2, 1), { items: [], page: 1, pages: 1 });
});
