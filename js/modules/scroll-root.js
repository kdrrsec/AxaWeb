/** Scroll container for the app-shell layout (falls back to window). */
export function getScrollRoot() {
  return document.querySelector("[data-scroll-root]");
}

export function getScrollY() {
  const root = getScrollRoot();
  return root ? root.scrollTop : window.scrollY;
}

export function getScrollMax() {
  const root = getScrollRoot();
  if (root) return Math.max(0, root.scrollHeight - root.clientHeight);
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function onScroll(handler, options) {
  const root = getScrollRoot();
  const target = root || window;
  target.addEventListener("scroll", handler, options);
  return () => target.removeEventListener("scroll", handler, options);
}
