"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

// SVG icons from provided pack (inline, currentColor for theming)
const IconOrchestration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="currentColor" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"/>
  </svg>
);

const IconIntelligence = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/>
  </svg>
);

const IconObservability = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941"/>
  </svg>
);

const IconScale = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
  </svg>
);

const IconCompliance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929z"/>
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </g>
  </svg>
);

const IconIntegration = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
  </svg>
);

const FEATURES = [
  {
    id: 0,
    Icon: IconOrchestration,
    tag: "Orchestration",
    title: "Zero-Config Pipeline Builder",
    desc: "Define sources, transforms, and sinks in TypeScript. NexGen infers schemas, validates types at the edge, and auto-provisions compute — no YAML, no infra work.",
    metric: "80% less config",
  },
  {
    id: 1,
    Icon: IconIntelligence,
    tag: "Intelligence",
    title: "Adaptive Model Routing",
    desc: "Built-in model registry automatically selects the optimal AI model per workload — latency-sensitive tasks hit edge models, complex reasoning routes to frontier LLMs.",
    metric: "3× faster inference",
  },
  {
    id: 2,
    Icon: IconObservability,
    tag: "Observability",
    title: "Real-Time Trace & Debug",
    desc: "Every event, transform, and model call is captured in an immutable trace log. Drill into sub-millisecond execution graphs without leaving your dashboard.",
    metric: "Full lineage visibility",
  },
  {
    id: 3,
    Icon: IconScale,
    tag: "Scale",
    title: "Global Edge Execution",
    desc: "Deploy pipelines to 28 edge regions simultaneously. Auto-scales from zero to millions of events per second with no cold-start penalty.",
    metric: "28 regions · <8ms p99",
  },
  {
    id: 4,
    Icon: IconCompliance,
    tag: "Compliance",
    title: "SOC 2 Type II Native",
    desc: "End-to-end encryption, data residency controls, automated audit trails, and role-based access — compliance baked into every pipeline by default.",
    metric: "SOC 2 · GDPR · HIPAA",
  },
  {
    id: 5,
    Icon: IconIntegration,
    tag: "Integration",
    title: "200+ Native Connectors",
    desc: "Plug into Postgres, Snowflake, BigQuery, S3, Kafka, Salesforce, and 190+ more sources and sinks with one-line config and managed auth.",
    metric: "200+ connectors",
  },
];

// Bento cell layout config
const BENTO_CONFIG = [
  { gridColumn: "span 2", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 1", gridRow: "span 1" },
  { gridColumn: "span 2", gridRow: "span 1" },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Context-lock ref: persists hovered bento index for transfer on resize
  const hoverIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      // CONTEXT TRANSFER: carry active bento hover index into accordion on resize
      if (mobile && hoverIndexRef.current !== null) {
        setActiveIndex(hoverIndexRef.current);
      } else if (!mobile) {
        setActiveIndex(null);
      }
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const handleBentoHover = useCallback((idx: number | null) => {
    hoverIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  const toggleAccordion = useCallback((idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}
    >
      {/* Section header */}
      <ScrollReveal>
        <header style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--forsythia)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 16,
          }}>
            Platform capabilities
          </span>
          <h2
            id="features-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--col-text-1)",
              marginBottom: 16,
            }}
          >
            Everything your data stack needs
          </h2>
          <p style={{ color: "var(--col-text-2)", maxWidth: 480, margin: "0 auto", fontSize: 16, fontFamily: "var(--font-body)" }}>
            From ingestion to insight, NexGen handles every layer of your data
            infrastructure with zero-ops intelligence.
          </p>
        </header>
      </ScrollReveal>

      {/* ── ACCORDION — option wise, click to expand ── */}
      <div role="list" aria-label="Platform features">
        {FEATURES.map((feat, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <ScrollReveal
              key={feat.id}
              delay={idx * 80}
            >
              <div
                role="listitem"
                style={{
                  border: `1px solid ${isOpen ? "var(--forsythia)" : "var(--col-border)"}`,
                  borderRadius: 12,
                  marginBottom: 8,
                  overflow: "hidden",
                  transition: `border-color var(--dur-fast) var(--ease-out)`,
                }}
              >
                <button
                  aria-expanded={isOpen}
                  aria-controls={`feat-panel-${idx}`}
                  id={`feat-btn-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: "100%",
                    background: isOpen ? "rgba(255,200,1,0.05)" : "var(--col-card)",
                    border: "none",
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: `background var(--dur-fast) var(--ease-out)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: 8,
                      background: "rgba(255,200,1,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--forsythia)",
                    }}>
                      <feat.Icon />
                    </div>
                    <div>
                      <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--deep-saffron)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {feat.tag}
                      </span>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--col-text-1)", letterSpacing: "-0.01em" }}>
                        {feat.title}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    display: "inline-block",
                    transition: `transform var(--dur-layout) var(--ease-inout)`,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    flexShrink: 0,
                    color: "var(--col-text-3)",
                  }}>
                    <ChevronDown />
                  </span>
                </button>

                {/* Accordion panel — pure CSS max-height, no JS libs */}
                <div
                  id={`feat-panel-${idx}`}
                  role="region"
                  aria-labelledby={`feat-btn-${idx}`}
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "280px" : "0",
                    transition: `max-height var(--dur-layout) var(--ease-inout)`,
                  }}
                >
                  <div style={{ padding: "0 20px 20px", background: "var(--col-card)" }}>
                    <p style={{ fontSize: 14, color: "var(--col-text-2)", lineHeight: 1.65, marginBottom: 14, fontFamily: "var(--font-body)" }}>
                      {feat.desc}
                    </p>
                    <div style={{
                      display: "inline-block",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--col-success)",
                      background: "rgba(34,211,160,0.08)",
                      border: "1px solid rgba(34,211,160,0.2)",
                      borderRadius: 6,
                      padding: "3px 10px",
                    }}>
                      {feat.metric}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
