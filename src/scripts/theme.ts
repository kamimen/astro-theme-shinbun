const root = document.documentElement;

function stored(): string {
  try {
    const value = localStorage.getItem("theme");
    if (value) return value;
  } catch {}
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(theme: string): void {
  root.dataset.theme = theme;
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((b) => b.setAttribute("aria-pressed", String(theme === "dark")));
}

function setup(): void {
  apply(stored());
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      apply(next);
    });
  });
}

setup();
document.addEventListener("astro:after-swap", () => apply(stored()));
document.addEventListener("astro:page-load", setup);
