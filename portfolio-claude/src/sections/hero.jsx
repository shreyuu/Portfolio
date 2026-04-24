// Hero — cinematic staggered reveal, editorial

function Hero() {
  const p = window.PORTFOLIO;
  const [time, setTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: "relative" }}>
      <div className="wrap">
        {/* Display headline */}
        <div style={{ position: "relative" }}>
          <h1
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(54px, 12vw, 192px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              fontOpticalSizing: "auto",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <div className="mask" style={{ display: "block" }}>
              <span style={{ display: "inline-block", animation: "heroUp 1100ms cubic-bezier(.2,.7,.2,1) 150ms both" }}>
                Shreyash
              </span>
            </div>
            <div className="mask" style={{ display: "block" }}>
              <span
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  animation: "heroUp 1100ms cubic-bezier(.2,.7,.2,1) 280ms both",
                }}
              >
                Meshram<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </div>
          </h1>
        </div>

        {/* Role + tagline grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          marginTop: 56,
          alignItems: "end",
        }} className="hero-grid">

          <Reveal delay={500}>
            <div className="mono" style={{
              fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--ink-mute)", maxWidth: 420,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 999, background: "var(--accent)",
                  boxShadow: "0 0 0 6px color-mix(in oklab, var(--accent) 22%, transparent)",
                  animation: "pulse 2.6s ease-in-out infinite",
                }} />
                <span style={{ color: "var(--ink)" }}>Full-Stack × Applied AI</span>
              </div>
              <div>
                — Nottingham, UK<br />
                — MSc Business Analytics, 25—26<br />
                — Currently freelancing &amp; open to grad roles
              </div>
            </div>
          </Reveal>

          <Reveal delay={650}>
            <p
              className="serif"
              style={{
                margin: 0,
                fontSize: "clamp(20px, 2.4vw, 30px)",
                lineHeight: 1.28,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                maxWidth: "28ch",
                justifySelf: "end",
                textAlign: "left",
              }}
            >
              I build <em style={{ fontStyle: "italic" }}>scalable backends</em>,
              thoughtful interfaces, and applied-ML systems that solve
              <em style={{ fontStyle: "italic" }}> actual problems</em>.
            </p>
          </Reveal>
        </div>

        <Reveal delay={900}>
          <div style={{
            marginTop: 72,
            paddingTop: 24,
            borderTop: "1px solid var(--rule-soft)",
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
          }}>
            <a href="#work" className="mono" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 22px", borderRadius: 999,
              background: "var(--ink)", color: "var(--bg)",
              fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
              textDecoration: "none",
            }}>
              View selected work <ArrowUpRight size={14} />
            </a>
            <a href="#contact" className="mono" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 22px", borderRadius: 999,
              border: "1px solid var(--rule-soft)",
              fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
              textDecoration: "none", color: "var(--ink)",
            }}>
              Get in touch
            </a>
            <span className="mono" style={{
              marginLeft: "auto", fontSize: 11, color: "var(--ink-mute)",
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              ↓ Scroll
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes heroUp {
          from { transform: translateY(110%); }
          to { transform: none; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 780px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > :last-child { justify-self: start !important; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
