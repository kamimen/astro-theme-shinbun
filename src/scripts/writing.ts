import { autoTcy } from "../../vendor/shinbun.js";

function setup(): void {
  const paper = document.querySelector<HTMLElement>(".sb-paper");
  const toggle = document.querySelector<HTMLAnchorElement>("[data-writing-toggle]");
  if (!paper) return;
  if (paper.dataset.sbWriting === "vertical") autoTcy(paper);
  if (!toggle) return;

  toggle.hidden = false;
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    const writing = toggle.dataset.writingToggle ?? "horizontal";
    const vertical = writing === "vertical";
    paper.dataset.sbWriting = writing;
    paper.style.removeProperty(vertical ? "--sb-dan-h" : "--sb-dan");
    paper.style.setProperty(vertical ? "--sb-dan" : "--sb-dan-h", (vertical ? paper.dataset.danV : paper.dataset.danH) ?? "6");
    if (vertical) {
      paper.setAttribute("data-sb-auto-tcy", "");
      autoTcy(paper);
    }
    const next = vertical ? "horizontal" : "vertical";
    toggle.dataset.writingToggle = next;
    toggle.textContent = next === "horizontal" ? "横組みで読む" : "縦組みで読む";
  });
}

setup();
document.addEventListener("astro:page-load", setup);
