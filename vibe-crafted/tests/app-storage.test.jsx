// BUG-01: when the browser blocks storage, localStorage access throws
// SecurityError. The app must still render (index.html's pre-paint script
// already guards the same call).

import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

vi.mock("@vercel/analytics", () => ({ inject: vi.fn() }));

beforeEach(() => {
  window.matchMedia = window.matchMedia || ((q) => ({
    matches: false, media: q, addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  }));
  window.IntersectionObserver = window.IntersectionObserver || class {
    observe() {} unobserve() {} disconnect() {}
  };
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  // jsdom has no canvas; the hero trace only needs calls to be absorbed.
  const ctx = new Proxy({}, { get: (t, k) => (k in t ? t[k] : () => ({ addColorStop() {} })), set: (t, k, v) => ((t[k] = v), true) });
  HTMLCanvasElement.prototype.getContext = () => ctx;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function blockStorage() {
  const err = () => { throw new DOMException("The operation is insecure.", "SecurityError"); };
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(err);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(err);
}

describe("App with blocked storage", () => {
  it("renders with working storage (baseline)", async () => {
    const { App } = await import("../src/app.jsx");
    const { container } = render(<App />);
    expect(container.querySelector("#contact")).not.toBeNull();
  });

  it("still renders when localStorage throws", async () => {
    blockStorage();
    const { App } = await import("../src/app.jsx");
    const { container } = render(<App />);
    expect(container.querySelector("#contact")).not.toBeNull();
  });

  it("theme toggle still works when localStorage throws", async () => {
    blockStorage();
    const { App } = await import("../src/app.jsx");
    const { getAllByRole } = render(<App />);
    const before = document.documentElement.getAttribute("data-theme");
    const toggle = getAllByRole("button").find((b) => /theme|dark|light/i.test(b.getAttribute("aria-label") || ""));
    expect(toggle).toBeTruthy();
    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute("data-theme")).not.toBe(before);
  });
});
