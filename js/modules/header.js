export function initHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (!header || !toggle || !mobileNav) return;

  const links = mobileNav.querySelectorAll("a");
  let lockedScrollY = 0;

  /*
   * iOS Safari: fixed elements align to the layout viewport while page content
   * scrolls with the visual viewport when the URL bar animates. offsetTop is the
   * gap between layout and visual top — translate fixed UI by that amount.
   */
  const updateViewportOffset = () => {
    const offset = window.visualViewport?.offsetTop ?? 0;
    document.documentElement.style.setProperty("--viewport-offset", `${offset}px`);
  };

  const lockBodyScroll = () => {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `${-lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockBodyScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  };

  const setOpen = (open) => {
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";

    if (open && !wasOpen) lockBodyScroll();
    if (!open && wasOpen) unlockBodyScroll();

    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    mobileNav.classList.toggle("is-open", open);
    mobileNav.hidden = !open;
    mobileNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);

    updateViewportOffset();
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
    const y = document.body.classList.contains("nav-open") ? lockedScrollY : window.scrollY;
    header.classList.toggle("is-scrolled", y > 1);
  };

  const onViewportChange = () => {
    updateViewportOffset();
    onScroll();
  };

  onViewportChange();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onViewportChange, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", onViewportChange, { passive: true });
    window.visualViewport.addEventListener("scroll", onViewportChange, { passive: true });
  }
}
