/* =========================================================================
   FoodAnalysis — coach fills after reviewing 2 days of food-plate photos.
   8 questions on 3–4 level scales. Interactive (autosave) when readOnly=false
   (coach), read-only display otherwise (client's profile shares the data).
   Persists to localStorage: wa-food-analysis-swati
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/FoodAnalysis.jsx
   ========================================================================= */
import React, { useState, useRef } from "react";

const KEY = "wa-food-analysis-swati";

export const QUESTIONS = [
  { id: "junk",     q: "Did food include junk food? (e.g. pizza, burger)",              opts: ["No", "Low", "Moderate", "High"], polarity: "bad" },
  { id: "dead",     q: "Did food include dead food? (e.g. biscuits)",                    opts: ["No", "Low", "Moderate", "High"], polarity: "bad" },
  { id: "sweet",    q: "Did food include a sweet / chocolate / ice cream / bakery item?", opts: ["No", "Low", "Moderate", "High"], polarity: "bad" },
  { id: "protein",  q: "Protein in food",                                                opts: ["No", "Low", "Moderate", "Good"], polarity: "good" },
  { id: "fiber",    q: "Fiber in food",                                                  opts: ["No", "Low", "Moderate", "Good"], polarity: "good" },
  { id: "vitamins", q: "Vitamins / Minerals in food (fruits / vegetables)",              opts: ["No", "Low", "Moderate", "Good"], polarity: "good" },
  { id: "goodfat",  q: "Good fat in food (nuts, seeds, coconut / olive oils)",           opts: ["No", "Low", "Moderate", "Good"], polarity: "good" },
  { id: "combos",   q: "Wrong combinations / habits (e.g. food+fruits, fish+curd, food+alcohol, meal+tea/coffee)", opts: ["No", "Rarely", "Frequently"], polarity: "bad" },
];

export const DEFAULT = { junk: "High", dead: "Moderate", sweet: "No", protein: "No", fiber: "Good", vitamins: "No", goodfat: "No", combos: "No" };
export const FOOD_KEY = KEY;

function loadFA() {
  try { const s = localStorage.getItem(KEY); if (s) return Object.assign({}, DEFAULT, JSON.parse(s)); } catch (e) {}
  return Object.assign({}, DEFAULT);
}

function levelColor(polarity, i, n) {
  const frac = n > 1 ? i / (n - 1) : 0;
  const bad = polarity === "bad" ? frac : 1 - frac;
  if (bad < 0.25) return { bg: "#2f7d3a" };
  if (bad < 0.6)  return { bg: "#b8901f" };
  if (bad < 0.85) return { bg: "#c06a24" };
  return { bg: "#c34b4b" };
}

function Scale({ q, value, readOnly, onPick }) {
  return (
    <div className={"wa-scale" + (readOnly ? " wa-scale--ro" : "")}>
      {q.opts.map((o, i) => {
        const on = value === o;
        const c = levelColor(q.polarity, i, q.opts.length);
        const style = on ? { background: c.bg, borderColor: c.bg, color: "#fff" } : null;
        return (
          <button key={o} type="button" className={"wa-scale__b" + (on ? " is-on" : "")}
            style={style} disabled={readOnly && !on}
            onClick={readOnly ? undefined : () => onPick(o)}>{o}</button>
        );
      })}
    </div>
  );
}

export default function FoodAnalysis({ readOnly, embedded }) {
  const [ans, setAns] = useState(loadFA);
  const [savedId, setSavedId] = useState(null);
  const timer = useRef(null);
  const pick = (id, val) => {
    setAns((prev) => { const n = Object.assign({}, prev, { [id]: val }); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch (e) {} return n; });
    setSavedId(id); clearTimeout(timer.current); timer.current = setTimeout(() => setSavedId(null), 1400);
  };

  const rows = (
    <div className="wa-faq">
      {QUESTIONS.map((q, i) => (
        <div className="wa-faq__row" key={q.id}>
          <p className="wa-faq__q"><span className="wa-faq__n">{i + 1}</span>{q.q}
            {savedId === q.id && <span className="wa-saved wa-saved--sm"><i className="bi bi-check-lg"></i>Saved</span>}</p>
          <Scale q={q} value={ans[q.id]} readOnly={readOnly} onPick={(v) => pick(q.id, v)} />
        </div>
      ))}
    </div>
  );

  if (embedded) return rows;

  return (
    <div className="wa-pcard">
      <div className="wa-pgroup__h wa-pgroup__h--action">
        <span><i className="bi bi-clipboard2-check"></i>Food Plate Analysis</span>
        {!readOnly && <span className="wa-faq__hint">Reviewed from 2 days of food-plate photos · tap a level to record</span>}
      </div>
      <div style={{ marginTop: 16 }}>{rows}</div>
    </div>
  );
}
