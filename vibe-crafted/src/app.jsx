// App shell — theme management + tweaks + command palette + project detail overlay

import React from "react";
import { Nav, ScrollProgress, Spine } from "./components/nav.jsx";
import { CommandPalette } from "./components/command-palette.jsx";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakColor,
} from "./components/tweaks-panel.jsx";
import { Hero } from "./sections/hero.jsx";
import { About } from "./sections/about.jsx";
import { Projects, ProjectDetail } from "./sections/projects.jsx";
import { ExperienceSection } from "./sections/experience.jsx";
import { Contact } from "./sections/contact.jsx";
import { inject } from "@vercel/analytics";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c42e63",
  "accentDark": "#ff5c8a",
  "density": "comfortable",
  "fontPairing": "instrument",
  "theme": "light"
}/*EDITMODE-END*/;

function applyFontPairing(pairing) {
  const root = document.documentElement;
  const MARTIAN = '"Martian Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const INSTRUMENT = '"Instrument Sans", ui-sans-serif, -apple-system, "Helvetica Neue", Arial, sans-serif';
  const pairs = {
    // Display mono + a real reading face — the default
    instrument: { display: MARTIAN, sans: INSTRUMENT, mono: MARTIAN },
    // Every word on the instrument, labels included
    all_mono:   { display: MARTIAN, sans: MARTIAN, mono: MARTIAN },
    // Quieter: sans everywhere but the measured values
    all_sans:   { display: INSTRUMENT, sans: INSTRUMENT, mono: MARTIAN },
  };
  const pair = pairs[pairing] || pairs.instrument;
  root.style.setProperty("--display", pair.display);
  root.style.setProperty("--sans", pair.sans);
  root.style.setProperty("--mono", pair.mono);
}

function applyDensity(density) {
  const root = document.documentElement;
  if (density === "tight") {
    root.style.setProperty("--section-pad", "72px");
  } else {
    root.style.setProperty("--section-pad", "120px");
  }
}

// Storage can throw (SecurityError) when the browser blocks site data — the
// theme is a convenience, so fall back to not persisting it.
const THEME_KEY = "portfolio_theme";

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* storage unavailable — keep the in-memory choice */
  }
}

function Analytics() {
  React.useEffect(() => {
    inject({ framework: "react" });
  }, []);

  return null;
}

export function App() {
  const [values, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Theme state (persisted, independent of tweaks default).
  // Order: saved choice > what the pre-paint script already applied
  // (which itself respects prefers-color-scheme) > light.
  const [theme, setThemeState] = React.useState(() => {
    const saved = readSavedTheme();
    if (saved === "light" || saved === "dark") return saved;
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") return applied;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Smooth theme transitions: add a class for ~360ms while colours animate
  const setTheme = React.useCallback((nextTheme) => {
    if (nextTheme === theme) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 360);
    }
    setThemeState(nextTheme);
    saveTheme(nextTheme);
  }, [theme]);

  // Apply theme attribute
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Apply accent
  React.useEffect(() => {
    const accent = theme === "dark" ? values.accentDark : values.accent;
    document.documentElement.style.setProperty("--accent", accent);
  }, [values.accent, values.accentDark, theme]);

  // Apply font pairing
  React.useEffect(() => {
    applyFontPairing(values.fontPairing);
  }, [values.fontPairing]);

  // Apply density
  React.useEffect(() => {
    applyDensity(values.density);
  }, [values.density]);

  // Command palette state
  const [cmdkOpen, setCmdkOpen] = React.useState(false);

  // Project detail overlay (lifted up so palette can open it)
  const [activeProject, setActiveProject] = React.useState(null);
  // Stable, so the drawer's focus effect doesn't re-run on every App render
  const closeProject = React.useCallback(() => setActiveProject(null), []);

  return (
    <>
      <a href="#main" className="skip-link mono">Skip to content</a>
      <ScrollProgress />
      <Spine />
      <Nav theme={theme} setTheme={setTheme} openCmdK={() => setCmdkOpen(true)} />

      <main id="main">
        <Hero />
        <About />
        <Projects onOpenProject={setActiveProject} />
        <ExperienceSection />
        <Contact />
      </main>

      <ProjectDetail
        project={activeProject}
        onClose={closeProject}
      />

      <CommandPalette
        open={cmdkOpen}
        setOpen={setCmdkOpen}
        theme={theme}
        setTheme={setTheme}
        openProject={setActiveProject}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Density" />
        <TweakRadio
          label="Section spacing"
          value={values.density}
          options={[
            { value: "comfortable", label: "Comfy" },
            { value: "tight", label: "Tight" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Font pairing"
          value={values.fontPairing}
          options={[
            { value: "instrument", label: "Instrument" },
            { value: "all_mono", label: "All-Mono" },
            { value: "all_sans", label: "All-Sans" },
          ]}
          onChange={(v) => setTweak("fontPairing", v)}
        />

        <TweakSection label="Colour" />
        <TweakColor
          label="Accent (light)"
          value={values.accent}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakColor
          label="Accent (dark)"
          value={values.accentDark}
          onChange={(v) => setTweak("accentDark", v)}
        />
        <TweakRadio
          label="Theme"
          value={theme}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
          onChange={setTheme}
        />
      </TweaksPanel>

      {/* The one polite live region; src/lib/announce.js writes into it */}
      <p id="sr-status" className="sr-only" role="status" aria-live="polite" aria-atomic="true" />

      <Analytics />
    </>
  );
}
