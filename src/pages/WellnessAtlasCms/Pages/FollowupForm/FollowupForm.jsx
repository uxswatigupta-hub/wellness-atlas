/* =========================================================================
   FollowupForm — client-facing weekly follow-up (opens from the shared link)
   Path: src/pages/WellnessAtlasCms/Pages/FollowupForm/FollowupForm.jsx
   On submit it persists via saveSubmittedFollowup(); the coach's tracking
   view picks it up with a date stamp. Render this on a public route, e.g.
       <Route path="/f/:token" element={<FollowupForm />} />
   ========================================================================= */
import React, { useState } from "react";
import { client, saveSubmittedFollowup, loadSubmittedFollowups } from "../../Components/data";

const HEALTH_Q = [
  "Allergy / sensitivity to foods", "Bloating", "Brain fog (confusion / forgetfulness)",
  "Gastric reflux", "Pain in hands / wrists / ankles / feet", "Sinus problem",
  "Freshness & alertness on waking", "Tingling in hands / feet", "Lack of ambition / low energy",
  "Mood swings / anxiety / depression", "Poor concentration", "Sleep quality",
  "Tiredness & fatigue", "Cravings", "Sleepiness post meals",
];
const SCALE = ["None", "1", "2", "3", "4", "5", "6", "7"];
const CHANGE = [["worse", "Worse"], ["same", "Same"], ["better", "Better"], ["resolved", "Resolved"]];
const MEAS = ["Arm", "Chest", "Hips", "Neck", "Thigh", "Waist"];
const RATINGS = [
  [5, "My coach is a lighthouse. I always feel guided"],
  [4, "Doing well. I feel supported"],
  [3, "All good. My needs are being met"],
  [2, "Meh. I was hoping for a bit more"],
  [1, "Oof. I'm rethinking this investment"],
];
const Mark = () => (
  <div className="wa-logo__mark" style={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--forest-2)", color: "rgba(255,255,255,0.8)", fontFamily: "'IBM Plex Mono', monospace" }}>WA</div>
);

export default function FollowupForm() {
  const clientName = (client && client.name) || "there";
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [g, setG] = useState({ exercise: null, deviations: "", lowSleep: null, missedSupp: null, lowWater: null });
  const [weight, setWeight] = useState("");
  const [meas, setMeas] = useState({});
  const [health, setHealth] = useState({});
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  const setGen = (k, v) => setG((s) => ({ ...s, [k]: v }));
  const setM = (k, v) => setMeas((s) => ({ ...s, [k]: v }));
  const setH = (k, v) => setHealth((s) => ({ ...s, [k]: v }));

  const scaleQs = [
    ["exercise", "How many days did you exercise last week?"],
    ["lowSleep", "How many days did you sleep under 6 hours?"],
    ["missedSupp", "How many days did you miss your supplements?"],
    ["lowWater", "How many days did you drink less water than agreed?"],
  ];

  const submit = () => {
    if (!weight) { setErr("Please enter your current weight before submitting."); return; }
    if (!rating) { setErr("Please rate your coach before submitting."); return; }
    setErr("");
    const now = new Date();
    const num = 2 + loadSubmittedFollowups().length + 1;
    const stamp = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    saveSubmittedFollowup({
      num, submitted: true, submittedAt: now.toISOString(), stamp, date: stamp,
      since: "Submitted by client", rating, feedback: feedback.trim() || "(No additional comments)",
      general: {
        exercise: g.exercise ?? 0, deviations: g.deviations === "" ? 0 : Number(g.deviations),
        lowSleep: g.lowSleep ?? 0, missedSupp: g.missedSupp ?? 0, lowWater: g.lowWater ?? 0,
      },
      measurements: Object.assign({ Weight: [weight, "kg"] },
        MEAS.reduce((o, k) => { if (meas[k]) o[k] = [meas[k], "cm"]; return o; }, {})),
      health, improved: [], resolved: [],
    });
    setDone(true);
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <div className="wa-page">
        <div className="wa-form-wrap">
          <div className="wa-form-bar"><Mark /><h1>Weekly Follow-up</h1></div>
          <div className="wa-thanks">
            <div className="wa-thanks__icon"><i className="bi bi-check-lg"></i></div>
            <h2>Thank you, {clientName.split(" ")[0]}!</h2>
            <p>Your weekly follow-up has been submitted. Your coach can now see your update and will reach out with the next steps. Keep up the great work!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wa-page">
      <div className="wa-form-wrap">
        <div className="wa-form-bar"><Mark /><h1>Weekly Follow-up</h1></div>
        <div className="wa-form">
          <div className="wa-form__chip"><i className="bi bi-clipboard2-pulse"></i>True North · Wellness Atlas</div>
          <div className="wa-form__hero">
            <h2>Hi {clientName.split(" ")[0]}, how was your week?</h2>
            <p>This quick check-in helps your coach support you better. It takes about 3 minutes — there are no wrong answers.</p>
          </div>

          <div className="wa-fcard">
            <p className="wa-fcard__h">General assessment</p>
            {scaleQs.map(([k, label]) => (
              <div className="wa-q" key={k}>
                <label className="wa-q__label">{label}</label>
                <div className="wa-scale">
                  {SCALE.map((s, i) => (
                    <button key={s} className={g[k] === i ? "on" : ""} onClick={() => setGen(k, i)}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
            <div className="wa-q">
              <label className="wa-q__label">How many meals did you deviate from your plan last week?</label>
              <input className="wa-in wa-in--num" type="number" min="0" value={g.deviations}
                onChange={(e) => setGen("deviations", e.target.value)} placeholder="0" />
            </div>
          </div>

          <div className="wa-fcard">
            <p className="wa-fcard__h">Measurements</p>
            <div className="wa-q">
              <label className="wa-q__label">Current weight (kg) <span className="opt">· required</span></label>
              <input className="wa-in wa-in--num" type="number" step="0.1" value={weight}
                onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 83.6" />
            </div>
            <label className="wa-q__label">Body measurements (cm) <span className="opt">· optional</span></label>
            <div className="wa-meas-grid">
              {MEAS.map((m) => (
                <div className="wa-q" key={m}>
                  <label className="wa-q__label" style={{ fontWeight: 400, fontSize: 13 }}>{m}</label>
                  <input className="wa-in" type="number" step="0.1" value={meas[m] || ""}
                    onChange={(e) => setM(m, e.target.value)} placeholder="–" />
                </div>
              ))}
            </div>
          </div>

          <div className="wa-fcard">
            <p className="wa-fcard__h">How are these now, compared to before?</p>
            {HEALTH_Q.map((q) => (
              <div className="wa-hq" key={q}>
                <div className="wa-hq__nm">{q}</div>
                <div className="wa-seg4">
                  {CHANGE.map(([val, label]) => (
                    <button key={val} className={health[q] === val ? "on-" + val : ""} onClick={() => setH(q, val)}>{label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="wa-fcard">
            <p className="wa-fcard__h">Your coach</p>
            <div className="wa-q">
              <label className="wa-q__label">How would you rate your coach since your last interaction?</label>
              <div className="wa-rate">
                {RATINGS.map(([n, label]) => (
                  <button key={n} className={rating === n ? "on" : ""} onClick={() => setRating(n)}>
                    <span className="num">{n}</span>{label}
                  </button>
                ))}
              </div>
            </div>
            <div className="wa-q">
              <label className="wa-q__label">Would you like to explain a little more? <span className="opt">· optional</span></label>
              <textarea className="wa-in" value={feedback} onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share anything that helped, or anything you'd like more of…"></textarea>
            </div>
          </div>

          <div className="wa-form__submit">
            <a className="wa-btn wa-btn--solid" onClick={submit}>SUBMIT MY FOLLOW-UP</a>
            {err && <div className="wa-form__err">{err}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
