export function initFaq() {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  if (!items.length) return;

  const close = (item) => {
    const button = item.querySelector("[data-faq-button]");
    const panel = item.querySelector("[data-faq-panel]");
    item.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
    if (!panel) return;
    // hidden pas zetten nadat de sluit-animatie klaar is
    const onEnd = (event) => {
      if (event.propertyName !== "grid-template-rows") return;
      if (!item.classList.contains("is-open")) panel.setAttribute("hidden", "");
      panel.removeEventListener("transitionend", onEnd);
    };
    panel.addEventListener("transitionend", onEnd);
    window.setTimeout(() => {
      if (!item.classList.contains("is-open")) panel.setAttribute("hidden", "");
    }, 500);
  };

  const open = (item) => {
    const button = item.querySelector("[data-faq-button]");
    const panel = item.querySelector("[data-faq-panel]");
    if (!panel) return;
    panel.removeAttribute("hidden");
    // eerst zichtbaar maken, dan in het volgende frame de transitie starten
    window.requestAnimationFrame(() => {
      item.classList.add("is-open");
      button?.setAttribute("aria-expanded", "true");
    });
  };

  items.forEach((item) => {
    const button = item.querySelector("[data-faq-button]");
    if (!button) return;

    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      items.forEach((other) => {
        if (other.classList.contains("is-open")) close(other);
      });
      if (willOpen) open(item);
    });
  });
}
