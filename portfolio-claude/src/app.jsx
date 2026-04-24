// App shell — theme management + tweaks + wiring

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "grid",
  "accent": "#d94a1f",
  "accentDark": "#ff6b3d",
  "density": "comfortable",
  "motion": "cinematic",
  "fontPairing": "fraunces_mono",
  "theme": "light"
}/*EDITMODE-END*/;

function applyFontPairing(pairing) {
  const root = document.documentElement;
  const pairs = {
    fraunces_mono: {
      serif: '"Fraunces", "Times New Roman", serif',
      sans: '"Neue Haas Grotesk Text Pro", ui-sans-serif, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
    },
    serif_only: {
      serif: '"Fraunces", "Times New Roman", serif',
      sans: '"Fraunces", "Times New Roman", serif',
      mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
    },
    mono_only: {
      serif: '"JetBrains Mono", ui-monospace, Menlo, monospace',
      sans: '"JetBrains Mono", ui-monospace, Menlo, monospace',
      mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
    },
  };
  const pair = pairs[pairing] || pairs.fraunces_mono;
  root.style.setProperty("--serif", pair.serif);
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

function App() {
  const [values, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Theme is tracked separately (user can toggle live, independent of tweaks default)
  const [theme, setThemeState] = React.useState(() => {
    const saved = localStorage.getItem("portfolio_theme");
    return saved || values.theme || "light";
  });

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
  };

  // Apply theme
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

  const layout = values.layout || "editorial";

  return (
    <>
      <ScrollProgress />
      <Nav theme={theme} setTheme={setTheme} />

      <Hero />
      <About />
      <Projects layout={layout} />
      <ExperienceSection />
      <Contact />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout" />
        <TweakRadio
          label="Project layout"
          value={values.layout}
          options={[
            { value: "editorial", label: "Editorial" },
            { value: "grid", label: "Grid" },
            { value: "list", label: "Index" },
          ]}
          onChange={(v) => setTweak("layout", v)}
        />
        <TweakRadio
          label="Density"
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
            { value: "fraunces_mono", label: "Serif + Mono" },
            { value: "serif_only", label: "All-Serif" },
            { value: "mono_only", label: "All-Mono" },
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
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
