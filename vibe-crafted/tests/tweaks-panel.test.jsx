// SEC-02: the Tweaks design-tool panel must not exist in production builds —
// a framing page could otherwise open it via postMessage and receive every
// tweak value broadcast to targetOrigin '*'.

import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, renderHook, act, cleanup } from "@testing-library/react";
import { TweaksPanel, useTweaks } from "../src/components/tweaks-panel.jsx";

function activate() {
  act(() => {
    window.dispatchEvent(new MessageEvent("message", { data: { type: "__activate_edit_mode" } }));
  });
}

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("TweaksPanel in production", () => {
  it("ignores __activate_edit_mode and never announces itself", () => {
    vi.stubEnv("DEV", false);
    const post = vi.spyOn(window.parent, "postMessage");
    const { queryByText } = render(<TweaksPanel><span>panel body</span></TweaksPanel>);
    activate();
    expect(queryByText("panel body")).toBeNull();
    expect(post).not.toHaveBeenCalled();
  });

  it("useTweaks updates local state without broadcasting", () => {
    vi.stubEnv("DEV", false);
    const post = vi.spyOn(window.parent, "postMessage");
    const { result } = renderHook(() => useTweaks({ accent: "#000" }));
    act(() => result.current[1]("accent", "#f00"));
    expect(result.current[0].accent).toBe("#f00");
    expect(post).not.toHaveBeenCalled();
  });
});

describe("TweaksPanel in dev", () => {
  it("still opens for the editing host", () => {
    vi.stubEnv("DEV", true);
    const { queryByText } = render(<TweaksPanel><span>panel body</span></TweaksPanel>);
    activate();
    expect(queryByText("panel body")).not.toBeNull();
  });
});
