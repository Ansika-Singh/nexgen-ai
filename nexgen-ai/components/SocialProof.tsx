"use client";
import ScrollReveal from "./ScrollReveal";

// arrow-trending-up icon from SVG pack
const TrendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941"/>
  </svg>
);

const LOGOS = [
  { name: "Stripe" },
  { name: "Linear" },
  { name: "Vercel" },
  { name: "Notion" },
  { name: "Figma" },
  { name: "Supabase" },
];

const TESTIMONIALS = [
  {
    quote: "We cut our ETL pipeline build time from 3 weeks to 4 hours. NexGen's adaptive routing alone saved us two dedicated data engineers.",
    name: "Priya Mehta",
    role: "Head of Data Engineering",
    company: "Razorpay",
    avatar: "PM",
  },
  {
    quote: "The state isolation in their pricing engine is genuinely impressive. Switching currencies doesn't flicker the rest of the page — something our own team couldn't achieve.",
    name: "Marcus Schmidt",
    role: "VP Engineering",
    company: "N26",
    avatar: "MS",
  },
  {
    quote: "SOC 2 compliance was a 6-month project at our last company. With NexGen, we got our audit report in 3 weeks. It's compliance as code.",
    name: "Akira Tanaka",
    role: "CTO",
    company: "Gojek",
    avatar: "AT",
  },
];

export default function SocialProof() {
  return (
    <>
      {/* Logo strip */}
      <ScrollReveal>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            display: flex;
            margin: 0 auto;
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
          .marquee-track {
            display: flex;
            gap: 64px;
            width: max-content;
            animation: marquee 25s linear infinite;
            padding: 8px 0;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .partner-logo {
            color: var(--col-text-3);
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 16px;
            letter-spacing: -0.02em;
            transition: color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
            cursor: default;
            user-select: none;
            white-space: nowrap;
          }
          .partner-logo:hover {
            color: var(--forsythia);
            transform: scale(1.08);
          }
        `}</style>
        <section
          aria-label="Trusted by leading companies"
          style={{
            borderTop: "1px solid var(--col-border)",
            borderBottom: "1px solid var(--col-border)",
            padding: "48px 24px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--col-text-3)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 36,
            }}>
              Trusted by teams at
            </p>
            <div className="marquee-container">
              <div className="marquee-track">
                {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    aria-label={logo.name}
                    className="partner-logo"
                  >
                    {logo.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}
      >
        <ScrollReveal>
          <h2
            id="testimonials-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--col-text-1)",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            What engineering teams say
          </h2>
        </ScrollReveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 150} style={{ display: "flex", height: "100%" }}>
              <figure
                style={{
                  background: "var(--col-card)",
                  border: "1px solid var(--col-border)",
                  borderRadius: 16,
                  padding: "28px",
                  margin: 0,
                  width: "100%",
                  transition: `border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,200,1,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--col-border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Stars */}
                <div aria-label="5 stars" style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="var(--forsythia)" aria-hidden="true">
                      <path d="M7 1L8.8 5.3H13.3L9.8 8L11 12.5L7 9.8L3 12.5L4.2 8L0.7 5.3H5.2L7 1Z"/>
                    </svg>
                  ))}
                </div>

                {/* Trending indicator using SVG from pack */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <span style={{ color: "var(--col-success)", display: "flex" }}>
                    <TrendingIcon />
                  </span>
                  <span style={{ fontSize: 11, color: "var(--col-success)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
                    VERIFIED CUSTOMER
                  </span>
                </div>

                <blockquote>
                  <p style={{
                    fontSize: 15,
                    color: "var(--col-text-2)",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    marginBottom: 20,
                    fontFamily: "var(--font-body)",
                  }}>
                    "{t.quote}"
                  </p>
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 40, height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--nocturnal) 0%, var(--oceanic-noir) 100%)",
                      border: "2px solid rgba(255,200,1,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--forsythia)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--col-text-1)", fontFamily: "var(--font-body)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--col-text-3)", fontFamily: "var(--font-body)" }}>{t.role}, {t.company}</div>
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
