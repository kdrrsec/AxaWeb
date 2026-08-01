import { onScroll } from "./scroll-root.js";

const FINE_POINTER = "(pointer: fine) and (hover: hover)";
const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], summary, label[for], input, select, textarea, .btn, [data-cursor="hover"]';

const TEXT_TARGET = "input, textarea, [contenteditable='true']";

function canUseCustomCursor() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (window.matchMedia(REDUCE_MOTION).matches) return false;
  return window.matchMedia(FINE_POINTER).matches;
}

function isEditable(target) {
  if (!target || typeof target.closest !== "function") return false;
  const el = target.closest(TEXT_TARGET);
  if (!el) return false;
  if (el.tagName === "INPUT") {
    const type = (el.getAttribute("type") || "text").toLowerCase();
    return !["button", "submit", "reset", "checkbox", "radio", "file", "color", "range"].includes(type);
  }
  return true;
}

/**
 * Subtiele custom cursor (dot + ring) voor desktop.
 * Alleen bij fine pointer; uit bij reduced motion of touch.
 */
export function initCursor() {
  if (!canUseCustomCursor()) return;
  if (document.getElementById("axa-cursor")) return;

  const root = document.documentElement;
  root.classList.add("has-custom-cursor");

  const cursor = document.createElement("div");
  cursor.id = "axa-cursor";
  cursor.className = "axa-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<span class="axa-cursor__dot"></span><span class="axa-cursor__ring"></span>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector(".axa-cursor__dot");
  const ring = cursor.querySelector(".axa-cursor__ring");

  let visible = false;
  let hovering = false;
  let editing = false;
  let scrolling = false;
  let scrollTimer = 0;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let raf = 0;

  const setVisible = (next) => {
    if (visible === next) return;
    visible = next;
    cursor.classList.toggle("is-visible", visible);
  };

  const syncState = () => {
    cursor.classList.toggle("is-hover", hovering && !editing);
    cursor.classList.toggle("is-editing", editing);
    cursor.classList.toggle("is-scrolling", scrolling && !editing);
    root.classList.toggle("has-custom-cursor--editing", editing);
  };

  const render = () => {
    raf = 0;
    ringX += (pointerX - ringX) * 0.22;
    ringY += (pointerY - ringY) * 0.22;
    if (dot) {
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    }
    if (ring) {
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    if (Math.abs(pointerX - ringX) > 0.1 || Math.abs(pointerY - ringY) > 0.1) {
      raf = window.requestAnimationFrame(render);
    }
  };

  const queueRender = () => {
    if (!raf) raf = window.requestAnimationFrame(render);
  };

  const onPointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    setVisible(true);
    queueRender();
  };

  const onPointerOver = (event) => {
    const target = event.target;
    editing = isEditable(target);
    hovering = !editing && Boolean(target?.closest?.(INTERACTIVE));
    syncState();
  };

  const onPointerOut = (event) => {
    if (event.relatedTarget) return;
    setVisible(false);
    hovering = false;
    editing = false;
    syncState();
  };

  const onPointerDown = () => {
    cursor.classList.add("is-down");
  };

  const onPointerUp = () => {
    cursor.classList.remove("is-down");
  };

  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerover", onPointerOver, { passive: true });
  document.addEventListener("pointerout", onPointerOut, { passive: true });
  document.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("blur", () => setVisible(false));

  onScroll(
    () => {
      if (editing) return;
      scrolling = true;
      syncState();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        syncState();
      }, 140);
    },
    { passive: true }
  );

  queueRender();
}
