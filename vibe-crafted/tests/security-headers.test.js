// SEC-01: vercel.json must send an enforced CSP plus anti-framing headers,
// and every inline <script> we ship must be allowed by hash — so editing an
// inline script without updating its hash fails here, not in production.

import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..");
const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));

function headersFor(source) {
  const rule = (vercel.headers || []).find((h) => h.source === source);
  return Object.fromEntries((rule?.headers || []).map((h) => [h.key.toLowerCase(), h.value]));
}

function inlineScripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
    out.push(m[2]);
  }
  return out;
}

const sha = (s) => `'sha256-${createHash("sha256").update(s, "utf8").digest("base64")}'`;

const pages = [
  "index.html",
  ...readdirSync(join(root, "public/case-studies"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => `public/case-studies/${f}`),
];

describe("vercel.json security headers", () => {
  const h = headersFor("/(.*)");
  const csp = h["content-security-policy"] || "";
  const scriptSrc = (csp.split(";").find((d) => d.trim().startsWith("script-src")) || "").trim();

  it("enforces a CSP that blocks framing and plugins", () => {
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  it("sends the non-CSP hardening headers", () => {
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"]).toBeTruthy();
  });

  it.each(pages)("allows every inline script in %s by hash", (page) => {
    const scripts = inlineScripts(readFileSync(join(root, page), "utf8"));
    for (const s of scripts) expect(scriptSrc).toContain(sha(s));
  });
});
