/* =========================================================================
   HabitsRoutine — record tab. Option 3: inline field-level editing.
   Click any value to edit; saves on blur (Enter commits, Esc reverts) with a
   "Saved" flash. Persists to localStorage.
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/HabitsRoutine.jsx
   ========================================================================= */
import React, { useState, useRef, useEffect } from "react";
import FoodAnalysis, { QUESTIONS as FA_QUESTIONS, DEFAULT as FA_DEFAULT, FOOD_KEY } from "./FoodAnalysis";

function toneOf(row) {
  if (row.bad != null && row.v === row.bad) return "flag";
  if (row.good != null && row.v === row.good) return "ok";
  return null;
}
function inlineCls(tone) {
  return "wa-inline" + (tone === "flag" ? " wa-inline--flag" : tone === "ok" ? " wa-inline--ok" : "");
}

function InlineText({ value, tone, onCommit }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  const ref = useRef(null);
  useEffect(() => { if (editing && ref.current) { ref.current.focus(); ref.current.select(); } }, [editing]);
  const commit = () => { setEditing(false); if (temp !== value) onCommit(temp); };
  const cancel = () => { setTemp(value); setEditing(false); };
  if (editing) {
    return (
      <input ref={ref} className="wa-inline-input" value={temp}
        onChange={(e) => setTemp(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } if (e.key === "Escape") cancel(); }} />
    );
  }
  return (
    <button type="button" className={inlineCls(tone)} onClick={() => { setTemp(value); setEditing(true); }}>
      <span>{value}</span><i className="bi bi-pencil wa-inline__pen"></i>
    </button>
  );
}

function InlineYesNo({ value, tone, onCommit }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <div className="wa-yn">
        {["Yes", "No"].map((o) => (
          <button key={o} type="button" className={"wa-yn__btn" + (value === o ? " is-on" : "")}
            onClick={() => { setEditing(false); if (o !== value) onCommit(o); }}>{o}</button>
        ))}
        <button type="button" className="wa-yn__x" onClick={() => setEditing(false)} aria-label="Cancel"><i className="bi bi-x-lg"></i></button>
      </div>
    );
  }
  return (
    <button type="button" className={inlineCls(tone)} onClick={() => setEditing(true)}>
      <span>{value}</span><i className="bi bi-pencil wa-inline__pen"></i>
    </button>
  );
}

function DLItem({ row, onCommit, saved }) {
  const tone = toneOf(row);
  const isYesNo = row.bad != null || row.good != null;
  return (
    <div>
      <div className="wa-dl__k">{row.k}</div>
      <div className="wa-dl__vwrap">
        {isYesNo
          ? <InlineYesNo value={row.v} tone={tone} onCommit={onCommit} />
          : <InlineText value={row.v} tone={tone} onCommit={onCommit} />}
        {saved && <span className="wa-saved"><i className="bi bi-check-lg"></i>Saved</span>}
      </div>
    </div>
  );
}

function RecordSection({ icon, name, sub, isOpen, onToggle, children }) {
  return (
    <div className={"wa-acc__item" + (isOpen ? " wa-acc__item--open" : "")}>
      <button className="wa-acc__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="wa-acc__icon"><i className={"bi " + icon}></i></span>
        <span className="wa-acc__namecol">
          <span className="wa-acc__nm">{name}</span>
          {sub && <span className="wa-sev-chip" style={{ color: "var(--muted)" }}>{sub}</span>}
        </span>
        <span className="wa-acc__chev"><i className={"bi " + (isOpen ? "bi-chevron-up" : "bi-chevron-down")}></i></span>
      </button>
      {isOpen && <div className="wa-acc__body">{children}</div>}
    </div>
  );
}

function RecordHead({ title, subtitle }) {
  return (
    <div className="wa-rechead">
      <div className="wa-rechead__lead">
        <h3 className="wa-rechead__t">{title}</h3>
        <p className="wa-rechead__sub">{subtitle}</p>
      </div>
      <div className="wa-rechead__hint"><i className="bi bi-pencil-square"></i>Click any value to edit</div>
    </div>
  );
}

function loadStore(key, def) {
  try { const s = localStorage.getItem(key); if (s) return JSON.parse(s); } catch (e) {}
  return JSON.parse(JSON.stringify(def));
}

const HABITS_DEFAULT = {
  daily: [
    { k: "Breakfast time", v: "I skip it" }, { k: "Lunch time", v: "01 pm" }, { k: "Evening snacks time", v: "I don't have it" },
    { k: "Dinner time", v: "08 pm" }, { k: "Average sleep duration", v: "6 hrs" }, { k: "Screen time 1 hr before bed", v: "Yes" },
    { k: "Water intake per day (in liters)", v: "5" }, { k: "Exercise Frequency", v: "3–4 times a week" }, { k: "Smoking / Alcohol consumption", v: "Yes" },
  ],
  household: [
    { k: "Members in your household", v: "6" }, { k: "Dietary preferences", v: "Vegetarian" }, { k: "Specific food restrictions / allergies", v: "Allergic to brinjal" },
    { k: "Habitual Consumption", v: "Tea / Coffee" }, { k: "Which vessels are used for cooking?", v: "Stainless Steel" }, { k: "Do you use a pressure cooker?", v: "Yes" },
    { k: "Monthly oil consumption (ltrs)", v: "2" },
  ],
  stress: [
    { k: "Do thoughts about work / office / business cause worry to you all the time?", v: "Yes", bad: "Yes" },
    { k: "Is financial security a source of worry for you a lot of times?", v: "Yes", bad: "Yes" },
    { k: "Do relationships / family dynamics cause you stress?", v: "Yes", bad: "Yes" },
    { k: "Do you worry about your or your family's health all the time?", v: "Yes", bad: "Yes" },
    { k: "Does thinking about the future cause you stress a lot of times?", v: "Yes", bad: "Yes" },
    { k: "Are you driving / travelling for >1 hour daily to work or business?", v: "Yes", bad: "Yes" },
  ],
};

export default function HabitsRoutine() {
  const [data, setData] = useState(() => loadStore("wa-habits-swati", HABITS_DEFAULT));
  const [savedId, setSavedId] = useState(null);
  const timer = useRef(null);
  const [open, setOpen] = useState(new Set(["daily", "household", "stress", "plate"]));
  const toggle = (id) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const flagged = (rows) => rows.filter((r) => toneOf(r) === "flag").length;
  const faFlagged = () => {
    try { const fa = Object.assign({}, FA_DEFAULT, JSON.parse(localStorage.getItem(FOOD_KEY) || "{}"));
      return FA_QUESTIONS.filter((q) => { const v = fa[q.id]; const bad = q.polarity === "bad" ? ["Moderate", "High", "Frequently"] : ["No", "Low"]; return bad.indexOf(v) >= 0; }).length;
    } catch (e) { return 0; }
  };

  const commit = (section, i, val) => {
    setData((d) => {
      const n = JSON.parse(JSON.stringify(d));
      n[section][i].v = val;
      try { localStorage.setItem("wa-habits-swati", JSON.stringify(n)); } catch (e) {}
      return n;
    });
    setSavedId(section + "-" + i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSavedId(null), 1600);
  };

  const section = (key, icon, name) => (
    <RecordSection icon={icon} name={name}
      sub={flagged(data[key]) > 0 ? flagged(data[key]) + " flagged" : null}
      isOpen={open.has(key)} onToggle={() => toggle(key)}>
      <div className="wa-dl">
        {data[key].map((r, i) => <DLItem key={r.k} row={r}
          onCommit={(val) => commit(key, i, val)} saved={savedId === key + "-" + i} />)}
      </div>
    </RecordSection>
  );

  return (
    <div role="tabpanel" id="panel-habits" aria-labelledby="tab-habits" tabIndex={0}>
      <RecordHead title="Lifestyle audit"
        subtitle="Daily routine, household context, stress and food-plate answers from intake. Responses needing attention are flagged in red — click any one to correct it, changes save automatically." />

      <div className="wa-acc">
        {section("daily", "bi-clock-history", "Daily Routine & Eating Habits")}
        {section("household", "bi-house-heart", "Household & Food Preferences")}
        {section("stress", "bi-activity", "Stress Audit")}
        <RecordSection icon="bi-clipboard2-check" name="Food Plate Analysis"
          sub={faFlagged() > 0 ? faFlagged() + " need attention" : null}
          isOpen={open.has("plate")} onToggle={() => toggle("plate")}>
          <p className="wa-faq__lead">Filled by the coach after reviewing 2 days of food-plate photos shared by the client. Tap a level to record — changes save automatically.</p>
          <FoodAnalysis embedded={true} readOnly={false} />
        </RecordSection>
      </div>
    </div>
  );
}
