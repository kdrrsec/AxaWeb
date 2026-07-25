export function initFaq() {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector("[data-faq-button]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      items.forEach((other) => {
        const otherButton = other.querySelector("[data-faq-button]");
        const otherPanel = other.querySelector("[data-faq-panel]");
        other.classList.remove("is-open");
        otherButton?.setAttribute("aria-expanded", "false");
        otherPanel?.setAttribute("hidden", "");
      });

      if (willOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        panel.removeAttribute("hidden");
      }
    });
  });
}
