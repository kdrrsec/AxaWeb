import { initCustomSelects, focusSelectControl } from "./select.js";

const messages = {
  nameRequired: "Vul je naam in.",
  emailRequired: "Vul je e-mailadres in.",
  emailInvalid: "Vul een geldig e-mailadres in.",
  phoneInvalid: "Vul een geldig telefoonnummer in.",
  projectRequired: "Selecteer een type project.",
  messageRequired: "Vul een bericht in.",
  privacyRequired: "Bevestig dat je akkoord gaat met de privacyverklaring.",
  sending: "Bericht wordt verzonden…",
  success: "Bedankt! We nemen zo snel mogelijk contact met je op.",
  error: "Er ging iets mis. Probeer het later opnieuw of mail naar info@axaweb.nl.",
};

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
      setFieldError(fields.name, errors.name, messages.nameRequired);
      valid = false;
    } else {
      setFieldError(fields.name, errors.name, "");
    }

    if (!email) {
      setFieldError(fields.email, errors.email, messages.emailRequired);
      valid = false;
    } else if (!validateEmail(email)) {
      setFieldError(fields.email, errors.email, messages.emailInvalid);
      valid = false;
    } else {
      setFieldError(fields.email, errors.email, "");
    }

    if (!validatePhone(phone)) {
      setFieldError(fields.phone, errors.phone, messages.phoneInvalid);
      valid = false;
    } else {
      setFieldError(fields.phone, errors.phone, "");
    }

    if (!projectType) {
      setFieldError(fields.projectType, errors.projectType, messages.projectRequired);
      valid = false;
    } else {
      setFieldError(fields.projectType, errors.projectType, "");
    }

    if (!message) {
      setFieldError(fields.message, errors.message, messages.messageRequired);
      valid = false;
    } else {
      setFieldError(fields.message, errors.message, "");
    }

    if (!privacy) {
      setFieldError(fields.privacy, errors.privacy, messages.privacyRequired);
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
    setStatus(statusEl, messages.sending, "info");

    const payload = {
      name: fields.name.value.trim(),
      company: fields.company.value.trim() || "Niet opgegeven",
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim() || "Niet opgegeven",
      projectType: fields.projectType.value,
      budget: fields.budget.value || "Nog niet bepaald",
      message: fields.message.value.trim(),
      privacy: "Akkoord",
      _subject: "Nieuw bericht via axaweb.nl",
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
      setStatus(statusEl, messages.success, "success");
    } catch {
      setStatus(statusEl, messages.error, "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
