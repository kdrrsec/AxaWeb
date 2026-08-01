/**
 * E-mailverzending voor contactaanvragen via FormSubmit browser-handoff.
 * (FormSubmit blokkeert serverless/Cloudflare-verzoeken; daarom stuurt de browser zelf.)
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

export function getContactRecipient() {
  return (process.env.CONTACT_TO_EMAIL || DEFAULT_TO).trim();
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

  const rows = [
    [messages.email.fields.name, data.name],
    [messages.email.fields.company, data.company || notProvided],
    [messages.email.fields.email, data.email],
    [messages.email.fields.phone, data.phone || notProvided],
    [messages.email.fields.projectType, projectLabel],
    [messages.email.fields.budget, budgetLabel],
    [messages.email.fields.message, data.message],
    [messages.email.fields.submittedAt, formatDateTime(data.submittedAt)],
    [messages.email.fields.sourcePage, data.sourcePage],
  ];

  const text = [messages.email.intro, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join(
    "\n"
  );

  const htmlRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${escapeHtml(messages.email.intro)}</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
        ${htmlRows}
      </table>
    </div>
  `;

  const formSubmitFields = Object.fromEntries(rows);

  return { subject, text, html, formSubmitFields };
}

/**
 * Bouwt FormSubmit-payload voor browser-handoff.
 * FormSubmit blokkeert verzoeken vanaf Vercel serverless (Cloudflare 403).
 */
export function buildFormSubmitHandoff(data) {
  const to = getContactRecipient();
  if (!to || !to.includes("@")) {
    const error = new Error("Missing mail configuration");
    error.code = "CONFIG";
    throw error;
  }

  const { subject, formSubmitFields } = buildContactEmail(data);
  return {
    mode: "formsubmit_browser",
    endpoint: `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    body: {
      ...formSubmitFields,
      _subject: subject,
      _replyto: data.email,
      _template: "table",
      _captcha: "false",
    },
  };
}

/**
 * @returns {Promise<{ mode: 'formsubmit_browser', endpoint: string, body: object }>}
 */
export async function sendContactEmail(data) {
  return buildFormSubmitHandoff(data);
}
