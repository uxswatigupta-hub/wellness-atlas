/* =========================================================================
   Login — Wellness Atlas CMS sign-in
   Split layout: branded wellness panel (left) + sign-in form (right).
   Gates the app; on success sets localStorage "wa-authed" and calls onLogin().
   The challenge landing page's "Log in" button routes here (#login).
   Path: src/pages/WellnessAtlasCms/Pages/Login/Login.jsx
   ========================================================================= */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// Drop a real photo here (URL or imported asset) and it fills the brand panel.
// Leave "" to show the themed placeholder. Suggested: calm overhead of whole
// foods / fresh produce on linen, hands prepping vegetables, herbal tea + greenery.
const HERO_IMAGE = "";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !pw) { setErr("Enter your email and password to continue."); return; }
    setErr(""); setBusy(true);
    // demo auth — swap for your API call
    setTimeout(() => {
      try {
        localStorage.setItem("wa-authed", "1");
      } catch (e2) { }

      setBusy(false);
      navigate("/cms");
    }, 550);
  };

  return (
    <div className="wa-page">
      <div className="wa-login2">

        {/* ---- brand / imagery panel ---- */}
        <aside className="wa-login2__brand">
          <div className="wa-login2__photo" style={HERO_IMAGE ? { backgroundImage: "linear-gradient(180deg, rgba(46,64,50,0.35) 0%, rgba(46,64,50,0.82) 78%, rgba(46,64,50,0.92) 100%), url(" + HERO_IMAGE + ")", backgroundSize: "cover", backgroundPosition: "center" } : null}>
            {!HERO_IMAGE && <span className="wa-login2__photo-label">ADD WELLNESS PHOTO</span>}
          </div>
          <div className="wa-login2__brandwrap">
            <div className="wa-login2__logo"><span className="wa-login2__logo-mark">WA</span>Wellness Atlas</div>
            <h1 className="wa-login2__tagline">Guiding every client toward their healthiest self.</h1>
            <p className="wa-login2__sub">Your coaching workspace — client journeys, systems reports, weekly followups and delight, all in one place.</p>
            <ul className="wa-login2__points">
              <li><i className="bi bi-clipboard2-pulse"></i>Systems assessments &amp; reports</li>
              <li><i className="bi bi-calendar-heart"></i>Weekly followups &amp; feedback</li>
              <li><i className="bi bi-gift"></i>Engagement &amp; client delight tracking</li>
            </ul>
          </div>
        </aside>

        {/* ---- sign-in form ---- */}
        <main className="wa-login2__panel">
          <div className="wa-login2__form">
            <div className="wa-login2__logo wa-login2__logo--sm"><span className="wa-login2__logo-mark">WA</span>Wellness Atlas</div>
            <p className="wa-login2__eyebrow">Coach Portal</p>
            <h2 className="wa-login2__h">Welcome back</h2>
            <p className="wa-login2__lede">Sign in to continue to your dashboard.</p>

            {err && <div className="wa-login2__err"><i className="bi bi-exclamation-circle"></i>{err}</div>}

            <form onSubmit={submit} noValidate>
              <label className="wa-login2__label" htmlFor="wa-email">Email address</label>
              <div className="wa-login2__field">
                <i className="bi bi-envelope"></i>
                <input id="wa-email" type="email" autoComplete="username" placeholder="you@wellnessatlas.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="wa-login2__labelrow">
                <label className="wa-login2__label" htmlFor="wa-pw">Password</label>
                <a className="wa-login2__link" href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
              <div className="wa-login2__field">
                <i className="bi bi-lock"></i>
                <input id="wa-pw" type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••"
                  value={pw} onChange={(e) => setPw(e.target.value)} />
                <button type="button" className="wa-login2__eye" onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}>
                  <i className={"bi " + (show ? "bi-eye-slash" : "bi-eye")}></i>
                </button>
              </div>

              <label className="wa-login2__remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Keep me signed in</span>
              </label>

              <button type="submit" className="wa-btn wa-btn--solid wa-login2__submit" disabled={busy}>
                {busy ? "Signing in…" : "Log in"}
              </button>
            </form>

            <p className="wa-login2__foot">New to Wellness Atlas? <a className="wa-login2__link" href="#" onClick={(e) => e.preventDefault()}>Talk to your coach</a> to get started.</p>
          </div>
          <p className="wa-login2__legal">© 2026 Wellness Atlas · <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a> · <a href="#" onClick={(e) => e.preventDefault()}>Terms</a></p>
        </main>

      </div>
    </div>
  );
}
