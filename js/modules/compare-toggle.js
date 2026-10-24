/** Vergelijkingstabel in- en uitklappen (pakkettenpagina). */
export function initCompareToggle() {
  document.querySelectorAll("[data-compare-collapsible]").forEach((root) => {
    const button = root.querySelector("[data-compare-toggle]");
    const label = root.querySelector("[data-compare-toggle-label]");
    if (!button || !label) return;

    button.addEventListener("click", () => {
      const expand = root.classList.contains("is-collapsed");
      root.classList.toggle("is-collapsed", !expand);
      button.setAttribute("aria-expanded", String(expand));
      label.textContent = expand ? button.dataset.labelLess : button.dataset.labelMore;
      if (!expand) root.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });
}
