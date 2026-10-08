interface Node {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
}

const isBlank = (node: Node) => node.type === "text" && !node.value?.trim();

function loneImage(p: Node): Node | null {
  const children = (p.children ?? []).filter((c) => !isBlank(c));
  const only = children[0];
  return children.length === 1 && only?.type === "element" && only.tagName === "img" ? only : null;
}

function toFigure(img: Node): Node {
  const props = { ...img.properties };
  const title = typeof props.title === "string" ? props.title : "";
  delete props.title;
  const className = Array.isArray(props.className) ? props.className : [];
  const image: Node = { ...img, properties: { ...props, className: [...className, "sb-photo__img"] } };
  const children: Node[] = [image];
  if (title) {
    children.push({ type: "element", tagName: "figcaption", properties: { className: ["sb-photo__caption"] }, children: [{ type: "text", value: title }] });
  }
  return { type: "element", tagName: "figure", properties: { className: ["sb-photo"] }, children };
}

function walk(node: Node): void {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === "element" && child.tagName === "p") {
      const img = loneImage(child);
      if (img) return toFigure(img);
    }
    walk(child);
    return child;
  });
}

export default function rehypeFigure() {
  return (tree: Node) => walk(tree);
}
