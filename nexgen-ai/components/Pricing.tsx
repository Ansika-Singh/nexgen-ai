"use client";
import { useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-DIMENSIONAL PRICING MATRIX
// Structure: tiers × billing × currencies
// Formula:   base_rate × regional_tariff × (annual ? 0.8 : 1)
// ─────────────────────────────────────────────────────────────────────────────
const PRICING_MATRIX = {
  // Regional tariff multipliers (market pricing parity)
  tariffs: {
    INR: 83.12,  // 1 USD ≈ ₹83.12 (market rate)
    USD: 1.0,
    EUR: 0.92,
  },
  // Regional rounding to nearest "clean" price point
  rounding: {
    INR: 100,
    USD: 1,
    EUR: 1,
  },
  symbols: {
    INR: "₹",
    USD: "$",
    EUR: "€",
  },
  // Base monthly rates in USD (single source of truth)
  tiers: {
    starter:    { base: 0 },
    pro:        { base: 49 },
    enterprise: { base: 199 },
  },
  annualDiscount: 0.8, // 20% off annual
} as const;

type Currency = "INR" | "USD" | "EUR";
type Billing  = "monthly" | "annual";

// Pure compute — no hardcoded UI values
function computePrice(
  tier: keyof typeof PRICING_MATRIX.tiers,
  billing: Billing,
  currency: Currency
): string {
  if (tier === "starter") return "Free";
  const base    = PRICING_MATRIX.tiers[tier].base;
  const tariff  = PRICING_MATRIX.tariffs[currency];
  const disc    = billing === "annual" ? PRICING_MATRIX.annualDiscount : 1;
  const raw     = billing === "annual" ? (base * tariff * disc * 12) : (base * tariff);
  const rounded = Math.round(raw / PRICING_MATRIX.rounding[currency]) * PRICING_MATRIX.rounding[currency];
  return `${PRICING_MATRIX.symbols[currency]}${rounded.toLocaleString()}`;
}

const TIERS = [
  {
    id: "starter" as const,
    name: "Starter",
    tagline: "For solo builders",
    features: [
      "5 pipelines",
      "1M events / month",
      "Community support",
      "1 team member",
      "Basic observability",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    id: "pro" as const,
    name: "Pro",
    tagline: "For growing teams",
    features: [
      "Unlimited pipelines",
      "50M events / month",
      "Priority email support",
      "10 team members",
      "Full trace & debug",
      "Custom connectors",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    tagline: "For production scale",
    features: [
      "Unlimited everything",
      "5B+ events / month",
      "Dedicated SRE team",
      "Unlimited members",
      "SOC 2 & HIPAA ready",
      "SLA-backed uptime",
      "Private edge regions",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

// Checkmark SVG using provided search.svg-style inline
const CheckIcon = ({ highlight }: { highlight: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="7" fill={highlight ? "rgba(23,43,54,0.25)" : "rgba(255,200,1,0.1)"}/>
    <path d="M5 8L7 10L11 6" stroke={highlight ? "#172B36" : "var(--forsythia)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
  </svg>
);

export default function Pricing() {
  // ── useRef (NOT useState) — avoids ANY parent re-render ──
  const billingRef  = useRef<Billing>("monthly");
  const currencyRef = useRef<Currency>("USD");

  // Direct DOM text-node mutations — zero parent re-renders
  const updatePrices = useCallback(() => {
    TIERS.forEach((tier) => {
      const priceEl = document.getElementById(`price-${tier.id}`);
      if (priceEl) {
        priceEl.textContent = computePrice(tier.id, billingRef.current, currencyRef.current);
      }
      const subEl = document.getElementById(`price-sub-${tier.id}`);
      if (subEl && tier.id !== "starter") {
        subEl.textContent =
          billingRef.current === "annual" ? "/ year" : "/ month";
      }
    });
  }, []);

  const handleBillingChange = useCallback(
    (billing: Billing) => {
      billingRef.current = billing;

      // Manually update toggle UI — zero re-render
      const monthlyBtn = document.getElementById("toggle-monthly");
      const annualBtn  = document.getElementById("toggle-annual");
      const thumb      = document.getElementById("toggle-thumb");

      if (monthlyBtn && annualBtn && thumb) {
        if (billing === "annual") {
          thumb.style.transform  = "translateX(calc(100% + 4px))";
          monthlyBtn.style.color = "var(--nocturnal)";
          annualBtn.style.color  = "var(--oceanic-noir)";
        } else {
          thumb.style.transform  = "translateX(0)";
          monthlyBtn.style.color = "var(--oceanic-noir)";
          annualBtn.style.color  = "var(--nocturnal)";
        }
      }
      updatePrices();
    },
    [updatePrices]
  );

  const handleCurrencyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      currencyRef.current = e.target.value as Currency;
      updatePrices();
    },
    [updatePrices]
  );

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}
    >
      {/* Section header */}
      <ScrollReveal>
        <header style={{ textAlign: "center", marginBottom: 56 }}>
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
            Pricing
          </span>
          <h2
            id="pricing-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--col-text-1)",
              marginBottom: 16,
            }}
          >
            Simple, predictable pricing
          </h2>
          <p style={{ color: "var(--col-text-2)", maxWidth: 420, margin: "0 auto", fontSize: 16, fontFamily: "var(--font-body)" }}>
            No hidden fees. No surprise bills. Scale only when you need to.
          </p>
        </header>
      </ScrollReveal>

      {/* ── Controls — billing toggle + currency switcher ── */}
      <ScrollReveal delay={150}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 48,
        }}>
        {/* Billing toggle */}
        <div
          role="group"
          aria-label="Billing cycle"
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--col-surface)",
            border: "1px solid var(--col-border)",
            borderRadius: 100,
            padding: "4px",
            position: "relative",
          }}
        >
          {/* Sliding thumb */}
          <div
            id="toggle-thumb"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 4, left: 4,
              width: "calc(50% - 4px)",
              height: "calc(100% - 8px)",
              background: "var(--forsythia)",
              borderRadius: 100,
              transition: `transform var(--dur-fast) var(--ease-out)`,
              zIndex: 0,
            }}
          />
          <button
            id="toggle-monthly"
            role="radio"
            aria-checked="true"
            onClick={() => handleBillingChange("monthly")}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px 20px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--oceanic-noir)",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: `color var(--dur-fast) var(--ease-out)`,
              fontFamily: "var(--font-body)",
            }}
          >
            Monthly
          </button>
          <button
            id="toggle-annual"
            role="radio"
            aria-checked="false"
            onClick={() => handleBillingChange("annual")}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px 20px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--nocturnal)",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: `color var(--dur-fast) var(--ease-out)`,
              fontFamily: "var(--font-body)",
            }}
          >
            Annual
          </button>
        </div>

        {/* Save 20% badge — permanently visible */}
        <div
          id="annual-badge"
          aria-live="polite"
          style={{
            background: "rgba(34,211,160,0.1)",
            border: "1px solid rgba(34,211,160,0.3)",
            color: "var(--col-success)",
            borderRadius: 100,
            padding: "4px 14px",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            opacity: 1,
            transition: `opacity var(--dur-fast) var(--ease-out)`,
          }}
        >
          Save 20%
        </div>

        {/* Currency selector */}
        <div style={{ position: "relative" }}>
          <label htmlFor="currency-select" style={{
            position: "absolute",
            width: 1, height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}>
            Currency
          </label>
          <select
            id="currency-select"
            onChange={handleCurrencyChange}
            defaultValue="USD"
            style={{
              background: "var(--col-surface)",
              border: "1px solid var(--col-border)",
              borderRadius: 8,
              padding: "9px 40px 9px 14px",
              color: "var(--col-text-1)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none",
            }}
          >
            <option value="USD">$ USD</option>
            <option value="INR">₹ INR</option>
            <option value="EUR">€ EUR</option>
          </select>
          {/* chevron-down from SVG pack */}
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--col-text-3)" }}>
            <ChevronDownIcon />
          </span>
        </div>
      </div>
    </ScrollReveal>

      {/* ── Pricing cards ── */}
      <div
        role="list"
        aria-label="Pricing tiers"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {TIERS.map((tier, idx) => (
          <ScrollReveal key={tier.id} delay={idx * 150} style={{ display: "flex", height: "100%" }}>
            <article
              role="listitem"
              aria-label={`${tier.name} plan`}
              style={{
                background: tier.highlight
                  ? "linear-gradient(145deg, var(--forsythia) 0%, var(--deep-saffron) 100%)"
                  : "var(--col-card)",
                border: tier.highlight
                  ? "1px solid var(--forsythia)"
                  : "1px solid var(--col-border)",
                borderRadius: 20,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                transition: `transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = tier.highlight
                  ? "0 12px 40px rgba(255,200,1,0.25)"
                  : "0 8px 32px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
            {tier.highlight && (
              <>
                <div aria-hidden="true" style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                }} />
                <div style={{
                  position: "absolute", top: 20, right: 20,
                  background: "rgba(23,43,54,0.35)",
                  borderRadius: 100,
                  padding: "3px 12px",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--oceanic-noir)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                }}>
                  MOST POPULAR
                </div>
              </>
            )}

            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: tier.highlight ? "var(--oceanic-noir)" : "var(--col-text-1)",
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}>
                {tier.name}
              </h3>
              <p style={{ fontSize: 13, color: tier.highlight ? "rgba(23,43,54,0.7)" : "var(--col-text-3)", fontFamily: "var(--font-body)" }}>
                {tier.tagline}
              </p>
            </div>

            {/* Price — DOM-mutated, zero parent re-render */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  id={`price-${tier.id}`}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 2.6rem)",
                    color: tier.highlight ? "var(--oceanic-noir)" : "var(--forsythia)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {tier.id === "starter" ? "Free" : computePrice(tier.id, "monthly", "USD")}
                </span>
              </div>
              {tier.id !== "starter" && (
                <span
                  id={`price-sub-${tier.id}`}
                  style={{
                    fontSize: 13,
                    color: tier.highlight ? "rgba(23,43,54,0.6)" : "var(--col-text-3)",
                    display: "block",
                    marginTop: 4,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  / month
                </span>
              )}
            </div>

            {/* Feature list */}
            <ul role="list" style={{ listStyle: "none", marginBottom: 28, flexGrow: 1 }}>
              {tier.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: tier.highlight ? "rgba(23,43,54,0.88)" : "var(--col-text-2)",
                    marginBottom: 10,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <CheckIcon highlight={tier.highlight} />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#"
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px 24px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                background: tier.highlight ? "var(--oceanic-noir)" : "transparent",
                color: tier.highlight ? "var(--forsythia)" : "var(--col-text-1)",
                border: tier.highlight ? "none" : "1px solid var(--col-border-hi)",
                transition: `transform var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)`,
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              {tier.cta}
            </a>
          </article>
        </ScrollReveal>
      ))}
      </div>
    </section>
  );
}
