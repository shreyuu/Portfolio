// Projects — three layouts: editorial / grid / list

function ProjectEditorial({ p, i }) {
  const flip = i % 2 === 1;
  return (
    <Reveal>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          padding: "56px 0",
          borderTop: "1px solid var(--rule-soft)",
          textDecoration: "none",
          color: "inherit",
        }}
        className="proj-editorial-row"
      >
        <div style={{ order: flip ? 2 : 1, display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="mono" style={{
            display: "flex", justifyContent: "space-between",
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}>
            <span>{p.n} · {p.kind}</span>
            <span>{p.year}</span>
          </div>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              fontStyle: "italic",
              fontOpticalSizing: "auto",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {p.title}
          </h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "48ch" }}>
            {p.blurb}
          </p>
          {p.highlights && (
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 8 }}>
              {p.highlights.map((h) => (
                <li key={h} className="mono" style={{
                  fontSize: 12, letterSpacing: "0.02em", color: "var(--ink)",
                  display: "flex", gap: 12, alignItems: "flex-start",
                }}>
                  <span style={{ color: "var(--accent)" }}>→</span> {h}
                </li>
              ))}
            </ul>
          )}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {p.stack.map((s) => <Chip key={s}>{s}</Chip>)}
          </div>
          <div className="mono u-link" style={{
            alignSelf: "flex-start", marginTop: 10,
            fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            View repository <ArrowUpRight size={12} />
          </div>
        </div>

        <ProjectVisual p={p} flip={flip} />
      </a>
    </Reveal>
  );
}

function ProjectVisual({ p, flip }) {
  // Abstract placeholder "artwork" — no illustrative SVG, just typographic/geometric
  return (
    <div style={{
      order: flip ? 1 : 2,
      position: "relative",
      aspectRatio: "4 / 5",
      background: "var(--bg-raised)",
      border: "1px solid var(--rule-soft)",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-start",
    }} className="proj-visual">
      {/* Diagonal stripes */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(135deg, var(--rule-soft) 0 1px, transparent 1px 22px)",
        opacity: 0.7,
      }} />
      {/* Huge index */}
      <div
        className="serif"
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(120px, 22vw, 280px)",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--ink)",
          opacity: 0.92,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          fontOpticalSizing: "auto",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {p.n}
      </div>
      {/* Kind strip */}
      <div className="mono" style={{
        position: "absolute",
        left: 16, top: 16,
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--ink-mute)",
      }}>
        fig. {p.n}
      </div>
      <div className="mono" style={{
        position: "absolute",
        right: 16, bottom: 16,
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--ink-mute)",
        textAlign: "right",
      }}>
        {p.title.toLowerCase().replace(/\s+/g, "-")}.gh
      </div>
    </div>
  );
}

function ProjectGridCard({ p }) {
  return (
    <Reveal>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="proj-grid-card"
        style={{
          display: "block",
          padding: "24px 22px",
          border: "1px solid var(--rule-soft)",
          background: "var(--bg-raised)",
          textDecoration: "none",
          color: "inherit",
          height: "100%",
          transition: "transform .4s ease, border-color .3s ease",
        }}
      >
        <div className="mono" style={{
          display: "flex", justifyContent: "space-between",
          fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--ink-mute)", marginBottom: 22,
        }}>
          <span>{p.n}</span>
          <span>{p.year}</span>
        </div>
        <h3 className="serif" style={{
          margin: "0 0 10px", fontSize: 28, lineHeight: 1.05,
          letterSpacing: "-0.02em", fontWeight: 400,
          fontStyle: "italic",
        }}>
          {p.title}
        </h3>
        <div className="mono" style={{
          fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 14,
        }}>
          {p.kind}
        </div>
        <p style={{
          margin: "0 0 18px", fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)",
        }}>
          {p.blurb}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.stack.slice(0, 4).map((s) => <Chip key={s}>{s}</Chip>)}
          {p.stack.length > 4 && <Chip>+{p.stack.length - 4}</Chip>}
        </div>
      </a>
    </Reveal>
  );
}

function ProjectListRow({ p }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Reveal>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "60px 2.4fr 1.4fr 1.4fr 40px",
          gap: 24,
          padding: "22px 0",
          borderTop: "1px solid var(--rule-soft)",
          alignItems: "baseline",
          textDecoration: "none",
          color: "inherit",
          position: "relative",
        }}
        className="proj-list-row"
      >
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-mute)" }}>
          {p.n}
        </span>
        <span
          className="serif"
          style={{
            fontSize: "clamp(22px, 2.6vw, 38px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            fontStyle: hover ? "italic" : "normal",
            color: hover ? "var(--accent)" : "var(--ink)",
            transition: "color .3s ease, font-style .3s ease",
          }}
        >
          {p.title}
        </span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
          {p.kind}
        </span>
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.stack.slice(0, 3).map((s) => <Chip key={s}>{s}</Chip>)}
        </span>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "flex-end",
          transform: hover ? "translate(3px, -3px)" : "none",
          transition: "transform .3s ease",
          color: hover ? "var(--accent)" : "var(--ink)",
        }}>
          <ArrowUpRight size={18} />
        </span>
      </a>
    </Reveal>
  );
}

function Projects({ layout = "grid" }) {
  const p = window.PORTFOLIO;
  const filtered = p.projects;

  return (
    <section id="work" style={{ padding: "96px 0 80px", background: "var(--bg)" }}>
      <div className="wrap">
        <SectionHeader
          number="02"
          label="Selected Work"
          title="Across full-stack, ML, and computer vision."
          kicker="A mix of shipped products and research prototypes. Repositories linked — click any title."
        />

        <Reveal delay={80}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: 24, flexWrap: "wrap",
            marginTop: 10, marginBottom: 32,
            paddingBottom: 18, borderBottom: "1px solid var(--rule-soft)",
          }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}>
              Layout · <span style={{ color: "var(--ink)" }}>{layout}</span>
            </div>
          </div>
        </Reveal>

        {layout === "editorial" && (
          <div>
            {filtered.map((proj, i) => (
              <ProjectEditorial key={proj.n} p={proj} i={i} />
            ))}
          </div>
        )}

        {layout === "grid" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
            className="proj-grid"
          >
            {filtered.map((proj) => (
              <ProjectGridCard key={proj.n} p={proj} />
            ))}
          </div>
        )}

        {layout === "list" && (
          <div style={{ borderBottom: "1px solid var(--rule-soft)" }}>
            <div className="mono" style={{
              display: "grid",
              gridTemplateColumns: "60px 2.4fr 1.4fr 1.4fr 40px",
              gap: 24,
              padding: "12px 0",
              fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}>
              <span>Nº</span>
              <span>Project</span>
              <span>Discipline</span>
              <span>Stack</span>
              <span style={{ textAlign: "right" }}>↗</span>
            </div>
            {filtered.map((proj) => (
              <ProjectListRow key={proj.n} p={proj} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .proj-editorial-row:hover .proj-visual { background: var(--ink); color: var(--bg); }
        .proj-editorial-row:hover .proj-visual > div { color: var(--bg) !important; }
        .proj-editorial-row .proj-visual { transition: background .4s ease; }
        .proj-grid-card:hover { transform: translateY(-4px); border-color: var(--ink) !important; }
        @media (max-width: 900px) {
          .proj-editorial-row { grid-template-columns: 1fr !important; }
          .proj-editorial-row > :first-child { order: 2 !important; }
          .proj-editorial-row > :last-child { order: 1 !important; }
          .proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .proj-list-row { grid-template-columns: 40px 2fr 1fr 30px !important; }
          .proj-list-row > :nth-child(4) { display: none; }
        }
        @media (max-width: 560px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Projects = Projects;
