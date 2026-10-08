import test from "node:test";
import assert from "node:assert/strict";
import rehypeFigure from "../src/plugins/rehype-figure.ts";

const img = (props: Record<string, unknown>) => ({ type: "element", tagName: "img", properties: props, children: [] });
const root = (...children: unknown[]) => ({ type: "root", children }) as never;

test("単独の画像の段落を、figure に変える。title は figcaption になる", () => {
  const tree = root({ type: "element", tagName: "p", properties: {}, children: [img({ src: "a.jpg", alt: "a", title: "説明" })] });
  rehypeFigure()(tree);
  const figure = (tree as { children: { tagName: string; children: { tagName: string }[] }[] }).children[0]!;
  assert.equal(figure.tagName, "figure");
  assert.deepEqual(figure.children.map((c) => c.tagName), ["img", "figcaption"]);
});

test("title がなければ figcaption を付けない", () => {
  const tree = root({ type: "element", tagName: "p", properties: {}, children: [img({ src: "a.jpg", alt: "a" })] });
  rehypeFigure()(tree);
  const figure = (tree as { children: { children: unknown[] }[] }).children[0]!;
  assert.equal(figure.children.length, 1);
});

test("文章の中の画像は、そのまま残す", () => {
  const tree = root({ type: "element", tagName: "p", properties: {}, children: [{ type: "text", value: "前" }, img({ src: "a.jpg" })] });
  rehypeFigure()(tree);
  assert.equal((tree as { children: { tagName: string }[] }).children[0]!.tagName, "p");
});

test("入れ子の要素の中でも変換する", () => {
  const tree = root({ type: "element", tagName: "blockquote", properties: {}, children: [{ type: "element", tagName: "p", properties: {}, children: [img({ src: "a.jpg" })] }] });
  rehypeFigure()(tree);
  const inner = (tree as { children: { children: { tagName: string }[] }[] }).children[0]!.children[0]!;
  assert.equal(inner.tagName, "figure");
});
