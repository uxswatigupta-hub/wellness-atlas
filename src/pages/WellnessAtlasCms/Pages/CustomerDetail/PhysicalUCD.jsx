/* =========================================================================
   PhysicalUCD — "Non-Digital UCD" activity log (Unexpected Client Delight)
   Read-only by default; when the profile is in Edit mode (`editing` prop)
   every type / label / value becomes click-to-edit and add / delete controls
   appear. Changes autosave to localStorage: wa-ucd-physical-swati
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/PhysicalUCD.jsx
   ========================================================================= */
import React, { useState, useRef, useEffect } from "react";

const KEY = "wa-ucd-physical-swati";
const ICONS = [
  "bi-flower1", "bi-bag-heart", "bi-cup-hot", "bi-people",
  "bi-envelope-heart", "bi-box2-heart", "bi-telephone", "bi-star",
];
const DEFAULT = [
  { id: "u1", type: "Gift / Flowers", icon: "bi-flower1",
    fields: [["Date", "14 Feb 2026"], ["Source", "IGP.com"], ["Item", "Tulip bouquet"], ["Amount", "₹1,299"]] },
  { id: "u2", type: "Food Sent", icon: "bi-bag-heart",
    fields: [["Date", "3 Mar 2026"], ["Source", "App order"], ["Item", "Fruit hamper"], ["Amount", "₹850"]] },
  { id: "u3", type: "Physical Meeting", icon: "bi-people",
    fields: [["Date", "22 Mar 2026"], ["Location", "Client's home"], ["Notes", "Progress review"]] },
];

function loadUCD() {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT));
}

function InlineEdit({ value, placeholder, onCommit, big }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);
  const ref = useRef(null);
  useEffect(() => { if (editing && ref.current) { ref.current.focus(); ref.current.select(); } }, [editing]);
  const commit = () => { setEditing(false); if (temp !== value) onCommit(temp); };
  const cancel = () => { setTemp(value); setEditing(false); };
  if (editing) {
    return (
      <input ref={ref} className={"wa-inline-input" + (big ? " wa-inline-input--big" : "")}
        value={temp} placeholder={placeholder} onChange={(e) => setTemp(e.target.value)}
        onBlur={commit} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } if (e.key === "Escape") cancel(); }} />
    );
  }
  return (
    <button type="button" className={"wa-inline" + (big ? " wa-inline--big" : "") + (value ? "" : " wa-inline--empty")}
      onClick={() => { setTemp(value); setEditing(true); }}>
      <span>{value || placeholder}</span><i className="bi bi-pencil wa-inline__pen"></i>
    </button>
  );
}

function ReadCard({ entry }) {
  return (
    <div className="wa-ucdcard">
      <p className="wa-ucdcard__t"><i className={"bi " + entry.icon}></i>{entry.type}</p>
      <dl className="wa-ucdmeta">
        {entry.fields.map((f, j) => (
          <div key={j}><dt>{f[0]}</dt><dd>{f[1] || "—"}</dd></div>
        ))}
      </dl>
    </div>
  );
}

function EditCard({ entry, saved, onPatch, onDelete }) {
  const [iconOpen, setIconOpen] = useState(false);
  return (
    <div className="wa-ucdcard wa-ucdcard--edit">
      <div className="wa-ucdcard__head">
        <div className="wa-ucdcard__icnwrap">
          <button type="button" className="wa-ucdcard__icn" onClick={() => setIconOpen((o) => !o)} aria-label="Change icon">
            <i className={"bi " + entry.icon}></i>
          </button>
          {iconOpen && (
            <div className="wa-iconpop">
              {ICONS.map((ic) => (
                <button key={ic} type="button" className={"wa-iconpop__b" + (entry.icon === ic ? " is-on" : "")}
                  onClick={() => { onPatch((e) => (e.icon = ic)); setIconOpen(false); }}>
                  <i className={"bi " + ic}></i>
                </button>
              ))}
            </div>
          )}
        </div>
        <InlineEdit value={entry.type} placeholder="Entry type" big onCommit={(v) => onPatch((e) => (e.type = v))} />
        {saved && <span className="wa-saved"><i className="bi bi-check-lg"></i>Saved</span>}
        <span style={{ flex: 1 }}></span>
        <button type="button" className="wa-iconbtn wa-iconbtn--danger" onClick={onDelete} aria-label="Delete entry">
          <i className="bi bi-trash3"></i>
        </button>
      </div>

      <dl className="wa-ucdmeta wa-ucdmeta--edit">
        {entry.fields.map((f, i) => (
          <div key={i} className="wa-ucdfield">
            <dt><InlineEdit value={f[0]} placeholder="Label" onCommit={(v) => onPatch((e) => (e.fields[i][0] = v))} /></dt>
            <dd>
              <InlineEdit value={f[1]} placeholder="Value" onCommit={(v) => onPatch((e) => (e.fields[i][1] = v))} />
              <button type="button" className="wa-ucdfield__x" onClick={() => onPatch((e) => e.fields.splice(i, 1))} aria-label="Remove field">
                <i className="bi bi-x"></i>
              </button>
            </dd>
          </div>
        ))}
        <button type="button" className="wa-addfield" onClick={() => onPatch((e) => e.fields.push(["", ""]))}>
          <i className="bi bi-plus-lg"></i>Add field
        </button>
      </dl>
    </div>
  );
}

export default function PhysicalUCD({ editing }) {
  const [list, setList] = useState(loadUCD);
  const [savedId, setSavedId] = useState(null);
  const timer = useRef(null);
  const persist = (next) => { try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {} };
  const flash = (id) => { setSavedId(id); clearTimeout(timer.current); timer.current = setTimeout(() => setSavedId(null), 1600); };
  const patch = (id, mut) => {
    setList((prev) => { const n = JSON.parse(JSON.stringify(prev)); const e = n.find((x) => x.id === id); if (e) mut(e); persist(n); return n; });
    flash(id);
  };
  const addEntry = () => setList((prev) => {
    const n = prev.concat([{ id: "u" + Date.now(), type: "New entry", icon: "bi-gift", fields: [["Date", ""], ["Details", ""]] }]);
    persist(n); return n;
  });
  const delEntry = (id) => setList((prev) => { const n = prev.filter((x) => x.id !== id); persist(n); return n; });

  return (
    <div className="wa-pcard">
      <div className="wa-pgroup__h wa-pgroup__h--action">
        <span><i className="bi bi-gift"></i>Non-Digital UCD</span>
        {editing && <button type="button" className="wa-addentry" onClick={addEntry}><i className="bi bi-plus-lg"></i>Add entry</button>}
      </div>
      <div className={editing ? "wa-ucdlist" : "wa-ucdgrid"} style={{ marginTop: 14 }}>
        {list.length === 0 && (
          <div className="wa-ucdempty">
            No non-digital UCD logged yet.{editing ? <span> Click <strong>Add entry</strong> to record a gift, meal, meeting or milestone.</span> : <span> Use <strong>Edit profile</strong> to add one.</span>}
          </div>
        )}
        {list.map((e) => (
          editing
            ? <EditCard key={e.id} entry={e} saved={savedId === e.id}
                onPatch={(mut) => patch(e.id, mut)} onDelete={() => delEntry(e.id)} />
            : <ReadCard key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
}
