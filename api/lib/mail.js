/**
 * E-mailverzending via FormSubmit naar het AxaWeb-contactadres.
 * Geen API-sleutels nodig; ontvanger is configureerbaar via env.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const DEFAULT_TO = "info@axaweb.nl";

function loadFormMessages() {
  const file = join(root, "messages/nl/form.json");
  return JSON.parse(readFileSync(file, "utf8"));
}

function labelFor(options, value, fallback) {
  const match = options.find((item) => item.value === value);
  return match?.label || value || fallback;
}

function formatDateTime(iso) {
  try {
    return new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Amsterdam",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function buildContactEmail(data) {
  const messages = loadFormMessages();
  const notProvided = messages.fallbacks.notProvided;
  const identity = data.company || data.name;
  const subject = messages.email.subject.replace("{identity}", identity);
  const projectLabel = labelFor(messages.options.projectTypes, data.projectType, data.projectType);
  const budgetLabel = data.budget
    ? labelFor(messages.options.budget, data.budget, data.budget)
    : notProvided;

  const rows = {
    [messages.email.fields.name]: data.name,
    [messages.email.fields.company]: data.company || notProvided,
    [messages.email.fields.email]: data.email,
    [messages.email.fields.phone]: data.phone || notProvided,
    [messages.email.fields.projectType]: projectLabel,
    [messages.email.fields.budget]: budgetLabel,
    [messages.email.fields.message]: data.message,
    [messages.email.fields.submittedAt]: formatDateTime(data.submittedAt),
    [messages.email.fields.sourcePage]: data.sourcePage,
  };

  return { subject, rows };
}

/**
 * Verstuurt de gevalideerde aanvraag via FormSubmit AJAX.
 * @see https://formsubmit.co/ajax-documentation
 */
export async function sendContactEmail(data) {
  const to = (process.env.CONTACT_TO_EMAIL || DEFAULT_TO).trim();
  if (!to || !to.includes("@")) {
    const error = new Error("Missing mail configuration");
    error.code = "CONFIG";
    throw error;
  }

  const { subject, rows } = buildContactEmail(data);

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...rows,
      _subject: subject,
      _replyto: data.email,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    const error = new Error("Mail provider rejected the request");
    error.code = "PROVIDER";
    error.status = response.status;
    throw error;
  }

  const result = await response.json().catch(() => ({}));
  if (result.success === "false" || result.success === false) {
    const error = new Error("Mail provider reported failure");
    error.code = "PROVIDER";
    throw error;
  }

  return result;
}
