// Work — a results table, not a card wall.
//
// 17 equal cards force the reader to parse 17 identical shapes to find the one
// they care about. A table lets them scan one column at a time: channel, then
// name, then note. It also happens to be the native form of this subject's
// world — a benchmark run prints rows, not tiles.

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, ArrowUpRight } from "../components/primitives.jsx";
import { lockScroll } from "../lib/scroll-lock.js";

const CHANNEL_TONE = {
  Vision:  "var(--ch-vision)",
  ML:      "var(--ch-ml)",
  Data:    "var(--ch-data)",
  LLM:     "var(--ch-llm)",
  App:     "var(--ch-app)",
  Systems: "var(--ch-systems)",
};

const tone = (d) => CHANNEL_TONE[d] || "var(--ink-mute)";

// The note column: prefer a stated highlight, else the first clause of the blurb
function note(p) {
  if (p.highlights && p.highlights.length) return p.highlights[0];
  const first = p.blurb.split(". ")[0];
  if (first.length <= 92) return first;
  const cut = first.slice(0, 89);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

/* ── Detail drawer ───────────────────────────────────────────────────────── */

export function ProjectDetail({ project, onClose }) {
  const ref = React.useRef(null);
  const lastFocused = React.useRef(null);
  const open = !!project;

  // The last project stays rendered until the panel has slid out, so closing
  // doesn't flash an empty sheet. `shown` clears on the transform's end.
  const [shown, setShown] = React.useState(project);
  React.useEffect(() => {
    if (project) setShown(project);
  }, [project]);
  const view = project || shown;

  const onTransitionEnd = (e) => {
    if (open || e.target !== e.currentTarget) return;
    if (e.propertyName && e.propertyName !== "transform") return;
    setShown(null);
  };

  const openN = project ? project.n : null;

  React.useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    lastFocused.current = document.activeElement;

    const focusables = () =>
      ref.current
        ? ref.current.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
        : [];

    const first = focusables()[0];
    if (first) first.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const firstEl = els[0];
        const lastEl = els[els.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
      // Back to whatever opened the drawer; if that was the page itself (the
      // palette opened from nowhere), land on the project's own row.
      const back = lastFocused.current;
      if (back && back !== document.body && back.isConnected) back.focus();
      else document.querySelector(`[data-project="${openN}"]`)?.focus();
    };
  }, [open, openN, onClose]);

  return (
    <>
      {/* Pointer-only dismiss; the Close button and Escape cover keyboards */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="pdx-backdrop"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        inert={open ? undefined : ""}
        aria-label={view ? `${view.title} details` : undefined}
        className="pdx"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        onTransitionEnd={onTransitionEnd}
      >
        {view && (
          <>
            <div className="pdx__bar">
              <span className="lbl">
                <span
                  className="pdx__dot"
                  style={{ background: tone(view.domain) }}
                />
                {view.domain} · {view.n}
                {view.status && (
                  <span className="pdx__status">{view.status}</span>
                )}
              </span>
              <button onClick={onClose} className="lbl pdx__close" aria-label="Close">
                Close ✕
              </button>
            </div>

            <div className="pdx__body">
              <h2 className="display pdx__title">{view.title}</h2>
              <p className="pdx__blurb">{view.blurb}</p>

              {view.highlights && view.highlights.length > 0 && (
                <>
                  <div className="lbl pdx__lbl">What it does</div>
                  <ul className="pdx__list">
                    {view.highlights.map((h) => (
                      <li key={h}>
                        <span
                          className="pdx__bullet"
                          style={{ background: tone(view.domain) }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="lbl pdx__lbl">Stack</div>
              <div className="pdx__tags">
                {view.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>

              <div className="pdx__actions">
                <a href={view.href} target="_blank" rel="noreferrer" className="stamp stamp--solid">
                  <span>Source</span><ArrowUpRight size={12} />
                </a>
                {view.caseStudy && (
                  <a href={view.caseStudy} target="_blank" rel="noreferrer" className="stamp">
                    <span>Case study</span><ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </aside>

      <style>{`
        .pdx-backdrop {
          position: fixed; inset: 0;
          background: color-mix(in oklab, var(--bg-sunk) 68%, transparent);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          transition: opacity 260ms ease;
          z-index: 1200;
          cursor: pointer;
        }

        .pdx {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(660px, 100vw);
          background: var(--bg);
          border-left: 1px solid var(--ink);
          transition: transform 340ms var(--ease);
          z-index: 1201;
          overflow-y: auto;
        }

        .pdx__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 30px;
          position: sticky;
          top: 0;
          background: color-mix(in oklab, var(--bg) 92%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--rule-soft);
          z-index: 1;
        }

        .pdx__dot {
          display: inline-block;
          width: 7px; height: 7px;
          margin-right: 8px;
          vertical-align: 0;
        }

        .pdx__status {
          margin-left: 10px;
          padding: 2px 6px;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-size: var(--t-micro);
          letter-spacing: 0.14em;
        }

        .pdx__close { color: var(--ink); transition: color .2s ease; }
        .pdx__close:hover { color: var(--accent); }

        .pdx__body { padding: 34px 30px 64px; }

        .pdx__title {
          margin: 0 0 18px;
          font-size: clamp(28px, 4vw, 44px);
          font-variation-settings: "wdth" 82, "wght" 700;
        }

        .pdx__blurb {
          margin: 0 0 30px;
          font-size: 16.5px;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 58ch;
        }

        .pdx__lbl {
          padding-bottom: 9px;
          border-bottom: 1px solid var(--rule-soft);
          margin-bottom: 16px;
        }

        .pdx__list {
          list-style: none;
          margin: 0 0 32px;
          padding: 0;
          display: grid;
          gap: 11px;
        }

        .pdx__list li {
          display: flex;
          gap: 12px;
          align-items: baseline;
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--ink);
        }

        .pdx__bullet {
          width: 6px; height: 6px;
          flex: none;
          transform: translateY(-1px);
        }

        .pdx__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 36px;
        }

        .pdx__actions { display: flex; gap: 10px; flex-wrap: wrap; }

        @media (max-width: 560px) {
          .pdx__bar { padding: 16px 20px; }
          .pdx__body { padding: 26px 20px 52px; }
        }
      `}</style>
    </>
  );
}

/* ── Table ───────────────────────────────────────────────────────────────── */

export function Projects({ onOpenProject }) {
  const projects = PORTFOLIO.projects;
  const handleOpen = onOpenProject || (() => undefined);

  const [filter, setFilter] = React.useState("All");

  const channels = React.useMemo(() => {
    const seen = [];
    projects.forEach((p) => { if (!seen.includes(p.domain)) seen.push(p.domain); });
    return ["All", ...seen];
  }, [projects]);

  const rows = filter === "All" ? projects : projects.filter((p) => p.domain === filter);

  return (
    <section id="projects" data-screen-label="Work" className="work">
      <div className="wrap">
        <SectionHeader
          index="02"
          label="Selected work"
          n={`n=${projects.length}`}
          title="Eighteen runs, seventeen shipped."
          kicker="Pick a channel to narrow the list, or open a row for the full write-up and source."
        />

        {/* Channel filter */}
        <div className="work__filters" role="group" aria-label="Filter by channel">
          {channels.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`chan-btn ${filter === c ? "on" : ""}`}
              style={c === "All" ? undefined : { "--tone": tone(c) }}
            >
              {c !== "All" && <span className="chan-btn__dot" />}
              {c}
              <span className="chan-btn__n">
                {c === "All" ? projects.length : projects.filter((p) => p.domain === c).length}
              </span>
            </button>
          ))}
        </div>

        {/* Column heads */}
        <div className="row row--head" aria-hidden="true">
          <span>#</span>
          <span>Project</span>
          <span>Channel</span>
          <span className="row__note-h">Note</span>
          <span className="row__stack-h" style={{ textAlign: "right" }}>Stack</span>
          <span />
        </div>

        <ul className="work__rows">
          {rows.map((p) => (
            <li key={p.n}>
              {/* Named by its own content (number, title, channel, note); the
                  stack tags repeat in the drawer, so they stay out of the name. */}
              <button
                className="row row--item"
                onClick={() => handleOpen(p)}
                aria-haspopup="dialog"
                data-project={p.n}
                style={{ "--tone": tone(p.domain) }}
              >
                <span className="row__n">{p.n}</span>
                <span className="row__title">
                  {p.title}
                  {p.status && <span className="row__status">{p.status}</span>}
                </span>
                <span className="row__chan">
                  <span className="row__dot" />
                  {p.domain}
                </span>
                <span className="row__note">{note(p)}</span>
                <span className="row__stack" aria-hidden="true">
                  {p.stack.slice(0, 3).map((s) => <span className="tag" key={s}>{s}</span>)}
                  {p.stack.length > 3 && <span className="lbl row__more">+{p.stack.length - 3}</span>}
                </span>
                <span className="row__go" aria-hidden="true"><ArrowUpRight size={13} /></span>
              </button>
            </li>
          ))}
        </ul>

        {rows.length === 0 && <p className="work__empty">No runs on that channel.</p>}
      </div>

      <style>{`
        .work { padding: var(--section-pad) 0 var(--section-end); }

        .work__filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }

        .chan-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border: 1px solid var(--rule-soft);
          font-family: var(--mono);
          font-variation-settings: "wdth" 85, "wght" 500;
          font-size: var(--t-label);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }

        .chan-btn__dot {
          width: 6px; height: 6px;
          background: var(--tone, var(--ink-mute));
          flex: none;
        }

        .chan-btn__n {
          font-size: var(--t-micro);
          padding-left: 3px;
          border-left: 1px solid currentColor;
          margin-left: 2px;
        }

        @media (hover: hover) and (pointer: fine) {
          .chan-btn:hover { color: var(--ink); border-color: var(--ink); }
        }

        .chan-btn.on {
          color: var(--bg);
          background: var(--ink);
          border-color: var(--ink);
        }

        /* Rows */
        .work__rows { list-style: none; margin: 0; padding: 0; }

        /* Each row is its own grid, so the stack column is a fixed width that
           fits the widest three 11px tags plus the +n count (316px). */
        .row {
          display: grid;
          grid-template-columns: 40px minmax(120px, 0.9fr) 104px minmax(0, 1.35fr) 320px 26px;
          gap: 18px;
          align-items: center;
          width: 100%;
          text-align: left;
          padding: 15px 10px 15px 4px;
        }

        .row--head {
          font-family: var(--mono);
          font-variation-settings: "wdth" 85, "wght" 500;
          font-size: var(--t-micro);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-mute);
          padding-bottom: 9px;
          padding-top: 0;
          border-bottom: 1px solid var(--rule);
        }

        .row--item {
          position: relative;
          border-bottom: 1px solid var(--rule-hair);
          color: var(--ink);
          transition: background .22s ease;
        }

        /* The scanline: a channel-coloured bar sweeps in from the left edge,
           the way a selected trace lights up on a scope. */
        .row--item::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--tone);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform .28s var(--ease);
        }

        .row--item:focus-visible { background: var(--bg-raised); }
        .row--item:focus-visible::before { transform: scaleY(1); }

        /* Hover only with a real pointer; on touch it would stay lit after a tap */
        @media (hover: hover) and (pointer: fine) {
          .row--item:hover { background: var(--bg-raised); }
          .row--item:hover::before { transform: scaleY(1); }
          .row--item:hover .row__go { color: var(--tone); transform: translate(2px, -2px); }
          .row--item:hover .row__title { color: var(--tone); }
          .row--item:hover .row__status { color: var(--accent); }
        }

        .row__n {
          font-family: var(--mono);
          font-variation-settings: "wdth" 82, "wght" 500;
          font-size: var(--t-label);
          color: var(--ink-mute);
        }

        .row__status {
          display: inline-block;
          margin-left: 10px;
          padding: 2px 6px;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-family: var(--mono);
          font-variation-settings: "wdth" 82, "wght" 500;
          font-size: var(--t-micro);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          vertical-align: 2px;
          white-space: nowrap;
        }

        .row__title {
          font-family: var(--mono);
          font-variation-settings: "wdth" 85, "wght" 600;
          font-size: 15px;
          letter-spacing: -0.02em;
          transition: color .2s ease;
        }

        .row__chan {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--mono);
          font-variation-settings: "wdth" 85, "wght" 500;
          font-size: var(--t-micro);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        .row__dot { width: 6px; height: 6px; background: var(--tone); flex: none; }

        .row__note {
          font-size: 13px;
          line-height: 1.45;
          color: var(--ink-soft);
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .row__stack {
          display: flex;
          gap: 4px;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }
        .row__more { font-size: var(--t-micro); color: var(--ink-mute); }

        .row__go {
          color: var(--ink-mute);
          display: inline-flex;
          justify-content: flex-end;
          transition: color .2s ease, transform .25s var(--ease);
        }

        .work__empty {
          padding: 40px 4px;
          color: var(--ink-mute);
          font-family: var(--mono);
          font-size: 13px;
        }

        /* Below the table breakpoint the row folds onto two lines. Placement is
           explicit — implicit auto-flow with hidden children reflows wrongly. */
        @media (max-width: 1080px) {
          .row {
            grid-template-columns: 34px minmax(0, 1fr) 100px 24px;
            gap: 6px 14px;
            align-items: start;
          }
          .row__note-h, .row__stack-h, .row__stack { display: none; }

          .row--item .row__n     { grid-column: 1; grid-row: 1; padding-top: 3px; }
          .row--item .row__title { grid-column: 2; grid-row: 1; }
          .row--item .row__chan  { grid-column: 3; grid-row: 1; padding-top: 4px; }
          .row--item .row__go    { grid-column: 4; grid-row: 1; padding-top: 2px; }
          .row--item .row__note  { grid-column: 2 / 4; grid-row: 2; }
        }

        @media (max-width: 560px) {
          .row {
            grid-template-columns: 28px minmax(0, 1fr) 22px;
            gap: 5px 11px;
          }
          .row--head { display: none; }

          .row--item .row__n     { grid-column: 1; grid-row: 1; }
          .row--item .row__title { grid-column: 2; grid-row: 1; }
          .row--item .row__go    { grid-column: 3; grid-row: 1; }
          .row--item .row__chan  { grid-column: 2; grid-row: 2; padding-top: 0; }
          .row--item .row__note  { grid-column: 2; grid-row: 3; }
        }

      `}</style>
    </section>
  );
}
