"use client";
import { useState, useEffect } from "react";

// search SVG from pack
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
    <path fill="currentColor" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
  </svg>
);

// x-mark from pack
const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

// Hamburger lines
const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: `background var(--dur-layout) var(--ease-inout), border-color var(--dur-layout) var(--ease-inout)`,
        background: scrolled ? "rgba(13,30,36,0.9)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--col-border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — cube-16-solid icon from pack */}
        <a href="/" aria-label="NexGen AI Home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" aria-hidden="true">
            <rect width="16" height="16" rx="4" fill="var(--forsythia)"/>
            <path fill="var(--oceanic-noir)" d="M8.372 3.349a.75.75 0 0 0-.744 0L2.818 6.097 8 9.131l5.182-3.034zM14 7.357L8.75 10.43v4.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 7.078V10.43L2 7.357V11c0 .27.144.518.378.651z"/>
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--col-text-1)", letterSpacing: "-0.02em" }}>
            NexGen<span style={{ color: "var(--forsythia)" }}>AI</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul role="list" style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }} className="desktop-nav">
          {["Features", "Pricing", "Docs", "Blog"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  color: "var(--col-text-2)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: `color var(--dur-fast) var(--ease-out)`,
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--col-text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--col-text-2)")}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="desktop-cta">
          <a
            href="#"
            style={{ color: "var(--col-text-2)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: `color var(--dur-fast) var(--ease-out)`, fontFamily: "var(--font-body)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--col-text-1)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--col-text-2)")}
          >
            Sign in
          </a>
          <a
            href="#pricing"
            style={{
              background: "var(--forsythia)",
              color: "var(--oceanic-noir)",
              textDecoration: "none",
              padding: "8px 20px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              transition: `opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)`,
              display: "inline-block",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Get started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "1px solid var(--col-border)",
            borderRadius: 8,
            padding: "8px",
            cursor: "pointer",
            color: "var(--col-text-1)",
            display: "none",
          }}
        >
          {menuOpen ? <XMarkIcon /> : <HamburgerIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--col-surface)",
            borderTop: "1px solid var(--col-border)",
            padding: "16px 24px 24px",
            animation: `fadeIn 0.2s var(--ease-out)`,
          }}
          className="mobile-menu"
        >
          <ul role="list" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
            {["Features", "Pricing", "Docs", "Blog"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--col-text-2)", textDecoration: "none", fontSize: 16, fontWeight: 500, fontFamily: "var(--font-body)" }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a href="#pricing" onClick={() => setMenuOpen(false)}
            style={{
              background: "var(--forsythia)",
              color: "var(--oceanic-noir)",
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-body)",
            }}>
            Get started free
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
