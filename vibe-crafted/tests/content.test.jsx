// UX-01..: approved Batch 5 changes from the UI audit — calls to action that
// say what they do, copy that matches its sources, a real 404, self-hosted
// fonts. Each block names the audit item it guards.

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { PORTFOLIO } from "../src/data/portfolio.jsx";

vi.mock("@vercel/analytics", () => ({ inject: vi.fn() }));

const root = join(__dirname, "..");
const read = (f) => readFileSync(join(root, f), "utf8");
const vercel = JSON.parse(read("vercel.json"));
const csp = vercel.headers.find((h) => h.source === "/(.*)").headers
  .find((h) => h.key === "Content-Security-Policy").value;
const caseStudies = readdirSync(join(root, "public/case-studies")).filter((f) => f.endsWith(".html"));

beforeEach(() => {
  window.matchMedia = (q) => ({
    matches: false, media: q, addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  });
  window.IntersectionObserver = class {
    observe() {} unobserve() {} disconnect() {}
  };
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  const ctx = new Proxy({}, { get: (t, k) => (k in t ? t[k] : () => ({ addColorStop() {} })), set: (t, k, v) => ((t[k] = v), true) });
  HTMLCanvasElement.prototype.getContext = () => ctx;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function renderApp() {
  const { App } = await import("../src/app.jsx");
  return render(<App />);
}

describe("R1 / M1 — the fold", () => {
  it("states the role in the hero strip", async () => {
    const { container } = await renderApp();
    expect(container.querySelector(".hero__strip").textContent).toContain(PORTFOLIO.role);
  });

  it("shows the lede and calls to action without waiting on a scroll reveal", async () => {
    const { container } = await renderApp();
    expect(container.querySelector(".hero__lede").closest(".reveal")).toBeNull();
    expect(container.querySelector(".hero__cta").closest(".reveal")).toBeNull();
  });
});

describe("U1–U3 — calls to action say what they do", () => {
  it("labels the work jump as projects, not results", async () => {
    await renderApp();
    const jump = screen.getByRole("link", { name: /see the 18 projects/i });
    expect(jump.getAttribute("href")).toBe("#projects");
  });

  it("offers a mailto next to the copy button", async () => {
    await renderApp();
    const write = screen.getByRole("link", { name: /write email/i });
    expect(write.getAttribute("href")).toBe(`mailto:${PORTFOLIO.email}`);
  });

  it("marks every CV link as a PDF download", async () => {
    const { container } = await renderApp();
    const cvLinks = [...container.querySelectorAll(`a[href="${PORTFOLIO.resume}"]`)];
    expect(cvLinks.length).toBeGreaterThan(0);
    cvLinks.forEach((a) => {
      expect(a.hasAttribute("download")).toBe(true);
      expect(a.textContent + (a.getAttribute("aria-label") || "")).toMatch(/pdf/i);
    });
  });
});

describe("R4 / R6 — copy matches its sources and the nav", () => {
  it("shows the FoodCorp figure in pounds and the classifier as approximate", async () => {
    const { container } = await renderApp();
    const rack = container.querySelector(".rack").textContent;
    expect(rack).toContain("£1.29");
    expect(rack).toContain("~97");
  });

  it("names sections with the same words as the nav", async () => {
    const { container } = await renderApp();
    const names = [...container.querySelectorAll(".sect-meta__name")].map((n) => n.textContent);
    expect(names).toEqual(expect.arrayContaining(["About", "Contact"]));
    expect(names).not.toContain("Profile");
    expect(names).not.toContain("Signal out");
  });

  it("puts the contact actions first in the command palette", async () => {
    await renderApp();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const options = await screen.findAllByRole("option");
    expect(options[0].textContent).toMatch(/copy email/i);
  });
});

describe("C4 / C5 — real 404 and icons", () => {
  it("serves missing paths a 404 instead of rewriting them to the homepage", () => {
    const catchAll = (vercel.rewrites || []).find((r) => r.source === "/(.*)");
    expect(catchAll).toBeUndefined();
    expect(existsSync(join(root, "public/404.html"))).toBe(true);
  });

  it("allows the 404 page's inline script by hash", () => {
    const html = read("public/404.html");
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const s of scripts) {
      const hash = `'sha256-${createHash("sha256").update(s, "utf8").digest("base64")}'`;
      expect(csp).toContain(hash);
    }
  });

  it("ships a favicon file and an apple-touch icon", () => {
    expect(existsSync(join(root, "public/favicon.svg"))).toBe(true);
    expect(existsSync(join(root, "public/apple-touch-icon.png"))).toBe(true);
    const index = read("index.html");
    expect(index).toContain('href="favicon.svg"');
    expect(index).toContain('href="apple-touch-icon.png"');
  });
});

describe("P4 — self-hosted fonts", () => {
  it("loads no font CSS from Google on any page", () => {
    for (const page of ["index.html", ...caseStudies.map((f) => `public/case-studies/${f}`)]) {
      expect(read(page)).not.toContain("fonts.googleapis.com");
    }
  });

  it("points every @font-face at a file that exists", () => {
    const sources = [read("src/styles/globals.css"), read("public/case-studies/case-study.css")]
      .flatMap((css) => [...css.matchAll(/url\("?(?:\.\.)?\/?(fonts\/[^")]+)"?\)/g)].map((m) => m[1]));
    expect(sources.length).toBeGreaterThanOrEqual(3);
    for (const f of sources) expect(existsSync(join(root, "public", f))).toBe(true);
  });

  it("drops the Google font hosts from the CSP", () => {
    expect(csp).not.toContain("fonts.googleapis.com");
    expect(csp).not.toContain("fonts.gstatic.com");
  });
});
