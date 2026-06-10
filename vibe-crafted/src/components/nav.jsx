// Top navigation + scroll progress + theme toggle

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { ArrowUpRight } from "./primitives.jsx";

export function ScrollProgress() {
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

export function ThemeToggle({ theme, setTheme }) {
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

export function Nav({ theme, setTheme, openCmdK }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open
  React.useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
          <button
            type="button"
            onClick={openCmdK}
            aria-label="Open command palette"
            className="mono cmdk-trigger"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "8px 12px", borderRadius: 999,
              border: "1px solid var(--rule-soft)",
              background: "transparent",
              color: "var(--ink-mute)",
            }}
          >
            <span>Search</span>
            <span style={{
              fontFamily: "var(--mono)",
              padding: "2px 6px",
              border: "1px solid var(--rule-soft)",
              borderRadius: 4,
              fontSize: 10,
              color: "var(--ink)",
            }}>⌘K</span>
          </button>
          <a href={PORTFOLIO.resume} className="mono" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "8px 14px", borderRadius: 999,
            background: "var(--ink)", color: "var(--bg)", textDecoration: "none",
          }}>
            CV <ArrowUpRight size={12} />
          </a>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="mono nav-burger"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 36, height: 36,
              border: "1px solid var(--rule-soft)",
              borderRadius: 999,
              color: "var(--ink)",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{
              width: 14, height: 1.5, background: "currentColor", display: "block",
              transition: "transform .25s ease",
              transform: menuOpen ? "translateY(2.75px) rotate(45deg)" : "none",
            }} />
            <span style={{
              width: 14, height: 1.5, background: "currentColor", display: "block",
              transition: "transform .25s ease",
              transform: menuOpen ? "translateY(-2.75px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>

      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className="nav-mobile"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "var(--bg)",
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(20px, 6vw, 48px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 260ms ease",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
          {items.map((it, i) => (
            <li key={it.href}>
              <a
                href={it.href}
                onClick={() => setMenuOpen(false)}
                className="serif"
                tabIndex={menuOpen ? 0 : -1}
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 16,
                  textDecoration: "none",
                  fontSize: "clamp(36px, 9vw, 56px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  transform: menuOpen ? "none" : "translateY(14px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 420ms cubic-bezier(.2,.7,.2,1) ${80 + i * 60}ms, opacity 360ms ease ${80 + i * 60}ms`,
                }}
              >
                <span className="mono" style={{
                  fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-mute)",
                }}>0{i + 1}</span>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={PORTFOLIO.resume}
          onClick={() => setMenuOpen(false)}
          className="mono"
          tabIndex={menuOpen ? 0 : -1}
          style={{
            marginTop: 40,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            alignSelf: "flex-start",
            padding: "12px 20px",
            background: "var(--ink)",
            color: "var(--bg)",
            textDecoration: "none",
            fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
            borderRadius: 999,
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 360ms ease 360ms",
          }}
        >
          Download CV <ArrowUpRight size={12} />
        </a>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .cmdk-trigger { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (min-width: 861px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
