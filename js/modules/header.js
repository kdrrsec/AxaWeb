import { getScrollRoot, getScrollY, onScroll } from "./scroll-root.js";

export function initHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (!header || !toggle || !mobileNav) return;

  const links = mobileNav.querySelectorAll("a");
  const scrollRoot = getScrollRoot();

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    mobileNav.classList.toggle("is-open", open);
    mobileNav.hidden = !open;
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);

    /* Lock only the scroll pane — header stays put, no layout shift */
    if (scrollRoot) {
      scrollRoot.style.overflow = open ? "hidden" : "";
    }
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const onScrollChange = () => {
    header.classList.toggle("is-scrolled", getScrollY() > 1);
  };

  onScrollChange();
  onScroll(onScrollChange, { passive: true });
  window.addEventListener("resize", onScrollChange, { passive: true });
}
