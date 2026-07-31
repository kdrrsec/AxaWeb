/**
 * Vercel Serverless Function: POST /api/contact
 * Valideert de aanvraag, past spamfilters toe en verstuurt via FormSubmit.
 */

import { createHash } from "node:crypto";
import { validateContactPayload } from "../js/lib/contact-validation.js";
import { checkDuplicateSubmission, checkRateLimit } from "./lib/rate-limit.js";
import { sendContactEmail } from "./lib/mail.js";
import { assertTrustedOrigin } from "./lib/origin.js";
import { sendJson } from "./lib/http.js";

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        reject(Object.assign(new Error("Payload too large"), { code: "PAYLOAD" }));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { code: "JSON" }));
      }
    });
    req.on("error", reject);
  });
}

function mapFieldErrors(fields) {
  const mapped = {};
  for (const [key, code] of Object.entries(fields)) {
    mapped[key] = code;
  }
  return mapped;
}

function submissionFingerprint(ip, data) {
  return createHash("sha256")
    .update(`${ip}|${data.email}|${data.message}`)
    .digest("hex");
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Allow", "POST, OPTIONS");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" }, { Allow: "POST" });
    return;
  }

  const contentType = String(req.headers["content-type"] || "");
  if (contentType && !contentType.includes("application/json")) {
    sendJson(res, 415, { ok: false, error: "unsupported_media_type" });
    return;
  }

  const trust = assertTrustedOrigin(req);
  if (!trust.ok) {
    sendJson(res, 403, { ok: false, error: "forbidden" });
    return;
  }

  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      sendJson(
        res,
        429,
        { ok: false, error: "rate_limited" },
        { "Retry-After": String(rate.retryAfterSec) }
      );
      return;
    }

    const payload = await readJson(req);
    const result = validateContactPayload(payload);

    if (!result.ok) {
      if (result.code === "spam") {
        /* Stil accepteren voor honeypot-bots; geen mail, geen details. */
        sendJson(res, 200, { ok: true });
        return;
      }

      if (result.code === "too_fast") {
        sendJson(res, 429, { ok: false, error: "rate_limited" });
        return;
      }

      sendJson(res, 400, {
        ok: false,
        error: "validation_failed",
        fields: mapFieldErrors(result.fields),
      });
      return;
    }

    const dedupe = checkDuplicateSubmission(submissionFingerprint(ip, result.data));
    if (dedupe.duplicate) {
      /* Idempotent succes: voorkom dubbele mails bij double-click / retry. */
      sendJson(res, 200, { ok: true });
      return;
    }

    await sendContactEmail(result.data);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    if (error?.code === "JSON" || error?.code === "PAYLOAD") {
      sendJson(res, 400, { ok: false, error: "invalid_request" });
      return;
    }

    const code = error?.code === "CONFIG" ? "config_error" : "server_error";
    console.error("[contact]", code, error?.status || "");
    sendJson(res, error?.code === "CONFIG" ? 503 : 500, { ok: false, error: code });
  }
}
