/**
 * E-mailverzending voor contactaanvragen.
 *
 * Preferentie:
 * 1. Resend (server-side) wanneer RESEND_API_KEY + CONTACT_FROM_EMAIL gezet zijn
 * 2. Anders: browser-handoff naar FormSubmit (FormSubmit blokkeert serverless/Cloudflare)
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

function hasResendConfig() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim() &&
      getContactRecipient()
  );
}

async function sendViaResend(data) {
  const apiKey = process.env.RESEND_API_KEY.trim();
  const to = getContactRecipient();
  const from = process.env.CONTACT_FROM_EMAIL.trim();
  const { subject, text, html } = buildContactEmail(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const error = new Error("Resend rejected the request");
    error.code = "PROVIDER";
    error.status = response.status;
    error.detail = detail.slice(0, 200);
    throw error;
  }

  return { mode: "resend" };
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
 * @returns {Promise<{ mode: 'resend' } | { mode: 'formsubmit_browser', endpoint: string, body: object }>}
 */
export async function sendContactEmail(data) {
  if (hasResendConfig()) {
    return sendViaResend(data);
  }
  return buildFormSubmitHandoff(data);
}
