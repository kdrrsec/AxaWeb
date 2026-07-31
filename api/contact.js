/**
 * Vercel Serverless Function: POST /api/contact
 * Valideert de aanvraag, past spamfilters toe en verstuurt via FormSubmit.
 */

import { validateContactPayload } from "../js/lib/contact-validation.js";
import { checkRateLimit } from "./lib/rate-limit.js";
import { sendContactEmail } from "./lib/mail.js";

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
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
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

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end(JSON.stringify({ ok: false, error: "method_not_allowed" }));
    return;
  }

  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      res.statusCode = 429;
      res.setHeader("Retry-After", String(rate.retryAfterSec));
      res.end(JSON.stringify({ ok: false, error: "rate_limited" }));
      return;
    }

    const payload = await readJson(req);
    const result = validateContactPayload(payload);

    if (!result.ok) {
      if (result.code === "spam") {
        /* Stil accepteren voor honeypot-bots; geen mail, geen details. */
        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      if (result.code === "too_fast") {
        res.statusCode = 429;
        res.end(JSON.stringify({ ok: false, error: "rate_limited" }));
        return;
      }

      res.statusCode = 400;
      res.end(
        JSON.stringify({
          ok: false,
          error: "validation_failed",
          fields: mapFieldErrors(result.fields),
        })
      );
      return;
    }

    await sendContactEmail(result.data);

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    const code = error?.code === "CONFIG" ? "config_error" : "server_error";
    console.error("[contact]", code, error?.status || "");
    res.statusCode = error?.code === "CONFIG" ? 503 : 500;
    res.end(JSON.stringify({ ok: false, error: code }));
  }
}
