// A11Y-01..07: keyboard and screen-reader regressions found in the UI audit.
// Each test names the audit item it guards (see PRODUCT.md, WCAG 2.2 AA).

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, cleanup, screen, within, waitFor, act } from "@testing-library/react";

vi.mock("@vercel/analytics", () => ({ inject: vi.fn() }));

const EMAIL = "shreyashmeshram0031@gmail.com";

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
  document.getElementById("main")?.removeAttribute("inert");
});

async function renderApp() {
  const { App } = await import("../src/app.jsx");
  return render(<App />);
}

function stubClipboard(writeText) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

const srStatus = () => document.getElementById("sr-status");


describe("A1 — command palette", () => {
  it("keeps the closed palette and its backdrop out of the tab order", async () => {
    const { container } = await renderApp();
    expect(container.querySelector(".cmdk-shell").hasAttribute("inert")).toBe(true);
    expect(container.querySelector(".cmdk-backdrop").hasAttribute("inert")).toBe(true);
  });

  it("returns focus to the opener when it closes", async () => {
    await renderApp();
    const trigger = screen.getByRole("button", { name: /^query/i });
    trigger.focus();
    fireEvent.click(trigger);
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("combobox")));

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});

describe("A2 — heading names keep their word spaces", () => {
  it("announces the nameplate and section titles as words", async () => {
    await renderApp();
    // Text content is what copy-paste, find-in-page and indexing see; jsdom's
    // name computation pads inline spans, so the rendered name is checked in Chrome.
    const texts = screen.getAllByRole("heading").map((h) => h.textContent.replace(/\s+/g, " ").trim());
    expect(texts).toContain("Shreyash Meshram");
    expect(texts).toContain("An engineer who ships the measurement, not just the model.");
    expect(texts).toContain("Send me something.");
  });
});

describe("A3 — accessible names contain the visible label", () => {
  it("theme toggle and query trigger start from their visible text", async () => {
    const { container } = await renderApp();
    const toggle = container.querySelector(".nav-toggle");
    const visible = toggle.querySelector(".nav-toggle__txt").textContent;
    expect(toggle.getAttribute("aria-label").toLowerCase()).toContain(visible.toLowerCase());
    expect(screen.getByRole("button", { name: /^query/i })).toBeTruthy();
  });

  it("project rows take their name from their content and announce a dialog", async () => {
    const { container } = await renderApp();
    const rows = container.querySelectorAll(".row--item");
    expect(rows.length).toBe(18);
    rows.forEach((row) => {
      expect(row.hasAttribute("aria-label")).toBe(false);
      expect(row.getAttribute("aria-haspopup")).toBe("dialog");
    });
  });
});

describe("A4 — mobile menu", () => {
  it("makes the page inert while open and returns focus to the burger", async () => {
    // jsdom ignores the media query that shows the burger, so find it by class
    const { container } = await renderApp();
    const burger = container.querySelector(".nav-burger");
    expect(burger.getAttribute("aria-label")).toMatch(/open menu/i);
    burger.focus();
    fireEvent.click(burger);
    expect(document.getElementById("main").hasAttribute("inert")).toBe(true);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.getElementById("main").hasAttribute("inert")).toBe(false);
    expect(document.activeElement).toBe(burger);
  });
});

describe("A5 — project drawer", () => {
  it("keeps its content through the exit transition and titles it with an h2", async () => {
    const { container } = await renderApp();
    fireEvent.click(container.querySelectorAll(".row--item")[2]);
    const dialog = screen.getByRole("dialog", { name: /FENgine details/i });
    expect(within(dialog).getByRole("heading", { level: 2, name: "FENgine" })).toBeTruthy();

    fireEvent.click(within(dialog).getByRole("button", { name: /close/i }));
    expect(dialog.textContent).toMatch(/FENgine/);

    fireEvent.transitionEnd(dialog, { propertyName: "transform" });
    expect(dialog.textContent).not.toMatch(/FENgine/);
  });
});

describe("A7 — copying the email gives feedback", () => {
  it("announces a successful copy", async () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));
    await renderApp();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(EMAIL) }));
    });
    await waitFor(() => expect(srStatus().textContent).toMatch(/copied/i));
  });

  it("announces a failed copy instead of failing silently", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    await renderApp();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(EMAIL) }));
    });
    await waitFor(() => expect(srStatus().textContent).toMatch(/couldn.t copy/i));
  });

  it("announces the palette's copy action too", async () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));
    await renderApp();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const input = await screen.findByRole("combobox");
    fireEvent.change(input, { target: { value: "copy email" } });
    await act(async () => {
      fireEvent.keyDown(input, { key: "Enter" });
    });
    await waitFor(() => expect(srStatus().textContent).toMatch(/copied/i));
  });
});
