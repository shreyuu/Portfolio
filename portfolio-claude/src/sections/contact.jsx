// Contact / Footer

function Contact() {
  const p = window.PORTFOLIO;
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(p.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  };

  return (
    <section id="contact" style={{
      padding: "120px 0 48px",
      borderTop: "1px solid var(--rule-soft)",
      marginTop: 40,
      background: "var(--bg-raised)",
    }}>
      <div className="wrap">

        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--ink-mute)", marginBottom: 24,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span>§ 04</span>
          <span style={{ flex: "0 0 30px", height: 1, background: "currentColor", opacity: 0.5 }} />
          <span>Get in touch</span>
        </div>

        <Reveal>
          <h2 className="serif" style={{
            margin: 0,
            fontSize: "clamp(44px, 8vw, 140px)",
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            fontWeight: 400,
            fontOpticalSizing: "auto",
            fontVariationSettings: '"opsz" 144',
          }}>
            Let&rsquo;s build
            <br />
            <span style={{ fontStyle: "italic" }}>something</span> together<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>

        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
        }} className="contact-grid">

          <Reveal delay={150}>
            <div>
              <p style={{
                fontSize: 17, lineHeight: 1.6,
                color: "var(--ink-soft)",
                maxWidth: "46ch",
                margin: "0 0 28px",
              }}>
                I&rsquo;m actively looking for full-stack and AI engineering
                roles starting September 2026. If you&rsquo;re hiring, have a
                side project, or just want to talk about applied ML — I&rsquo;d
                love to hear from you.
              </p>

              <button
                onClick={copyEmail}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 14,
                  padding: "18px 26px", borderRadius: 999,
                  background: "var(--ink)", color: "var(--bg)",
                  textDecoration: "none",
                }}
                className="mono"
              >
                <span style={{
                  fontSize: 13, letterSpacing: "0.06em",
                  fontFamily: "var(--mono)",
                }}>
                  {copied ? "copied to clipboard ✓" : p.email}
                </span>
                <span style={{ opacity: 0.6, fontSize: 10 }}>
                  {copied ? "" : "·  click to copy"}
                </span>
              </button>

              <div style={{
                marginTop: 36,
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 520,
              }}>
                {[
                  { label: "GitHub", val: "shreyuu", href: p.github },
                  { label: "LinkedIn", val: "in/shreyuu", href: p.linkedin },
                  { label: "Based in", val: p.location, href: null },
                  { label: "CV", val: "download.pdf ↗", href: p.resume },
                ].map((x) => (
                  <div key={x.label}>
                    <div className="mono" style={{
                      fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "var(--ink-mute)", marginBottom: 4,
                    }}>{x.label}</div>
                    {x.href ? (
                      <a href={x.href} target="_blank" rel="noreferrer" className="u-link"
                         style={{ fontSize: 15 }}>{x.val}</a>
                    ) : (
                      <span style={{ fontSize: 15 }}>{x.val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div
              className="mono"
              style={{
                padding: 24,
                border: "1px solid var(--rule-soft)",
                background: "var(--bg)",
                fontSize: 12,
                lineHeight: 1.7,
                letterSpacing: "0.02em",
                color: "var(--ink-soft)",
              }}
            >
              <div style={{ color: "var(--ink-mute)", marginBottom: 10, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                # available_for.yml
              </div>
              <div><span style={{ color: "var(--accent)" }}>roles</span>:</div>
              <div>  - full_stack_engineer</div>
              <div>  - ai_engineer</div>
              <div>  - applied_ml</div>
              <div><span style={{ color: "var(--accent)" }}>start_date</span>: 2026-09</div>
              <div><span style={{ color: "var(--accent)" }}>location</span>:</div>
              <div>  - nottingham_uk</div>
              <div>  - remote</div>
              <div>  - open_to_relocation</div>
              <div><span style={{ color: "var(--accent)" }}>response_time</span>: ~24h</div>
              <div style={{ marginTop: 10, color: "var(--ink-mute)" }}>
                # reply guaranteed.
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{
          marginTop: 96,
          paddingTop: 24,
          borderTop: "1px solid var(--rule-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }} className="mono">
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
            © {new Date().getFullYear()} Shreyash Meshram · All rights reserved
          </span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
            Designed &amp; built in Nottingham · v2.0
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

window.Contact = Contact;
