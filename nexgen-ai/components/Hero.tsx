"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered entry animation — all within 500ms TTI budget
    const elements = heroRef.current?.querySelectorAll("[data-anim]");
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(20px)";
      setTimeout(() => {
        htmlEl.style.transition = `opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)`;
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      }, 80 + i * 80); // 80, 160, 240, 320ms — all under 500ms TTI
    });
  }, []);

  return (
    <main id="hero" aria-labelledby="hero-heading" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background layers */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Brand-colored grid */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        {/* Forsythia accent glow */}
        <div style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(255,200,1,0.12) 0%, rgba(255,153,50,0.06) 40%, transparent 70%)",
          filter: "blur(30px)",
        }} />
        {/* Nocturnal teal orb top-right */}
        <div style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(17,76,90,0.35) 0%, transparent 70%)",
        }} />
        {/* Deep saffron orb bottom-left */}
        <div style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,50,0.08) 0%, transparent 70%)",
        }} />
      </div>

      <section
        ref={heroRef}
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "160px 24px 120px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {/* Eyebrow badge */}
        <div
          data-anim
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,200,1,0.08)",
            border: "1px solid rgba(255,200,1,0.25)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--forsythia)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--col-success)",
            animation: "pulseGlow 2s ease-in-out infinite",
            display: "inline-block",
          }} />
          Now in public beta · 2,400+ teams onboarded
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          data-anim
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--col-text-1)",
            maxWidth: 860,
            margin: "0 auto 24px",
          }}
        >
          Data Pipelines That{" "}
          <span className="gradient-text">Think for Themselves</span>
        </h1>

        {/* Subheadline */}
        <p
          data-anim
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--col-text-2)",
            maxWidth: 580,
            margin: "0 auto 44px",
            lineHeight: 1.7,
            fontWeight: 400,
            fontFamily: "var(--font-body)",
          }}
        >
          NexGen AI orchestrates, transforms, and deploys your enterprise data
          workflows with sub-second latency — no config files, no manual tuning,
          no ops overhead.
        </p>

        {/* CTA Group */}
        <div
          data-anim
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <a
            href="#pricing"
            style={{
              background: "var(--forsythia)",
              color: "var(--oceanic-noir)",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-body)",
              transition: `transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,200,1,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start building free
            {/* chevron-right SVG from pack */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </a>
          <a
            href="#features"
            style={{
              background: "transparent",
              color: "var(--col-text-1)",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 500,
              border: "1px solid var(--col-border-hi)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-body)",
              transition: `border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--forsythia)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--col-border-hi)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* arrow-trending-up from SVG pack */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941"/>
            </svg>
            See live demo
          </a>
        </div>

        {/* Stats row */}
        <div
          data-anim
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            maxWidth: 680,
            margin: "0 auto",
            background: "var(--col-border)",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--col-border)",
          }}
        >
          {[
            { value: "99.97%", label: "Uptime SLA" },
            { value: "<8ms", label: "Median latency" },
            { value: "2.4M+", label: "Pipelines / day" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--col-card)", padding: "20px 16px", textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                color: "var(--forsythia)",
                letterSpacing: "-0.03em",
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--col-text-3)", marginTop: 4, fontWeight: 500, fontFamily: "var(--font-body)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal code preview */}
        <figure
          data-anim
          aria-label="Code preview: NexGen AI pipeline definition"
          style={{
            marginTop: 72,
            background: "var(--col-surface)",
            border: "1px solid var(--col-border)",
            borderRadius: 16,
            overflow: "hidden",
            maxWidth: 780,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          <figcaption style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "12px 16px",
            borderBottom: "1px solid var(--col-border)",
            background: "rgba(255,255,255,0.02)",
          }}>
            {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
              <span key={i} aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: 12, color: "var(--col-text-3)", fontFamily: "var(--font-mono)" }}>
              pipeline.nexgen.ts
            </span>
            {/* link.svg from pack */}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" style={{ marginLeft: "auto", color: "var(--col-text-3)" }}>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
            </svg>
          </figcaption>
          <pre style={{
            padding: "24px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            lineHeight: 1.8,
            color: "var(--col-text-2)",
            overflow: "auto",
          }}>
            <code>{`import { pipeline } from "@nexgen/core";

const etl = pipeline({
  source: sources.postgres({ table: "events" }),
  transform: [
    ai.classify({ model: "nexgen-v3" }),
    ai.enrich({ lookup: "customer_profiles" }),
    validators.schema(EventSchema),
  ],
  sink: sinks.bigquery({ dataset: "analytics_prod" }),
  schedule: "*/5 * * * *",
});

await etl.`}<span style={{ color: "var(--forsythia)" }}>deploy</span>{`(); // ✓ Live in 1.2s`}</code>
          </pre>
        </figure>
      </section>

      <style>{`
        @media (max-width: 640px) {
          #hero section { padding: 120px 16px 80px !important; }
        }
      `}</style>
    </main>
  );
}
