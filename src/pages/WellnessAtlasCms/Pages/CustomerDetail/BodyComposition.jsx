/* =========================================================================
   BodyComposition — record tab. Option 3: inline field-level editing.
   Click any value to edit; saves on blur (Enter commits, Esc reverts) with a
   "Saved" flash. Persists to localStorage.
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/BodyComposition.jsx
   ========================================================================= */
import React, { useState, useRef, useEffect } from "react";

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
      <div className="wa-dl__k">{row.k}{row.info && <span className="wa-iq" title={row.info}>i</span>}</div>
      <div className="wa-dl__vwrap">
        {isYesNo
          ? <InlineYesNo value={row.v} tone={tone} onCommit={onCommit} />
          : <InlineText value={row.v} tone={tone} onCommit={onCommit} />}
        {saved && <span className="wa-saved"><i className="bi bi-check-lg"></i>Saved</span>}
      </div>
    </div>
  );
}

function RecordSection({ icon, name, sub, count, isOpen, onToggle, children }) {
  return (
    <div className={"wa-acc__item" + (isOpen ? " wa-acc__item--open" : "")}>
      <button className="wa-acc__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="wa-acc__icon"><i className={"bi " + icon}></i></span>
        <span className="wa-acc__namecol">
          <span className="wa-acc__nm">{name}</span>
          {sub && <span className="wa-sev-chip" style={{ color: "var(--muted)" }}>{sub}</span>}
        </span>
        {count != null && <span className="wa-acc__count">{count}</span>}
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

const BODY_DEFAULT = {
  measures: [
    { k: "Height (cms)", v: "160" }, { k: "Weight (kgs)", v: "62" },
    { k: "BMI", v: "24.2", info: "Body Mass Index = weight / height²" },
    { k: "Arm (cms)", v: "35" }, { k: "Waist (cms)", v: "88" }, { k: "Chest (cms)", v: "93" },
    { k: "Thigh (cms)", v: "103" }, { k: "Hips (cms)", v: "64" }, { k: "Neck (cms)", v: "38" },
    { k: "Waist to Hip Ratio", v: "1.37", info: "Waist circumference ÷ hip circumference" },
  ],
  background: [
    { k: "Family History", v: "Asthma" },
    { k: "Existing Health Concerns", v: "Digestive, Fatty Liver, Hairfall" },
    { k: "Medication Details", v: "Rantac" },
    { k: "Unintentional weight change over 10% in 5 years?", v: "Yes", bad: "Yes" },
    { k: "Do you take more than 2 medicines regularly?", v: "No", bad: "Yes" },
    { k: "Has your health worsened in 2 years?", v: "Yes", bad: "Yes" },
  ],
  docs: ["Blood Test Report 1"],
};

export default function BodyComposition() {
  const [data, setData] = useState(() => loadStore("wa-body-swati", BODY_DEFAULT));
  const [savedId, setSavedId] = useState(null);
  const timer = useRef(null);
  const [open, setOpen] = useState(new Set(["measures", "background"]));
  const toggle = (id) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const commit = (section, i, val) => {
    setData((d) => {
      const n = JSON.parse(JSON.stringify(d));
      if (section === "docs") n.docs[i] = val; else n[section][i].v = val;
      try { localStorage.setItem("wa-body-swati", JSON.stringify(n)); } catch (e) {}
      return n;
    });
    setSavedId(section + "-" + i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSavedId(null), 1600);
  };

  return (
    <div role="tabpanel" id="panel-body" aria-labelledby="tab-body" tabIndex={0}>
      <RecordHead title="Client record"
        subtitle="Baseline measurements and health background captured at intake. Values needing attention are flagged in red — click any one to correct it, changes save automatically." />

      <div className="wa-acc">
        <RecordSection icon="bi-rulers" name="Body Measurements" sub="Intake baseline" count={String(data.measures.length)}
          isOpen={open.has("measures")} onToggle={() => toggle("measures")}>
          <div className="wa-dl">
            {data.measures.map((r, i) => <DLItem key={r.k} row={r}
              onCommit={(val) => commit("measures", i, val)} saved={savedId === "measures-" + i} />)}
          </div>
        </RecordSection>

        <RecordSection icon="bi-clipboard2-pulse" name="Health Background" sub="History & medication"
          isOpen={open.has("background")} onToggle={() => toggle("background")}>
          <div className="wa-dl">
            {data.background.map((r, i) => <DLItem key={r.k} row={r}
              onCommit={(val) => commit("background", i, val)} saved={savedId === "background-" + i} />)}
          </div>
        </RecordSection>

        <RecordSection icon="bi-file-earmark-medical" name="Health Documents" sub="Uploaded reports"
          isOpen={open.has("docs")} onToggle={() => toggle("docs")}>
          <div className="wa-doclist">
            {data.docs.map((doc, i) => (
              <div key={i} className="wa-dl__vwrap">
                <span style={{ color: "var(--accent)", display: "inline-flex" }}><i className="bi bi-file-earmark-text"></i></span>
                <InlineText value={doc} tone={null} onCommit={(val) => commit("docs", i, val)} />
                {savedId === "docs-" + i && <span className="wa-saved"><i className="bi bi-check-lg"></i>Saved</span>}
              </div>
            ))}
          </div>
        </RecordSection>
      </div>
    </div>
  );
}
