/*
 * SleepChallenge.jsx — Wellness Atlas "Discover Deep Sleep Secrets in 5 Days"
 * -------------------------------------------------------------------------
 * Rebuilt on the UPDATED wellness-atlas.css (.wa-page theme system).
 *
 * • Root carries  `wa-page wa-theme--sleep`  → night-indigo palette.
 * • Every colour reads a theme token (var(--accent), var(--forest), …) so
 *   this page stays visually in sync with the Health & Toxin pages — swap
 *   the theme class to repaint the whole thing.
 * • Buttons are inline-styled (immune to app/global CSS); nav uses `.tt-nav`.
 * • Bootstrap 5 grid (.row/.col-*) handles responsive columns.
 *
 * Load once, in this order (index.js, after install of bootstrap):
 *   import "bootstrap/dist/css/bootstrap.min.css";
 *   import "./styles/wellness-atlas.css";
 *
 * React 16.8+ (hooks). No other JS deps — the accordion is handled in React.
 */
import React, { useState, useEffect, useCallback } from "react";
import productivityIcon from "../../../assets/images/icon-productivity.svg";
import happinessIcon from "../../../assets/images/icon-happiness.svg";
import healthIcon from "../../../assets/images/icon-health.svg";
import heroSleep from "../../../assets/images/hero-sleep.svg";
import meditationImg from "../../../assets/images/program-meditation.svg";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo/WellnessAtlas_Logo1.png";
/* ----------------------------------------------------------------------- */
/* Shared inline style helpers (all reference wellness-atlas.css tokens)    */
/* ----------------------------------------------------------------------- */
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Archivo', 'Helvetica Neue', Arial, sans-serif";

const eyebrow = {
  fontFamily: SANS, fontSize: 13, fontWeight: 700,
  letterSpacing: "0.22em", textTransform: "uppercase",
  color: "var(--accent)", margin: 0,
};
const h1Style = {
  fontFamily: SERIF, fontWeight: 400,
  fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: 1.05,
  letterSpacing: "-0.01em", color: "var(--ink)", margin: 0,
};
const h2Style = {
  fontFamily: SERIF, fontWeight: 600,
  fontSize: "clamp(28px, 3.4vw, 42px)", letterSpacing: "-0.01em",
  color: "var(--ink)", margin: 0,
};
const subStyle = {
  fontFamily: SERIF, fontSize: "clamp(19px, 2vw, 23px)",
  lineHeight: 1.55, color: "var(--ink-3)", margin: 0, textWrap: "pretty",
};
const bodyStyle = {
  fontFamily: SANS, fontSize: 16, lineHeight: 1.7,
  color: "var(--ink-3)", margin: 0, textWrap: "pretty",
};
const tagStyle = {
  fontFamily: SANS, fontSize: 13, fontWeight: 700,
  letterSpacing: "0.14em", textTransform: "uppercase",
  color: "var(--accent)", margin: 0,
};
const container = { maxWidth: 1180, margin: "0 auto", padding: "0 40px" };
const sectionPad = { padding: "clamp(56px, 8vw, 96px) 0" };

// Buttons are inline-styled (not class-based) so no global/app CSS can
// override them. Matches .wa-btn in wellness-atlas.css.
const btnSolid = {
  display: "inline-block", fontFamily: SANS, fontSize: 12, fontWeight: 700,
  letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none",
  padding: "14px 26px", color: "var(--paper-2)", background: "var(--accent)",
  border: "1.5px solid var(--accent)", borderRadius: "var(--btn-radius, 8px)",
  cursor: "pointer", whiteSpace: "nowrap",
  lineHeight: 1.2, textAlign: "center", appearance: "none", WebkitAppearance: "none",
};
// Reset for the large two-line CTA <button>s built from raw inline styles.
const btnCtaReset = { border: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none", font: "inherit", textAlign: "left" };
const btnOutline = {
  ...btnSolid, color: "var(--ink)", background: "none", padding: "12px 22px",
};
// outline button placed on a dark (forest) surface
const btnOutlineOnDark = {
  ...btnOutline, color: "var(--paper-2)", borderColor: "var(--paper-2)",
};

const FOOTER_LINKS = ["Terms of use", "Privacy policy", "About us", "FAQs", "Contact us", "Refund policy"];

/* ----------------------------------------------------------------------- */
/* Hooks                                                                    */
/* ----------------------------------------------------------------------- */

// Breakpoints mirror Bootstrap: mobile < 768, tablet 768–991, desktop ≥ 992
function useViewport() {
  const get = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    return { width: w, isMobile: w < 768, isTablet: w >= 768 && w < 992, isDesktop: w >= 992 };
  };
  const [vp, setVp] = useState(get);
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVp(get()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return vp;
}

const pad = (n) => String(n).padStart(2, "0");

// Counts down to the next July 8 (00:00 local).
function useCountdown() {
  const calc = () => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 6, 8, 0, 0, 0);
    if (target - now < 0) target = new Date(now.getFullYear() + 1, 6, 8, 0, 0, 0);
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    return { days: pad(days), hours: pad(hours), mins: pad(mins), secs: pad(secs) };
  };
  const [cd, setCd] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return cd;
}

/* ----------------------------------------------------------------------- */
/* Data                                                                     */
/* ----------------------------------------------------------------------- */

const BENEFITS = [
  { label: "Productivity", icon: productivityIcon, title: "Show up as your optimal self", body: "Sustain high energy and mental sharpness throughout your day, so you can perform consistently as you progress toward your goals." },
  { label: "Happiness", icon: happinessIcon, title: "A daily happiness booster", body: "Enough sleep leads to brighter days filled with peace and mindfulness. Become the person people love to be around." },
  { label: "Health", icon: healthIcon, title: "Your foundation for good health", body: "Restful nights help you design a disease-free life and enjoy a younger, stronger body." },
];

const GET_LIST = [
  "5 days of experiential learning of time-tested deep-sleep principles.",
  "5 bonus exercises to boost sleep quality and support better health.",
  "Access to a wellness community practicing Traditional Wisdom toward holistic health.",
];

const EXPECT = [
  { num: "01", title: "Better sleep quality", body: "Experience deeper, higher-quality sleep right from the start, thanks to simple, effective, time-efficient breathing techniques." },
  { num: "02", title: "Accelerated healing", body: "Engage in daily healthy activities that promote faster recovery from lifestyle diseases." },
  { num: "03", title: "Stress at its core", body: "Gain awareness and techniques to address stress-causing habits at their root, for a calmer, more productive life." },
];

const INCLUDES = [
  "A variety of breathing techniques and meditations to improve sleep and relax the entire body.",
  "Activities designed to alleviate mental stress and foster a connection with nature.",
  "Guidance on managing stress, adjusting food habits, and rituals conducive to deeper sleep.",
];

const FAQS = [
  { q: "What is the structure of the entire program?", a: "Daily activities lasting 10 to 15 minutes, plus a guided practice session at 10 PM lasting 15 to 20 minutes before bedtime. Individual coaches are available to guide your daily activities." },
  { q: "Can this help me overcome sleep issues I've had for over 10 years?", a: "Absolutely. By implementing all the teachings, you can expect to see improvements in sleep quality from day one." },
  { q: "I can't sleep more than 6 hours due to my work schedule. Is there a solution?", a: "Ideally you'd sleep 7 to 8 hours, but we teach Yoga Nidra and stress-reducing techniques that can compensate for shorter sleep on days when you can't sleep well." },
  { q: "I wake up in the middle of the night and can't fall back asleep. Does this help?", a: "Yes. The program includes a 1-minute breathing technique specifically designed to address this problem." },
  { q: "How does improving sleep help with my physical health issues?", a: "Improving sleep has a profound, long-term impact on health. During deep sleep the body undergoes a healing process that accelerates recovery from physical health issues." },
  { q: "If I can't attend the 10 PM session, will you provide a recording?", a: "Recordings are not available, but individual coaches will guide you. It's best to attend daily for optimal benefits." },
  { q: "If I eat dinner after 9 PM, can I still get good sleep?", a: "Ideally finish dinner by 7 PM. When that isn't possible, we teach exercises, walking routines, and detox drinks that aid digestion — and better digestion contributes to deeper sleep." },
  { q: "Do I need a background in meditation or breathing?", a: "Not at all. Everything is taught from the basics." },
  { q: "How much time do I need to invest every day?", a: "About 15 to 30 minutes daily — 15 minutes fixed at 10 PM, with the remaining time flexible." },
];

const TESTIMONIALS = [
  { tag: "Sleep Apnea", quote: "\"Yesterday I didn't use the CPAP machine even in between, but still continued to sleep. Today afternoon I also slept without the machine. I feel refreshed.\"", name: "Satish, IT Professional, Bangalore" },
  { tag: "Sleep Like a Child", quote: "\"I feel so relaxed and I usually go to bed after meditation. I sleep like a child — no worries, entirely de-stressed.\"", name: "Swathi, Engineer, Bangalore" },
  { tag: "I Can't Believe It", quote: "\"Wow! I can't believe it works so well. It's been a few months since I had a deep sleep. I never thought it would work so well the first time itself.\"", name: "Roopa, IT Manager, Hyderabad" },
  { tag: "Feeling Fresh", quote: "\"I did the meditation last night around 11:30 and slept immediately. After a very long time I had a peaceful sleep and woke up at 5:10 feeling fresh.\"", name: "Rinku, Social Reformer, Bangalore" },
];

/* ----------------------------------------------------------------------- */
/* Small presentational pieces                                              */
/* ----------------------------------------------------------------------- */

function CountdownUnit({ value, label, accent }) {
  return (
    <div className="text-center">
      <div style={{ fontFamily: SERIF, fontSize: "2.5rem", fontWeight: 600, lineHeight: 1, color: accent ? "var(--accent)" : "var(--ink)" }}>
        {value}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>
        {label}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Main component                                                           */
/* ----------------------------------------------------------------------- */

export default function SleepChallenge() {
  useViewport(); // available if you want breakpoint-driven behaviour

  const cd = useCountdown();
  const [selected, setSelected] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const scrollToRegister = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById("register");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="wa-page wa-theme--sleep">

      {/* ============ NAV ============ */}
      <nav className="tt-nav">
        <div className="tt-container d-flex align-items-center" style={{ gap: "1.5rem" }}>
          <a href="/" className="tt-brand" style={{ gap: ".7rem" }}>
            <img src={logoImg} alt="Wellness Atlas" className="tt-brand-logo" />
            {/*<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: "var(--ink)" }}>Wellness Atlas</span>*/}
          </a>
          <div className="d-none d-lg-flex align-items-center ms-auto" style={{ gap: "1.75rem" }}>
            <a href="#how" className="tt-nav-link">How it works</a>
            <a href="#faq" className="tt-nav-link">FAQ</a>
            <a href="#stories" className="tt-nav-link">Stories</a>
          </div>
          <button type="button" className="ms-auto ms-lg-0" style={btnSolid} onClick={() => navigate("/login")}>LOGIN</button>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section style={sectionPad}>
        <div style={container}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p style={{ ...eyebrow, marginBottom: 18 }}>De-Stress &amp; Heal</p>
              <h1 style={{ ...h1Style, marginBottom: 22 }}>Discover Deep Sleep Secrets in 5 Days</h1>
              <p style={{ ...subStyle, marginBottom: 26 }}>Sleep like a baby, once again.</p>

              <div className="d-flex flex-wrap align-items-center mb-4" style={{ gap: "1rem" }}>
                <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: "var(--ink-3)" }}>5 Days · 30 min a day</span>
                <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.04em" }}>JULY 8 – 12</span>
              </div>

              <div
                className="d-inline-flex mb-4"
                style={{ gap: "1.75rem", padding: "1.25rem 2rem", background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)" }}
              >
                <CountdownUnit value={cd.days} label="Days" />
                <CountdownUnit value={cd.hours} label="Hrs" />
                <CountdownUnit value={cd.mins} label="Min" />
                <CountdownUnit value={cd.secs} label="Sec" accent />
              </div>

              <div className="d-flex flex-wrap align-items-center" style={{ gap: "1.25rem" }}>
                <button type="button" style={btnSolid} onClick={scrollToRegister}>REGISTER NOW</button>
                <button type="button" style={{ fontFamily: SANS, fontSize: 15, color: "var(--accent)", background: "none", border: "none", padding: 0, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }} onClick={scrollToRegister}>
                  Click here to save your seat →
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div style={{ position: "relative", aspectRatio: "1 / 1", background: "var(--forest-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={heroSleep} alt="A figure sleeping peacefully under a crescent moon and stars" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REASON CARDS ============ */}
      <section style={{ ...sectionPad, background: "var(--forest)" }}>
        <div style={container}>
          <div className="text-center mb-5" style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ ...tagStyle, color: "var(--accent)", marginBottom: 10 }}>A magic potion</p>
            <h2 style={{ ...h2Style, color: "var(--paper-2)" }}>Sleep can transform many areas of your life.</h2>
            <p style={{ ...subStyle, color: "var(--paper-2)", opacity: 0.82, marginTop: 12 }}>Which one would you like to improve?</p>
          </div>

          <div className="row g-4 g-lg-5">
            {BENEFITS.map((b, i) => (
              <div className="col-md-4" key={b.label}>
                <div
                  className="h-100 d-flex flex-column"
                  onClick={() => setSelected(i)}
                  style={{
                    cursor: "pointer",
                    background: "var(--paper-2)",
                    borderRadius: "var(--card-radius, 16px)",
                    padding: "40px 28px 30px",
                    border: `1px solid var(--line)`,
                    outline: selected === i ? "3px solid var(--accent)" : "3px solid transparent",
                    outlineOffset: -1,
                    transition: "outline-color .15s ease",
                  }}
                >
                  <span style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--paper)", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    <img src={b.icon} alt={b.label} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  </span>
                  <p style={{ ...tagStyle, marginBottom: 8 }}>{b.label}</p>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, lineHeight: 1.25, color: "var(--ink)", margin: "0 0 12px" }}>{b.title}</h3>
                  <p style={{ ...bodyStyle, fontSize: 15, flexGrow: 1 }}>{b.body}</p>
                  <button type="button" className="mt-4 align-self-start" style={btnSolid} onClick={(e) => { e.stopPropagation(); scrollToRegister(e); }}>ENROL NOW</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVERYTHING YOU GET / PRICING ============ */}
      <section style={sectionPad} id="register">
        <div style={container}>
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <p style={{ ...eyebrow, marginBottom: 16 }}>Here's everything you get</p>
              <h2 style={{ ...h2Style, marginBottom: 28 }}>The 5-Day Sleep Wellness Mastery</h2>
              <div style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,44px)", marginBottom: 28 }}>
                {GET_LIST.map((g, i) => (
                  <div className="d-flex" style={{ gap: ".85rem", marginBottom: i === GET_LIST.length - 1 ? 0 : 16 }} key={i}>
                    <span style={{ color: "var(--accent)", fontSize: 18, lineHeight: 1.4, flex: "none" }}>✓</span>
                    <span style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: "var(--paper-2)" }}>{g}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center mb-4" style={{ gap: "1.25rem" }}>
                <span style={{ fontFamily: SANS, fontSize: 19, color: "var(--muted)", textDecoration: "line-through" }}>Normally Rs. 999/-</span>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(26px,2.4vw,32px)", color: "var(--accent)" }}>Today: Rs. 299/-</span>
              </div>
              <button type="button" onClick={scrollToRegister} style={{ ...btnCtaReset, display: "block", width: "100%", maxWidth: 560, background: "var(--accent)", color: "#fff", borderRadius: "var(--btn-radius, 8px)", padding: "20px 24px" }}>
                <span style={{ display: "block", fontFamily: SANS, fontWeight: 700, fontSize: 23, letterSpacing: "-0.01em" }}>Register for the Sleep Wellness Mastery</span>
                <span style={{ display: "block", fontFamily: SANS, fontSize: 15, marginTop: 6, opacity: 0.9 }}>5 days · 30 minutes a day · just Rs. 299</span>
              </button>
            </div>
            <div className="col-lg-5">
              <div style={{ position: "relative", aspectRatio: "3 / 4", background: "var(--forest-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={meditationImg} alt="A person seated in calm breathing meditation among plants" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT TO EXPECT / LESSONS ============ */}
      <section style={{ ...sectionPad, background: "var(--paper-2)" }} id="how">
        <div style={container}>
          <div className="text-center mb-5">
            <p style={{ ...eyebrow, marginBottom: 10 }}>What can I expect?</p>
            <h2 style={h2Style}>The Sleep Wellness Mastery, step by step</h2>
          </div>

          <div className="row g-4">
            {EXPECT.map((e) => (
              <div className="col-md-4" key={e.num}>
                <div className="h-100" style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ background: "var(--paper)", padding: "24px clamp(22px,3vw,32px)" }}>
                    <p style={{ ...tagStyle, marginBottom: 6 }}>STEP {e.num}</p>
                    <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 26, letterSpacing: "-0.01em", color: "var(--ink)", margin: 0 }}>{e.title}</h3>
                  </div>
                  <div style={{ padding: "clamp(22px,3vw,32px)", flexGrow: 1 }}>
                    <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.65, color: "var(--paper-2)", opacity: 0.9, margin: 0 }}>{e.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button type="button" style={btnSolid} onClick={scrollToRegister}>I'M READY — ENROL ME NOW</button>
          </div>
        </div>
      </section>

      {/* ============ PROGRAM INCLUDES PANEL ============ */}
      <section style={sectionPad}>
        <div style={container}>
          <div style={{ border: "2px dashed var(--forest)", background: "var(--paper-2)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,48px)" }}>
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p style={{ ...tagStyle, textTransform: "none", letterSpacing: "0.02em", fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: "var(--ink)", marginBottom: 8 }}>A unique 5-day experience</p>
                <h3 style={{ ...h2Style, marginBottom: 26 }}>What does the program include?</h3>
                <div>
                  {INCLUDES.map((i, idx) => (
                    <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.6, color: "var(--ink-3)", margin: idx === INCLUDES.length - 1 ? 0 : "0 0 14px" }} key={idx}>• {i}</p>
                  ))}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="text-center" style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,40px) 28px" }}>
                  <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.4, color: "var(--paper-2)", margin: "0 0 20px" }}>This is exciting — join the July cohort today.</p>
                  <button type="button" style={btnOutlineOnDark} onClick={scrollToRegister}>REGISTER NOW FOR INR 299</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ ...sectionPad, background: "var(--paper-2)" }} id="faq">
        <div style={{ ...container, maxWidth: 860 }}>
          <div className="text-center mb-5">
            <p style={{ ...eyebrow, marginBottom: 10 }}>Frequently asked questions</p>
            <h2 style={h2Style}>Everything you might be wondering</h2>
          </div>

          <div className="d-flex flex-column" style={{ gap: ".75rem" }}>
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", overflow: "hidden" }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-100 d-flex align-items-center text-start"
                    style={{ gap: "1rem", background: "none", border: 0, cursor: "pointer", padding: "1.15rem 1.5rem" }}
                  >
                    <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 19, lineHeight: 1.3, color: "var(--ink)", flexGrow: 1, margin: 0 }}>{f.q}</h3>
                    <span style={{ fontSize: "1.5rem", lineHeight: 1, color: "var(--accent)", flex: "none" }}>{open ? "−" : "+"}</span>
                  </button>
                  {open && <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink-3)", padding: "0 1.5rem 1.25rem", margin: 0 }}>{f.a}</p>}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-5">
            <button type="button" style={btnSolid} onClick={scrollToRegister}>LET'S START — REGISTER ME NOW</button>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section style={sectionPad} id="stories">
        <div style={container}>
          <div className="text-center mb-5">
            <p style={{ ...eyebrow, marginBottom: 10 }}>Testimonials</p>
            <h2 style={{ ...h2Style, marginBottom: 14 }}>Stories from previous participants</h2>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: ".5rem" }}>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: "var(--accent)" }}>4.8</span>
              <span style={{ fontFamily: SANS, fontSize: 15, color: "var(--ink-3)" }}>★★★★★ · 102 reviews</span>
            </div>
          </div>

          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <figure className="h-100 m-0 d-flex flex-column" style={{ background: "var(--forest)", borderRadius: "var(--card-radius, 16px)", padding: 30 }}>
                  <p style={{ ...tagStyle, marginBottom: 14 }}>{t.tag}</p>
                  <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.65, color: "var(--paper-2)", flexGrow: 1, margin: 0 }}>{t.quote}</p>
                  <cite style={{ fontFamily: SANS, fontWeight: 600, fontStyle: "normal", fontSize: 14, color: "var(--accent)", marginTop: 18 }}>{t.name}</cite>
                </figure>
              </div>
            ))}
          </div>

          {/*<div className="mt-5" style={{ background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: "var(--card-radius, 16px)", padding: "clamp(28px,4vw,46px)" }}>
            <p style={{ ...tagStyle, marginBottom: 14 }}>Sleep Challenge Success · 7.5 hours and counting</p>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px,2.2vw,27px)", lineHeight: 1.5, color: "var(--ink)", margin: "0 0 22px", textWrap: "pretty" }}>
              "Previously I struggled with chronic insomnia, often getting only 2–3 hours of sleep. After the first session I learned to avoid coffee and gadgets — even switching off the router — and started getting 5–6 hours. The breathing exercises and 'gibberish talk' added another 1.5 hours. Now I consistently get around 7.5 hours and wake up fresh and energetic."
            </p>
            <cite style={{ fontFamily: SANS, fontWeight: 700, fontStyle: "normal", fontSize: 16, color: "var(--accent)" }}>— Siddesh S H</cite>
          </div>*/}

          <div
            className="powr-product-reviews mt-5"
            id="ef0558b6_1670382326"
            data-product-id="chlg-sleep"
          />
        </div>
      </section >



      {/* ============ FOOTER ============ */}
      < footer style={{ borderTop: "1px solid var(--line)", marginTop: 16 }
      }>
        <div className="text-center" style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(36px,5vw,56px) clamp(22px,5vw,40px)" }}>
          <div className="d-flex flex-wrap justify-content-center gap-4 mb-3" style={{ fontFamily: SANS, fontSize: 14 }}>
            {FOOTER_LINKS.map((l) => <span key={l} style={{ color: "var(--accent)", cursor: "pointer" }}>{l}</span>)}
          </div>
          <p style={{ fontFamily: SANS, fontSize: 13, color: "var(--muted)", margin: 0 }}>© Copyright 2024 Wellness Atlas</p>
        </div>
      </footer >

    </div >
  );
}
