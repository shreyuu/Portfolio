// Experience + Education as two parallel columns

function ExperienceSection() {
  const p = window.PORTFOLIO;
  return (
    <section id="experience" style={{ padding: "96px 0 80px" }}>
      <div className="wrap">
        <SectionHeader
          number="03"
          label="Trajectory"
          title="Experience &amp; Education"
          kicker="Three internships shaping the engineering side; three degrees shaping the analytical one."
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

window.ExperienceSection = ExperienceSection;
