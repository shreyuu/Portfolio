// Projects — equalised cards, no swatches, no category tags, no year overlay.

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, Chip, ArrowUpRight } from "../components/primitives.jsx";

// Detail overlay (slide-in from right)
export function ProjectDetail({ project, onClose }) {
  const ref = React.useRef(null);
  const open = !!project;

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "color-mix(in oklab, var(--ink) 50%, transparent)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 280ms ease",
          zIndex: 200,
        }}
      />
      {/* Drawer */}
      <aside
        ref={ref}
        role="dialog"
        aria-hidden={!open}
        aria-label={project ? `${project.title} details` : undefined}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(720px, 100vw)",
          background: "var(--bg)",
          borderLeft: "1px solid var(--rule-soft)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 360ms cubic-bezier(.2,.7,.2,1)",
          zIndex: 201,
          overflowY: "auto",
          boxShadow: open ? "-30px 0 80px -20px rgba(0,0,0,0.25)" : "none",
        }}
      >
        {project && (
          <>
            {/* Top header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 32px",
              position: "sticky",
              top: 0,
              background: "color-mix(in oklab, var(--bg) 92%, transparent)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderBottom: "1px solid var(--rule-soft)",
              zIndex: 1,
            }}>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--ink-mute)",
              }}>
                Project · {project.n}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="mono"
                style={{
                  background: "transparent",
                  border: "1px solid var(--rule-soft)",
                  color: "var(--ink)",
                  padding: "8px 14px",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 999,
                }}
              >
                Close ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "48px 32px 80px" }}>
              <h2 className="serif" style={{
                margin: "0 0 20px",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}>
                {project.title}
              </h2>

              <p className="serif" style={{
                margin: "0 0 28px",
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--ink)",
                fontWeight: 300,
              }}>
                {project.blurb}
              </p>

              {project.highlights && (
                <div style={{ marginBottom: 28 }}>
                  <div className="mono" style={{
                    fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "var(--ink-mute)", marginBottom: 14,
                  }}>
                    Highlights
                  </div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                    {project.highlights.map((h) => (
                      <li key={h} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        fontSize: 14, lineHeight: 1.55, color: "var(--ink)",
                      }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginBottom: 32 }}>
                <div className="mono" style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--ink-mute)", marginBottom: 14,
                }}>
                  Stack
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {project.stack.map((s) => <Chip key={s}>{s}</Chip>)}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {project.caseStudy && (
                  <a
                    href={project.caseStudy}
                    className="mono"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "14px 22px",
                      background: "var(--ink)",
                      color: "var(--bg)",
                      textDecoration: "none",
                      fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
                      borderRadius: 999,
                    }}
                  >
                    Read case study <ArrowUpRight size={14} />
                  </a>
                )}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 22px",
                    background: project.caseStudy ? "transparent" : "var(--ink)",
                    color: project.caseStudy ? "var(--ink)" : "var(--bg)",
                    border: project.caseStudy ? "1px solid var(--rule-soft)" : "none",
                    textDecoration: "none",
                    fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
                    borderRadius: 999,
                  }}
                >
                  Repository <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ── Equalised card ────────────────────────────────────────────────────────
// All cards: same width, same height, no swatch image header, no kind/year tag.
// Just: index · title · blurb · stack chips · open arrow.
function ProjectCard({ p, onOpen }) {
  return (
    <article
      onClick={() => onOpen(p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p);
        }
      }}
      role="button"
      tabIndex={0}
      className="proj-card"
      style={{
        position: "relative",
        background: "var(--bg)",
        border: "1px solid var(--rule-soft)",
        cursor: "pointer",
        height: "100%",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        padding: "26px 26px 22px",
      }}
    >
      {/* Top row: index + open arrow */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
      }}>
        <span className="mono" style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--ink-mute)",
        }}>
          {p.n}
        </span>
        <span className="proj-arrow" style={{
          width: 28, height: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink-mute)",
          transition: "color 200ms ease, transform 250ms cubic-bezier(.2,.7,.2,1)",
        }}>
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* Title */}
      <h3 className="serif" style={{
        margin: "0 0 14px",
        fontSize: 24,
        lineHeight: 1.1,
        letterSpacing: "-0.015em",
        fontWeight: 400,
      }}>
        {p.title}
      </h3>

      {/* Blurb */}
      <p className="serif" style={{
        margin: "0 0 18px",
        fontSize: 14.5,
        lineHeight: 1.55,
        color: "var(--ink-soft)",
        fontWeight: 300,
        // Clamp to 4 lines so cards stay equal height regardless of blurb length
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        flex: 1,
      }}>
        {p.blurb}
      </p>

      {/* Stack: clamp to first 5 with "+N more" */}
      <div style={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        paddingTop: 14,
        borderTop: "1px solid var(--rule-soft)",
        marginTop: "auto",
      }}>
        {p.stack.slice(0, 5).map((s) => (
          <span key={s} className="mono" style={{
            fontSize: 10,
            letterSpacing: "0.04em",
            color: "var(--ink-mute)",
            padding: "3px 7px",
            background: "var(--bg-raised)",
            whiteSpace: "nowrap",
          }}>
            {s}
          </span>
        ))}
        {p.stack.length > 5 && (
          <span className="mono" style={{
            fontSize: 10,
            letterSpacing: "0.04em",
            color: "var(--ink-mute)",
            padding: "3px 7px",
          }}>
            +{p.stack.length - 5}
          </span>
        )}
      </div>
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────
export function Projects({ onOpenProject }) {
  const data = PORTFOLIO;
  const projects = data.projects;
  const handleOpen = onOpenProject || (() => {});

  return (
    <section id="work" data-screen-label="03 Projects" style={{ padding: "96px 0 80px", background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeader
          number="02"
          label="Projects"
          title="A working catalog — full-stack, ML, analytics."
        />

        <div style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }} className="proj-grid">
          {projects.map((proj) => (
            <ProjectCard key={proj.n} p={proj} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      <style>{`
        .proj-card {
          transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .3s ease, background .3s ease;
        }
        .proj-card:hover {
          transform: translateY(-3px);
          border-color: var(--ink) !important;
        }
        .proj-card:hover .proj-arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }
        .proj-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        @media (max-width: 1000px) {
          .proj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
