// About + Toolkit

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, Reveal, ArrowUpRight } from "../components/primitives.jsx";

export function About() {
  const p = PORTFOLIO;

  return (
    <section id="about" data-screen-label="02 About + Toolkit" style={{ padding: "96px 0 64px" }}>
      <div className="wrap">
        <SectionHeader
          number="01"
          label="Profile"
          title="A full-stack engineer who treats craft as the feature."
        />

        <div style={{ marginTop: 40, maxWidth: 980 }}>
          <Reveal>
            <div style={{ display: "grid", gap: 22 }}>
              {p.about.map((para, i) => (
                <p
                  key={i}
                  className="serif"
                  style={{
                    margin: 0,
                    fontSize: "clamp(18px, 1.6vw, 22px)",
                    lineHeight: 1.55,
                    fontWeight: 400,
                    color: "var(--ink)",
                    maxWidth: "60ch",
                  }}
                >
                  {para}
                </p>
              ))}

              <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "GitHub", href: p.github },
                  { label: "LinkedIn", href: p.linkedin },
                  { label: "Email", href: `mailto:${p.email}` },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono u-link"
                    style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}
                  >
                    {l.label} <ArrowUpRight size={11} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Toolkit — minimal: category label / clean comma list */}
        <div style={{ marginTop: 112 }}>
          <Reveal>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--ink-mute)", marginBottom: 32,
              display: "flex", alignItems: "baseline", gap: 14,
            }}>
              <span>§ 01.2</span>
              <span style={{ flex: "0 0 32px", height: 1, background: "currentColor", opacity: 0.5, alignSelf: "center" }} />
              <span style={{ color: "var(--ink)" }}>Toolkit</span>
              <span style={{ flex: 1, height: 1, background: "var(--rule-soft)", alignSelf: "center" }} />
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0 80px",
          }} className="tk-grid">
            {p.skills.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 40}>
                <div className="tk-row" style={{
                  padding: "22px 0",
                  borderTop: "1px solid var(--rule-soft)",
                }}>
                  <h4 className="serif" style={{
                    margin: "0 0 10px",
                    fontSize: 18,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--ink-soft)",
                  }}>
                    {cat.label}
                  </h4>
                  <p className="serif" style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                    fontWeight: 300,
                  }}>
                    {cat.items.join(", ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .tk-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}
