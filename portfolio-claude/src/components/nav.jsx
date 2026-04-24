// Top navigation + scroll progress + theme toggle

function ScrollProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink)",
        padding: "8px 12px",
        border: "1px solid var(--rule-soft)",
        borderRadius: 999,
      }}
    >
      <span style={{
        width: 10, height: 10, borderRadius: 999,
        background: "var(--ink)",
        boxShadow: isDark ? "inset 4px -1px 0 0 var(--bg)" : "none",
        transition: "box-shadow .3s ease",
      }} />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

function Nav({ theme, setTheme }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 800,
        padding: "14px 0",
        transition: "background .3s ease, border-color .3s ease, backdrop-filter .3s ease",
        background: scrolled ? "color-mix(in oklab, var(--bg) 85%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(10px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px) saturate(1.2)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule-soft)" : "transparent"}`,
      }}
    >
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <a href="#top" className="mono" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          textDecoration: "none", fontSize: 12, letterSpacing: "0.04em",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, border: "1px solid var(--ink)", borderRadius: 999,
            fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, fontWeight: 500,
          }}>s</span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 12 }}>Shreyash Meshram</span>
            <span style={{ fontSize: 10, color: "var(--ink-mute)" }}>Full-Stack · AI · 2026</span>
          </span>
        </a>

        <ul style={{
          display: "flex", listStyle: "none", gap: 22, margin: 0, padding: 0,
        }} className="nav-links">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="mono" style={{
                textDecoration: "none", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--ink)",
              }}>{it.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href={window.PORTFOLIO.resume} className="mono" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "8px 14px", borderRadius: 999,
            background: "var(--ink)", color: "var(--bg)", textDecoration: "none",
          }}>
            CV <ArrowUpRight size={12} />
          </a>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

Object.assign(window, { Nav, ScrollProgress, ThemeToggle });
