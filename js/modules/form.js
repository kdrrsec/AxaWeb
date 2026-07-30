import { initCustomSelects, focusSelectControl } from "./select.js";
import { t } from "./i18n.js";

function formMessage(key) {
  const value = t(`form.${key}`);
  return value === `form.${key}` ? "" : value;
}

function setFieldError(field, errorEl, message) {
  const wrap = field.closest(".field") || field.closest(".checkbox")?.parentElement;
  if (!errorEl) return;

  if (message) {
    wrap?.classList.add("field--error");
    errorEl.textContent = message;
    errorEl.hidden = false;
    field.setAttribute("aria-invalid", "true");
  } else {
    wrap?.classList.remove("field--error");
    errorEl.textContent = "";
    errorEl.hidden = true;
    field.removeAttribute("aria-invalid");
  }
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  if (!value) return true;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

function setStatus(statusEl, message, type) {
  statusEl.textContent = message;
  statusEl.hidden = !message;
  statusEl.classList.remove("form-status--success", "form-status--error", "form-status--info");
  if (type) statusEl.classList.add(`form-status--${type}`);
}

export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  initCustomSelects(form);

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

  const validate = () => {
    let valid = true;
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const phone = fields.phone.value.trim();
    const projectType = fields.projectType.value;
    const message = fields.message.value.trim();
    const privacy = fields.privacy.checked;

    if (!name) {
      setFieldError(fields.name, errors.name, formMessage("nameRequired"));
      valid = false;
    } else {
      setFieldError(fields.name, errors.name, "");
    }

    if (!email) {
      setFieldError(fields.email, errors.email, formMessage("emailRequired"));
      valid = false;
    } else if (!validateEmail(email)) {
      setFieldError(fields.email, errors.email, formMessage("emailInvalid"));
      valid = false;
    } else {
      setFieldError(fields.email, errors.email, "");
    }

    if (!validatePhone(phone)) {
      setFieldError(fields.phone, errors.phone, formMessage("phoneInvalid"));
      valid = false;
    } else {
      setFieldError(fields.phone, errors.phone, "");
    }

    if (!projectType) {
      setFieldError(fields.projectType, errors.projectType, formMessage("projectRequired"));
      valid = false;
    } else {
      setFieldError(fields.projectType, errors.projectType, "");
    }

    if (!message) {
      setFieldError(fields.message, errors.message, formMessage("messageRequired"));
      valid = false;
    } else {
      setFieldError(fields.message, errors.message, "");
    }

    if (!privacy) {
      setFieldError(fields.privacy, errors.privacy, formMessage("privacyRequired"));
      valid = false;
    } else {
      setFieldError(fields.privacy, errors.privacy, "");
    }

    return valid;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(statusEl, "");

    if (!validate()) {
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid?.tagName === "SELECT") focusSelectControl(firstInvalid);
      else firstInvalid?.focus();
      return;
    }

    submitBtn.disabled = true;
    setStatus(statusEl, formMessage("sending"), "info");

    const payload = {
      name: fields.name.value.trim(),
      company: fields.company.value.trim() || formMessage("notProvided"),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim() || formMessage("notProvided"),
      projectType: fields.projectType.value,
      budget: fields.budget.value || formMessage("budgetUndecided"),
      message: fields.message.value.trim(),
      privacy: formMessage("privacyAccepted"),
      _subject: formMessage("emailSubject"),
      _replyto: fields.email.value.trim(),
      _template: "table",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@axaweb.nl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setStatus(statusEl, formMessage("success"), "success");
    } catch {
      setStatus(statusEl, formMessage("error"), "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
