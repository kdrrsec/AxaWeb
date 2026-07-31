/**
 * Language switcher: aanwezig in de DOM, standaard verborgen.
 * Activeer later door data-enabled="true" te zetten (via i18n/config.js
 * languageSwitcherEnabled tijdens generate).
 */
export function initLanguageSwitcher() {
  const root = document.querySelector("[data-language-switcher]");
  if (!root) return;

  const enabled = root.getAttribute("data-enabled") === "true";
  root.hidden = !enabled;
  root.setAttribute("aria-hidden", enabled ? "false" : "true");

  if (!enabled) return;

  root.querySelectorAll("[data-locale]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
      }
    });
  });
}
