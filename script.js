const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

const messages = {
  emailRequired: "Vul uw e-mailadres in.",
  emailInvalid: "Vul een geldig e-mailadres in.",
  phoneRequired: "Vul uw telefoonnummer in.",
  phoneInvalid: "Vul een geldig telefoonnummer in.",
  messageRequired: "Vul een bericht in.",
  sending: "Bericht wordt verzonden…",
  success: "Bedankt! We nemen zo snel mogelijk contact met je op.",
  error: "Er ging iets mis. Probeer het later opnieuw of mail naar info@axaweb.nl.",
};

function setFieldError(field, errorEl, message) {
  const wrap = field.closest(".field");
  if (message) {
    wrap.classList.add("field--error");
    errorEl.textContent = message;
    errorEl.hidden = false;
    field.setAttribute("aria-invalid", "true");
  } else {
    wrap.classList.remove("field--error");
    errorEl.textContent = "";
    errorEl.hidden = true;
    field.removeAttribute("aria-invalid");
  }
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

function validateForm() {
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();
  let valid = true;

  if (!email) {
    setFieldError(emailInput, emailError, messages.emailRequired);
    valid = false;
  } else if (!validateEmail(email)) {
    setFieldError(emailInput, emailError, messages.emailInvalid);
    valid = false;
  } else {
    setFieldError(emailInput, emailError, "");
  }

  if (!phone) {
    setFieldError(phoneInput, phoneError, messages.phoneRequired);
    valid = false;
  } else if (!validatePhone(phone)) {
    setFieldError(phoneInput, phoneError, messages.phoneInvalid);
    valid = false;
  } else {
    setFieldError(phoneInput, phoneError, "");
  }

  if (!message) {
    setFieldError(messageInput, messageError, messages.messageRequired);
    valid = false;
  } else {
    setFieldError(messageInput, messageError, "");
  }

  return valid;
}

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.hidden = !message;
  formStatus.classList.remove("form-status--success", "form-status--error");
  if (type) formStatus.classList.add(`form-status--${type}`);
}

emailInput.addEventListener("input", () => setFieldError(emailInput, emailError, ""));
phoneInput.addEventListener("input", () => setFieldError(phoneInput, phoneError, ""));
messageInput.addEventListener("input", () => setFieldError(messageInput, messageError, ""));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("");

  if (!validateForm()) return;

  submitBtn.disabled = true;
  setStatus(messages.sending);

  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  const payload = {
    email,
    phone,
    message,
    _subject: "Nieuw bericht via axaweb.nl",
    _replyto: email,
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
    setStatus(messages.success, "success");
  } catch {
    setStatus(messages.error, "error");
  } finally {
    submitBtn.disabled = false;
  }
});
