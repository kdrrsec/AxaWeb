/**
 * Gedeelde contactformulier-validatie (browser + server).
 * Pure helpers zonder DOM of Node-only API's.
 */

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 5000;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 120;
export const COMPANY_MAX_LENGTH = 160;
export const MIN_SUBMIT_MS = 2500;

export const PROJECT_TYPE_VALUES = [
  "website",
  "webshop",
  "website-as-a-service",
  "hosting",
  "onderhoud",
  "maatwerk",
  "anders",
];

export const BUDGET_VALUES = [
  "under-1000",
  "1000-2500",
  "2500-5000",
  "5000-10000",
  "over-10000",
  "to-discuss",
];

export function isValidEmail(value) {
  if (!value || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value) {
  if (!value) return true;
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function looksLikeSpam(text) {
  const value = String(text || "");
  const urlMatches = value.match(/https?:\/\/|www\./gi) || [];
  if (urlMatches.length >= 4) return true;
  if (/(viagra|casino|crypto\s*invest|seo\s*backlinks|porn)/i.test(value)) return true;
  if ((value.match(/[^\s]{40,}/g) || []).length >= 3) return true;
  return false;
}

/**
 * @param {Record<string, unknown>} input
 * @returns {{ ok: true, data: object } | { ok: false, fields: Record<string, string>, code?: string }}
 */
export function validateContactPayload(input) {
  const fields = {};
  const name = String(input.name ?? "").trim();
  const company = String(input.company ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const phone = String(input.phone ?? "").trim();
  const projectType = String(input.projectType ?? "").trim();
  const budget = String(input.budget ?? "").trim();
  const message = String(input.message ?? "").trim();
  const privacy = Boolean(input.privacy);
  const honeypot = String(input.website ?? input.faxNumber ?? "").trim();
  const formStartedAt = Number(input.formStartedAt);
  const sourcePage = String(input.sourcePage ?? "").trim().slice(0, 500);

  if (honeypot) {
    return { ok: false, fields: {}, code: "spam" };
  }

  if (Number.isFinite(formStartedAt) && formStartedAt > 0) {
    const elapsed = Date.now() - formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_SUBMIT_MS) {
      return { ok: false, fields: {}, code: "too_fast" };
    }
  }

  if (!name) fields.name = "nameRequired";
  else if (name.length < NAME_MIN_LENGTH) fields.name = "nameTooShort";
  else if (name.length > NAME_MAX_LENGTH) fields.name = "nameTooShort";

  if (!email) fields.email = "emailRequired";
  else if (!isValidEmail(email)) fields.email = "emailInvalid";

  if (phone && !isValidPhone(phone)) fields.phone = "phoneInvalid";

  if (!projectType) fields.projectType = "projectRequired";
  else if (!PROJECT_TYPE_VALUES.includes(projectType)) fields.projectType = "projectInvalid";

  if (budget && !BUDGET_VALUES.includes(budget)) fields.budget = "budgetInvalid";

  if (!message) fields.message = "messageRequired";
  else if (message.length < MESSAGE_MIN_LENGTH) fields.message = "messageTooShort";
  else if (message.length > MESSAGE_MAX_LENGTH) fields.message = "messageTooLong";

  if (!privacy) fields.privacy = "privacyRequired";

  if (company.length > COMPANY_MAX_LENGTH) {
    fields.company = "nameTooShort";
  }

  if (Object.keys(fields).length) {
    return { ok: false, fields };
  }

  if (looksLikeSpam(`${name} ${company} ${message}`)) {
    return { ok: false, fields: {}, code: "spam" };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      projectType,
      budget,
      message,
      privacy: true,
      sourcePage: sourcePage || "/",
      submittedAt: new Date().toISOString(),
    },
  };
}
