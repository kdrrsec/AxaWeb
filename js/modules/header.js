export function initHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (!header || !toggle || !mobileNav) return;

  const links = mobileNav.querySelectorAll("a");

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    mobileNav.classList.toggle("is-open", open);
    mobileNav.hidden = !open;
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
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

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
