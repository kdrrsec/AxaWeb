import { initCustomSelects, focusSelectControl } from "./select.js";
import { t } from "./i18n.js";
import {
  validateContactPayload,
  isValidEmail,
  isValidPhone,
  MESSAGE_MIN_LENGTH,
} from "../lib/contact-validation.js";
import { trackFormSuccess } from "./tracking.js";

function formMessage(path) {
  const value = t(`form.${path}`);
  return value === `form.${path}` ? "" : value;
}

function errorText(code) {
  if (!code) return "";
  return formMessage(`errors.${code}`) || formMessage(code) || code;
}

function setFieldError(field, errorEl, message) {
  const wrap = field.closest(".field") || field.closest(".checkbox")?.parentElement;
  if (!errorEl) return;

  const customTrigger = field.id
    ? document.getElementById(`${field.id}-button`)
    : null;

  if (message) {
    wrap?.classList.add("field--error");
    errorEl.textContent = message;
    errorEl.hidden = false;
    field.setAttribute("aria-invalid", "true");
    customTrigger?.setAttribute("aria-invalid", "true");
  } else {
    wrap?.classList.remove("field--error");
    errorEl.textContent = "";
    errorEl.hidden = true;
    field.removeAttribute("aria-invalid");
    customTrigger?.removeAttribute("aria-invalid");
  }
}

function setStatus(statusEl, message, type) {
  statusEl.textContent = message;
  statusEl.hidden = !message;
  statusEl.classList.remove("form-status--success", "form-status--error", "form-status--info");
  if (type) statusEl.classList.add(`form-status--${type}`);
}

function setSubmitting(form, submitBtn, isSubmitting) {
  form.setAttribute("aria-busy", String(isSubmitting));
  submitBtn.disabled = isSubmitting;
  submitBtn.classList.toggle("is-loading", isSubmitting);
  const defaultLabel = submitBtn.dataset.labelDefault || formMessage("actions.submit");
  const loadingLabel = submitBtn.dataset.labelLoading || formMessage("actions.submitting");
  submitBtn.textContent = isSubmitting ? loadingLabel : defaultLabel;
}

function focusStatus(statusEl) {
  try {
    statusEl.focus({ preventScroll: false });
  } catch {
    statusEl.focus();
  }
  statusEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function collectPayload(fields, form) {
  return {
    name: fields.name.value,
    company: fields.company.value,
    email: fields.email.value,
    phone: fields.phone.value,
    projectType: fields.projectType.value,
    budget: fields.budget.value,
    message: fields.message.value,
    privacy: fields.privacy.checked,
    website: form.querySelector("#website")?.value || "",
    formStartedAt: Number(form.querySelector("#formStartedAt")?.value || 0),
    sourcePage: form.querySelector("#sourcePage")?.value || window.location.pathname || "/contact",
  };
}

function applyClientFieldChecks(fields, errors) {
  const payload = {
    name: fields.name.value,
    company: fields.company.value,
    email: fields.email.value,
    phone: fields.phone.value,
    projectType: fields.projectType.value,
    budget: fields.budget.value,
    message: fields.message.value,
    privacy: fields.privacy.checked,
    website: "",
    formStartedAt: Date.now() - 10_000,
  };

  const result = validateContactPayload(payload);
  const fieldMap = result.ok ? {} : result.fields;

  Object.entries(errors).forEach(([key, errorEl]) => {
    const field = fields[key];
    if (!field || !errorEl) return;
    setFieldError(field, errorEl, errorText(fieldMap[key]));
  });

  return result.ok;
}

export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  initCustomSelects(form);

  const startedAt = form.querySelector("#formStartedAt");
  if (startedAt) startedAt.value = String(Date.now());

  const sourcePage = form.querySelector("#sourcePage");
  if (sourcePage && !sourcePage.value) {
    sourcePage.value = window.location.pathname || "/contact";
  }

  const fields = {
    name: form.querySelector("#name"),
    company: form.querySelector("#company"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    projectType: form.querySelector("#projectType"),
    budget: form.querySelector("#budget"),
    message: form.querySelector("#message"),
    privacy: form.querySelector("#privacy"),
  };

  const errors = {
    name: form.querySelector("#nameError"),
    email: form.querySelector("#emailError"),
    phone: form.querySelector("#phoneError"),
    projectType: form.querySelector("#projectTypeError"),
    budget: form.querySelector("#budgetError"),
    message: form.querySelector("#messageError"),
    privacy: form.querySelector("#privacyError"),
  };

  const statusEl = form.querySelector("#formStatus");
  const submitBtn = form.querySelector("#submitBtn");

  const clearOnInput = [
    ["name", "name"],
    ["email", "email"],
    ["phone", "phone"],
    ["projectType", "projectType"],
    ["budget", "budget"],
    ["message", "message"],
    ["privacy", "privacy"],
  ];

  clearOnInput.forEach(([fieldKey, errorKey]) => {
    const field = fields[fieldKey];
    const errorEl = errors[errorKey];
    if (!field || !errorEl) return;
    const eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => setFieldError(field, errorEl, ""));
  });

  let isSubmitting = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus(statusEl, "");

    if (!applyClientFieldChecks(fields, errors)) {
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid?.tagName === "SELECT") focusSelectControl(firstInvalid);
      else firstInvalid?.focus();
      return;
    }

    /* Extra snelle client-check voor UX (message length hint) */
    const message = fields.message.value.trim();
    if (message.length > 0 && message.length < MESSAGE_MIN_LENGTH) {
      setFieldError(fields.message, errors.message, errorText("messageTooShort"));
      fields.message.focus();
      return;
    }
    if (fields.email.value.trim() && !isValidEmail(fields.email.value.trim())) {
      setFieldError(fields.email, errors.email, errorText("emailInvalid"));
      fields.email.focus();
      return;
    }
    if (fields.phone.value.trim() && !isValidPhone(fields.phone.value.trim())) {
      setFieldError(fields.phone, errors.phone, errorText("phoneInvalid"));
      fields.phone.focus();
      return;
    }

    isSubmitting = true;
    setSubmitting(form, submitBtn, true);
    setStatus(statusEl, formMessage("status.sending") || formMessage("sending"), "info");

    const payload = collectPayload(fields, form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 403) {
        setStatus(statusEl, formMessage("status.error") || formMessage("error"), "error");
        focusStatus(statusEl);
        return;
      }

      if (response.status === 429) {
        setStatus(statusEl, formMessage("status.rateLimited") || formMessage("error"), "error");
        focusStatus(statusEl);
        return;
      }

      if (response.status === 503 || data.error === "config_error") {
        setStatus(statusEl, formMessage("status.configError") || formMessage("error"), "error");
        focusStatus(statusEl);
        return;
      }

      if (response.status === 400 && data.fields) {
        Object.entries(data.fields).forEach(([key, code]) => {
          if (fields[key] && errors[key]) {
            setFieldError(fields[key], errors[key], errorText(code));
          }
        });
        const firstInvalid = form.querySelector("[aria-invalid='true']");
        if (firstInvalid?.tagName === "SELECT") focusSelectControl(firstInvalid);
        else firstInvalid?.focus();
        setStatus(statusEl, "", "");
        return;
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "request_failed");
      }

      /* FormSubmit werkt niet vanaf Vercel serverless (Cloudflare). Browser-handoff. */
      if (data.delivery === "formsubmit_browser" && data.formsubmit?.endpoint) {
        const mailResponse = await fetch(data.formsubmit.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data.formsubmit.body || {}),
        });

        let mailData = {};
        try {
          mailData = await mailResponse.json();
        } catch {
          mailData = {};
        }

        if (
          !mailResponse.ok ||
          mailData.success === false ||
          mailData.success === "false"
        ) {
          const msg = String(mailData.message || "").toLowerCase();
          if (msg.includes("confirm") || msg.includes("activat") || msg.includes("verify")) {
            setStatus(
              statusEl,
              formMessage("status.activationPending") || formMessage("status.configError"),
              "error"
            );
            focusStatus(statusEl);
            return;
          }
          throw new Error("formsubmit_failed");
        }
      }

      trackFormSuccess(form);
      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
      if (sourcePage && !sourcePage.value) {
        sourcePage.value = window.location.pathname || "/contact";
      }
      setStatus(statusEl, formMessage("status.success") || formMessage("success"), "success");
      focusStatus(statusEl);
    } catch {
      setStatus(statusEl, formMessage("status.error") || formMessage("error"), "error");
      focusStatus(statusEl);
    } finally {
      isSubmitting = false;
      setSubmitting(form, submitBtn, false);
    }
  });
}
