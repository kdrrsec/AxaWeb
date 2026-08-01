/**
 * Early Consent Mode v2 defaults (sync, non-module).
 * Must load before any analytics tags. Restores prior consent from localStorage.
 */
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  try {
    var raw = localStorage.getItem("axaweb_consent_v1");
    if (!raw) return;
    var state = JSON.parse(raw);
    if (!state || !state.updatedAt) return;

    gtag("consent", "update", {
      analytics_storage: state.statistics ? "granted" : "denied",
      ad_storage: state.marketing ? "granted" : "denied",
      ad_user_data: state.marketing ? "granted" : "denied",
      ad_personalization: state.marketing ? "granted" : "denied",
    });
  } catch {
    /* ignore */
  }
})();
