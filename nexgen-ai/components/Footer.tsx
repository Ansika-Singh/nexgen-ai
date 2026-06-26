"use client";

// link-solid SVG from pack
const LinkSolidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037a.75.75 0 0 1-.646 1.353a5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353a5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037a.75.75 0 0 1-.354-1Z" clipRule="evenodd"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Developers: ["Documentation", "API Reference", "SDKs", "Status"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--col-border)",
        background: "var(--col-surface)",
        padding: "64px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(4, 1fr)",
            gap: 48,
            marginBottom: 64,
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              {/* cube-16-solid from pack */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16" aria-hidden="true">
                <rect width="16" height="16" rx="4" fill="var(--forsythia)"/>
                <path fill="var(--oceanic-noir)" d="M8.372 3.349a.75.75 0 0 0-.744 0L2.818 6.097 8 9.131l5.182-3.034zM14 7.357L8.75 10.43v4.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 7.078V10.43L2 7.357V11c0 .27.144.518.378.651z"/>
              </svg>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--col-text-1)" }}>
                NexGen<span style={{ color: "var(--forsythia)" }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--col-text-3)", lineHeight: 1.7, maxWidth: 220, fontFamily: "var(--font-body)" }}>
              The AI-native data automation platform for engineering teams that move fast.
            </p>
            {/* Social links using link-solid from pack */}
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`NexGen AI on ${s}`}
                  style={{
                    width: 32, height: 32,
                    borderRadius: 6,
                    border: "1px solid var(--col-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--col-text-3)",
                    textDecoration: "none",
                    transition: `border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--forsythia)";
                    (e.currentTarget as HTMLElement).style.color = "var(--forsythia)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--col-text-3)";
                  }}
                >
                  <LinkSolidIcon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h3 style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--col-text-3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                marginBottom: 16,
              }}>
                {cat}
              </h3>
              <ul role="list" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "var(--col-text-3)",
                        textDecoration: "none",
                        transition: `color var(--dur-fast) var(--ease-out)`,
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--col-text-1)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--col-text-3)")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--col-border)",
          paddingTop: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <p style={{ fontSize: 13, color: "var(--col-text-3)", fontFamily: "var(--font-body)" }}>
            © {year} NexGen AI, Inc. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--col-text-3)", fontFamily: "var(--font-mono)" }}>
            Built with JetBrains Mono · Inter · Forsythia #FFC801
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
