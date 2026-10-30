// Chart-recorder spine + top navigation + theme toggle

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { Download } from "./primitives.jsx";
import { lockScroll } from "../lib/scroll-lock.js";

// Vertical event labels are ~64px tall and centred on their mark, so the
// plotting band is inset top and bottom to keep the first and last readable.
const SPINE_PAD = 56;

const SECTIONS = [
  { id: "top",        label: "Origin" },
  { id: "about",      label: "About" },
  { id: "projects",   label: "Work" },
  { id: "experience", label: "Trajectory" },
  { id: "contact",    label: "Contact" },
];

// The spine is only displayed from this width up (see `.spine` in
// globals.css); below it the recorder has nothing to draw into.
const SPINE_QUERY = "(min-width: 1180px)";

/**
 * Has the recorder gone quiet enough to stop drawing until the next scroll?
 *
 * `buf` is the rolling window of the last N pen positions (−1…1, newest last)
 * and `pen` is the current pen offset. Returning true pauses the rAF loop: the
 * canvas keeps its last frame, and the next scroll event starts it again.
 *
 * TODO(you): decide what "settled" means. Each sample carries ±0.025 of
 * deliberate noise, so the trace never reads exactly zero. Returning false
 * keeps today's behaviour (draw every frame while the spine is visible).
 */
function hasTraceSettled(buf, pen) {
  return false;
}

// Scroll position as 0–100, read at most once per frame
function useScrollPercent() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return pct;
}

/**
 * Spine — the page's signature.
 *
 * A strip-chart recorder in the left gutter. The trace is a real recording:
 * each animation frame it samples how fast you are scrolling and pushes that
 * onto a rolling buffer, so the waveform you see is a plot of your own
 * movement through the page. Section boundaries are annotated at their true
 * document offsets, and the playhead reads out how far through you are.
 *
 * The recorder only runs while it can be seen: from SPINE_QUERY up, in a
 * visible tab, and (once hasTraceSettled says so) only while you scroll.
 * Under prefers-reduced-motion the trace is not recorded at all — the axis,
 * the events, and the numeric readout carry the same information statically.
 */
export function Spine() {
  const canvasRef = React.useRef(null);
  const sectionTops = React.useRef([]);
  const pct = useScrollPercent();
  const [marks, setMarks] = React.useState([]);
  const [activeId, setActiveId] = React.useState("top");

  // Measure where each section actually sits in the document, again whenever
  // the page changes height (fonts settling, a module list opening).
  React.useEffect(() => {
    const measure = () => {
      const docH = document.documentElement.scrollHeight;
      const found = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? { ...s, top: el.getBoundingClientRect().top + window.scrollY } : null;
      }).filter(Boolean);
      sectionTops.current = found;
      setMarks(found.map((s) => ({ ...s, at: Math.min(1, Math.max(0, s.top / docH)) })));
    };
    measure();
    const main = document.getElementById("main");
    const ro = typeof ResizeObserver !== "undefined" && main ? new ResizeObserver(measure) : null;
    ro?.observe(main);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Which section is under the top third of the viewport — from the cached
  // offsets, so scrolling costs no layout reads.
  React.useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = SECTIONS[0].id;
      for (const s of sectionTops.current) {
        if (s.top <= line) current = s.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // The recording itself
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia(SPINE_QUERY);

    const N = 160;
    const buf = new Array(N).fill(0);
    let lastY = window.scrollY;
    let pen = 0; // the pen has inertia — it ramps toward the signal and decays
    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;

    const styles = getComputedStyle(document.documentElement);

    // Axis and ticks. Drawn every frame with the trace, or once on its own
    // when motion is reduced — the graduated axis is information, not motion.
    const drawFurniture = () => {
      const hair = styles.getPropertyValue("--rule-soft").trim() || "rgba(0,0,0,.14)";
      const cx = w * 0.52;
      ctx.strokeStyle = hair;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + 0.5, 0);
      ctx.lineTo(cx + 0.5, h);
      ctx.stroke();

      for (let i = 0; i <= 10; i++) {
        const ty = Math.round((i / 10) * h) + 0.5;
        ctx.beginPath();
        ctx.moveTo(cx - (i % 5 === 0 ? 6 : 3), ty);
        ctx.lineTo(cx + (i % 5 === 0 ? 6 : 3), ty);
        ctx.stroke();
      }
      return cx;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) {
        ctx.clearRect(0, 0, w, h);
        drawFurniture();
      }
    };
    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      return () => window.removeEventListener("resize", resize);
    }

    const frame = () => {
      const y = window.scrollY;
      const v = y - lastY;
      lastY = y;

      // Normalised, clamped velocity. The pen eases toward the signal rather
      // than snapping to it, so a scroll burst leaves a readable excursion
      // instead of a one-frame spike, and settles back with a little noise.
      const target = Math.max(-1, Math.min(1, v / 30));
      pen += (target - pen) * 0.22;
      buf.push(pen + (Math.random() - 0.5) * 0.05);
      buf.shift();

      ctx.clearRect(0, 0, w, h);
      const cx = drawFurniture();

      // The trace — newest sample at the playhead, scrolling up the drum
      const accent = styles.getPropertyValue("--accent").trim() || "#c42e63";
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const ty = (i / (N - 1)) * h;
        const tx = cx + buf[i] * (w * 0.36);
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (hasTraceSettled(buf, pen)) {
        running = false; // idle: hold the last frame until the next scroll
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !wide.matches || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onWidth = () => {
      if (!wide.matches) return stop();
      resize();
      start();
    };

    window.addEventListener("scroll", start, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    wide.addEventListener("change", onWidth);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", start);
      document.removeEventListener("visibilitychange", onVisibility);
      wide.removeEventListener("change", onWidth);
    };
  }, []);

  return (
    <div className="spine" aria-hidden="true">
      <canvas ref={canvasRef} className="spine__trace" />

      {marks.map((m) => (
        <div
          key={m.id}
          className={`spine__evt ${activeId === m.id ? "on" : ""}`}
          style={{ top: `calc(${SPINE_PAD}px + ${m.at} * (100% - ${SPINE_PAD * 2}px))` }}
        >
          <span className="spine__tick" />
          <span className="spine__evt-lbl">{m.label}</span>
        </div>
      ))}

      <div className="spine__head" style={{ top: `calc(${SPINE_PAD}px + ${pct / 100} * (100% - ${SPINE_PAD * 2}px))` }}>
        <span className="spine__head-bar" />
        <span className="spine__head-val">{String(Math.round(pct)).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

// Fallback progress bar for viewports too narrow for the spine
export function ScrollProgress() {
  const pct = useScrollPercent();
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
      aria-label={`${isDark ? "Dark" : "Light"} theme, switch to ${isDark ? "light" : "dark"}`}
      className="lbl nav-toggle"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "var(--ink)",
        padding: "9px 11px",
        border: "1px solid var(--rule-soft)",
      }}
    >
      {/* Gain meter: two bars, the lit one is the active mode */}
      <span style={{ display: "inline-flex", gap: 2, alignItems: "flex-end" }}>
        <span style={{
          width: 3, height: 9, background: isDark ? "var(--rule-soft)" : "var(--accent)",
          transition: "background .3s ease",
        }} />
        <span style={{
          width: 3, height: 13, background: isDark ? "var(--accent)" : "var(--rule-soft)",
          transition: "background .3s ease",
        }} />
      </span>
      <span className="nav-toggle__txt">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

export function Nav({ theme, setTheme, openCmdK }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const burgerRef = React.useRef(null);

  // Escape and the burger hand focus back to the burger; a menu link does not,
  // so the browser can carry focus on to the section it jumps to.
  const closeMenu = React.useCallback((restoreFocus) => {
    setMenuOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu covers the page, the page behind it is inert so Tab cannot
  // wander into content the reader can't see.
  React.useEffect(() => {
    if (!menuOpen) return;
    const main = document.getElementById("main");
    const unlock = lockScroll();
    main?.setAttribute("inert", "");
    const onKey = (e) => e.key === "Escape" && closeMenu(true);
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const items = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Trajectory" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 800,
        padding: "12px 0",
        transition: "background .3s ease, border-color .3s ease, backdrop-filter .3s ease",
        background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(1.15)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(1.15)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule-hair)" : "transparent"}`,
      }}
    >
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>

        {/* Nameplate */}
        <a href="#top" style={{
          display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none",
        }}>
          <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true" style={{ flex: "none" }}>
            <path d="M4 42 L17 42 L23 18 L32 54 L41 10 L47 42 L60 42" fill="none"
              stroke="var(--accent)" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          <span className="nav-plate">
            <span className="mono nav-plate__name">Shreyash Meshram</span>
            <span className="lbl nav-plate__sub">Full-stack × applied AI</span>
          </span>
        </a>

        <ul style={{ display: "flex", listStyle: "none", gap: 26, margin: 0, padding: 0 }} className="nav-links">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="lbl nav-link" style={{ textDecoration: "none" }}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={openCmdK}
            aria-label="Query, open the command palette"
            aria-keyshortcuts="Meta+K Control+K"
            className="lbl cmdk-trigger"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "9px 11px",
              border: "1px solid var(--rule-soft)",
              background: "transparent",
            }}
          >
            <span>Query</span>
            <span className="mono" style={{
              padding: "1px 5px",
              border: "1px solid var(--rule-soft)",
              fontSize: "var(--t-micro)",
              color: "var(--ink)",
              fontVariationSettings: '"wdth" 80, "wght" 500',
            }}>⌘K</span>
          </button>

          <a href={PORTFOLIO.resume} download className="stamp" aria-label="CV, download PDF" style={{ padding: "9px 13px" }}>
            <span>CV</span>
            <Download size={11} />
          </a>

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <button
            type="button"
            ref={burgerRef}
            onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="nav-burger"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 38, height: 38,
              border: "1px solid var(--rule-soft)",
              color: "var(--ink)",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{
              width: 15, height: 1.5, background: "currentColor", display: "block",
              transition: "transform .25s ease",
              transform: menuOpen ? "translateY(2.75px) rotate(45deg)" : "none",
            }} />
            <span style={{
              width: 15, height: 1.5, background: "currentColor", display: "block",
              transition: "transform .25s ease",
              transform: menuOpen ? "translateY(-2.75px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
          transition: "opacity 240ms ease",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
          {items.map((it, i) => (
            <li key={it.href}>
              <a
                href={it.href}
                onClick={() => closeMenu(false)}
                className="display"
                tabIndex={menuOpen ? 0 : -1}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  textDecoration: "none",
                  fontSize: "clamp(28px, 8vw, 46px)",
                  fontVariationSettings: '"wdth" 80, "wght" 600',
                  color: "var(--ink)",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--rule-hair)",
                  transform: menuOpen ? "none" : "translateY(12px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 380ms cubic-bezier(.2,.7,.2,1) ${70 + i * 55}ms, opacity 320ms ease ${70 + i * 55}ms`,
                }}
              >
                <span className="lbl" style={{ color: "var(--accent)", fontSize: "var(--t-micro)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={PORTFOLIO.resume}
          download
          onClick={() => closeMenu(false)}
          className="stamp stamp--hot"
          tabIndex={menuOpen ? 0 : -1}
          style={{
            marginTop: 34,
            alignSelf: "flex-start",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 340ms ease 330ms",
          }}
        >
          <span>Download CV (PDF)</span>
          <Download size={12} />
        </a>
      </div>

      <style>{`
        .nav-plate {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
          min-width: 0;
        }

        .nav-plate__name {
          font-size: 11.5px;
          font-variation-settings: "wdth" 85, "wght" 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .nav-plate__sub {
          font-size: var(--t-micro);
          letter-spacing: 0.14em;
          white-space: nowrap;
        }

        .nav-link { transition: color .22s ease; }
        .nav-link:hover { color: var(--accent); }
        .cmdk-trigger { transition: border-color .22s ease, color .22s ease; }
        .cmdk-trigger:hover { border-color: var(--ink); color: var(--ink); }
        .nav-toggle { transition: border-color .22s ease; }
        .nav-toggle:hover { border-color: var(--ink); }

        /* Below this the plate would collide with the controls */
        @media (max-width: 620px) {
          .nav-plate__sub { display: none; }
          .nav-toggle__txt { display: none; }
        }

        @media (max-width: 344px) {
          .nav-plate__name { display: none; }
        }

        @media (max-width: 940px) {
          .nav-links { display: none !important; }
          .cmdk-trigger { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (min-width: 941px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
