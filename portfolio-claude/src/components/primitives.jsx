// Reusable primitives: reveal, mask text, section headers

const { useEffect, useRef, useState, useMemo, useCallback } = React;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, as: As = "div", className = "", style, ...rest }) {
  const [ref, inView] = useInView(0.12);
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}

// Animated split-text that masks per word
function MaskText({ text, delay = 0, stagger = 35, className = "", style, as: As = "span" }) {
  const [ref, inView] = useInView(0.1);
  const words = String(text).split(" ");
  return (
    <As ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span className={`mask ${inView ? "in" : ""}`} key={i} style={{ marginRight: "0.28em" }}>
          <span style={{ "--d": `${delay + i * stagger}ms` }}>{w}</span>
        </span>
      ))}
    </As>
  );
}

// Section header: "§ 02 — Selected Work"
function SectionHeader({ number, label, title, kicker }) {
  return (
    <header style={{ display: "grid", gap: 12, marginBottom: 28 }}>
      <div
        className="mono"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--ink-mute)",
        }}
      >
        <span>§ {number}</span>
        <span style={{ flex: "0 0 24px", height: 1, background: "currentColor", opacity: 0.5 }} />
        <span>{label}</span>
      </div>
      {title && (
        <MaskText
          text={title}
          as="h2"
          className="serif"
          style={{
            fontSize: "clamp(32px, 4.2vw, 58px)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            margin: 0,
            fontStyle: "italic",
            fontOpticalSizing: "auto",
            fontVariationSettings: '"opsz" 144',
          }}
        />
      )}
      {kicker && (
        <Reveal delay={200}>
          <p
            style={{
              margin: 0,
              maxWidth: "52ch",
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
            }}
          >
            {kicker}
          </p>
        </Reveal>
      )}
    </header>
  );
}

// Chip
function Chip({ children, style, ...rest }) {
  return (
    <span
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 9px",
        fontSize: 11,
        letterSpacing: "0.02em",
        border: "1px solid var(--rule-soft)",
        borderRadius: 999,
        color: "var(--ink-soft)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

// Arrow icon
function ArrowUpRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ transition: "transform .25s ease" }}>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

Object.assign(window, { useInView, Reveal, MaskText, SectionHeader, Chip, ArrowUpRight });
