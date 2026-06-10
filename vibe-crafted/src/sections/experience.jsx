// Experience + Education as two parallel columns

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, Reveal, Chip } from "../components/primitives.jsx";

export function ExperienceSection() {
  const p = PORTFOLIO;
  return (
    <section id="experience" data-screen-label="04 Experience + Education" style={{ padding: "96px 0 80px" }}>
      <div className="wrap">
        <SectionHeader
          number="03"
          label="Trajectory"
          title="Experience &amp; Education"
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          marginTop: 32,
        }} className="exp-grid">
          {/* Experience column */}
          <Reveal>
            <div>
              <div className="mono" style={{
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--ink-mute)", marginBottom: 18,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span>Work</span>
                <span style={{ flex: 1, height: 1, background: "var(--rule-soft)" }} />
                <span>{p.experience.length} Roles</span>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {p.experience.map((e, i) => (
                  <li key={i} style={{
                    padding: "24px 0",
                    borderTop: "1px solid var(--rule-soft)",
                    borderBottom: i === p.experience.length - 1 ? "1px solid var(--rule-soft)" : "none",
                  }}>
                    <div className="mono" style={{
                      fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--ink-mute)", marginBottom: 10,
                      display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap",
                    }}>
                      <span>{e.period}</span>
                      <span>{e.duration}</span>
                    </div>
                    <h3 className="serif" style={{
                      margin: "0 0 4px", fontSize: 24, lineHeight: 1.15,
                      letterSpacing: "-0.015em", fontWeight: 400,
                    }}>
                      {e.role}
                    </h3>
                    <div className="mono" style={{
                      fontSize: 12, letterSpacing: "0.08em",
                      color: "var(--accent)", marginBottom: 10,
                    }}>
                      ↳ {e.company}
                    </div>
                    <p style={{
                      margin: "0 0 12px", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)",
                    }}>
                      {e.blurb}
                    </p>
                    {e.outcomes && e.outcomes.length > 0 && (
                      <ul style={{
                        listStyle: "none", margin: "0 0 14px", padding: 0,
                        display: "grid", gap: 6,
                      }}>
                        {e.outcomes.map((o) => (
                          <li key={o} style={{
                            fontSize: 13, lineHeight: 1.5, color: "var(--ink)",
                            display: "flex", gap: 10, alignItems: "flex-start",
                          }}>
                            <span style={{
                              color: "var(--accent)",
                              flexShrink: 0,
                              fontFamily: "var(--mono)",
                              fontSize: 11,
                              transform: "translateY(2px)",
                            }}>→</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {e.skills.map((s) => <Chip key={s}>{s}</Chip>)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Education column */}
          <Reveal delay={150}>
            <div>
              <div className="mono" style={{
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--ink-mute)", marginBottom: 18,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span>Education</span>
                <span style={{ flex: 1, height: 1, background: "var(--rule-soft)" }} />
                <span>{p.education.length} Programmes</span>
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {p.education.map((e, i) => (
                  <li key={i} style={{
                    padding: "24px 0",
                    borderTop: "1px solid var(--rule-soft)",
                    borderBottom: i === p.education.length - 1 ? "1px solid var(--rule-soft)" : "none",
                  }}>
                    <div className="mono" style={{
                      fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--ink-mute)", marginBottom: 10,
                      display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap",
                    }}>
                      <span>{e.period}</span>
                      <span>{e.place}</span>
                    </div>
                    <h3 className="serif" style={{
                      margin: "0 0 4px", fontSize: 22, lineHeight: 1.15,
                      letterSpacing: "-0.015em", fontWeight: 400,
                    }}>
                      {e.school}
                    </h3>
                    <div className="mono" style={{
                      fontSize: 12, letterSpacing: "0.08em",
                      color: "var(--accent)", marginBottom: 12,
                    }}>
                      {e.degree}
                    </div>
                    <ul style={{
                      listStyle: "none", margin: 0, padding: 0,
                      display: "grid", gap: 4,
                    }}>
                      {e.notes.map((n, j) => (
                        <li key={j} className="mono" style={{
                          fontSize: 11.5, letterSpacing: "0.02em",
                          color: "var(--ink-soft)",
                          paddingLeft: 16, position: "relative",
                        }}>
                          <span style={{
                            position: "absolute", left: 0, top: "0.55em",
                            width: 8, height: 1, background: "var(--rule-soft)",
                          }} />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
