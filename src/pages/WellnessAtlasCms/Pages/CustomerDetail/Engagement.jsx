/* =========================================================================
   Coach Engagement — checklist of value-add touchpoints done with a client.
   Read-only by default; when the profile is in Edit mode (`editing` prop) each
   item toggles done (stamps today's date + optional note) and items / groups
   can be added, renamed or removed. Autosaves to localStorage.
   Key: wa-engagement-swati
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/Engagement.jsx
   ========================================================================= */
import React, { useState, useRef, useEffect } from "react";

  const KEY = "wa-engagement-swati";

  const todayStr = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  /* seeded playbook — a few already done for Swati, most pending */
  const DEFAULT = {
    groups: [
      { id: "kitchen", name: "Kitchen & Cooking", icon: "bi-egg-fried", items: [
        { id: "k1", label: "Healthy cookware intro", done: true, date: "18 Jan 2026", note: "Swapped to steel + cast iron" },
        { id: "k2", label: "DTM (done-together meal)", done: true, date: "2 Feb 2026", note: "" },
        { id: "k3", label: "Shared healthy cooking videos", done: true, date: "20 Jan 2026", note: "" },
        { id: "k4", label: "Invited to cooking webinar", done: false, date: "", note: "" },
        { id: "k5", label: "Conducted cooking session", done: false, date: "", note: "" },
        { id: "k6", label: "Grocery / online-cart walkthrough", done: false, date: "", note: "" },
        { id: "k7", label: "Spice-box makeover", done: false, date: "", note: "" },
        { id: "k8", label: "Recipe pack shared", done: true, date: "5 Feb 2026", note: "" },
      ] },
      { id: "aware", name: "Food Awareness", icon: "bi-search", items: [
        { id: "a1", label: "Pantry cleaning", done: true, date: "22 Jan 2026", note: "Removed refined oils & maida" },
        { id: "a2", label: "Label reading", done: true, date: "22 Jan 2026", note: "" },
        { id: "a3", label: "Oil awareness", done: true, date: "22 Jan 2026", note: "" },
        { id: "a4", label: "Hidden-sugar audit", done: false, date: "", note: "" },
        { id: "a5", label: "Hydration setup", done: false, date: "", note: "" },
        { id: "a6", label: "Food-combination guidance", done: false, date: "", note: "" },
      ] },
      { id: "home", name: "Home & Environment", icon: "bi-house-heart", items: [
        { id: "h1", label: "WTD session at their place", done: false, date: "", note: "" },
        { id: "h2", label: "Plastic-free swap", done: false, date: "", note: "" },
        { id: "h3", label: "Cleaning-product swap", done: false, date: "", note: "" },
        { id: "h4", label: "EMF / home-toxin walkthrough", done: false, date: "", note: "" },
      ] },
      { id: "assess", name: "Assessments", icon: "bi-clipboard2-pulse", items: [
        { id: "s1", label: "Skin assessment", done: true, date: "10 Mar 2026", note: "" },
        { id: "s2", label: "Hair health assessment", done: true, date: "10 Mar 2026", note: "" },
        { id: "s3", label: "Sleep assessment", done: false, date: "", note: "" },
        { id: "s4", label: "Gut / digestion assessment", done: false, date: "", note: "" },
        { id: "s5", label: "Posture assessment", done: false, date: "", note: "" },
        { id: "s6", label: "Stress audit", done: false, date: "", note: "" },
      ] },
      { id: "family", name: "Family", icon: "bi-people", items: [
        { id: "f1", label: "Spouse onboarded", done: false, date: "", note: "" },
        { id: "f2", label: "Kids' assessment", done: true, date: "15 Mar 2026", note: "Both children" },
        { id: "f3", label: "Kids' lunchbox makeover", done: false, date: "", note: "" },
        { id: "f4", label: "Parents' health check", done: false, date: "", note: "" },
      ] },
      { id: "cont", name: "Community & Continuity", icon: "bi-diagram-3", items: [
        { id: "c1", label: "Added to community group", done: true, date: "14 Jan 2026", note: "" },
        { id: "c2", label: "Buddy pairing", done: false, date: "", note: "" },
        { id: "c3", label: "Challenge enrolment", done: false, date: "", note: "" },
        { id: "c4", label: "Monthly review call", done: true, date: "1 Apr 2026", note: "" },
        { id: "c5", label: "Supplement plan set", done: true, date: "24 Jan 2026", note: "" },
        { id: "c6", label: "Labs ordered / reviewed", done: false, date: "", note: "" },
      ] },
    ],
  };

  function loadEng() {
    try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT));
  }

  /* inline click-to-edit text (edit mode) */
  function InlineEdit({ value, placeholder, onCommit, cls }) {
    const [ed, setEd] = useState(false);
    const [t, setT] = useState(value);
    const ref = useRef(null);
    useEffect(() => { if (ed && ref.current) { ref.current.focus(); ref.current.select(); } }, [ed]);
    const commit = () => { setEd(false); if (t !== value) onCommit(t); };
    if (ed) {
      return <input ref={ref} className={"wa-inline-input " + (cls || "")} value={t} placeholder={placeholder}
        onChange={(e) => setT(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } if (e.key === "Escape") { setT(value); setEd(false); } }} />;
    }
    return <button type="button" className={"wa-inline " + (cls || "") + (value ? "" : " wa-inline--empty")}
      onClick={() => { setT(value); setEd(true); }}><span>{value || placeholder}</span><i className="bi bi-pencil wa-inline__pen"></i></button>;
  }

  function Item({ it, editing, onToggle, onLabel, onNote, onDelete }) {
    return (
      <div className={"wa-engitem" + (it.done ? " wa-engitem--done" : "")}>
        <button type="button" className="wa-engitem__check" aria-pressed={it.done}
          onClick={onToggle} aria-label={it.done ? "Mark not done" : "Mark done"}>
          {it.done ? <i className="bi bi-check-lg"></i> : null}
        </button>
        <div className="wa-engitem__main">
          {editing
            ? <InlineEdit value={it.label} placeholder="Task" cls="wa-engitem__lbl" onCommit={onLabel} />
            : <span className="wa-engitem__lbl">{it.label}</span>}
          {it.done && (
            <span className="wa-engitem__meta">
              <i className="bi bi-calendar3"></i>{it.date}
              {editing
                ? <InlineEdit value={it.note} placeholder="+ add note" cls="wa-engitem__note" onCommit={onNote} />
                : (it.note ? <span className="wa-engitem__note-ro">· {it.note}</span> : null)}
            </span>
          )}
        </div>
        {editing && (
          <button type="button" className="wa-engitem__x" onClick={onDelete} aria-label="Remove task"><i className="bi bi-x"></i></button>
        )}
      </div>
    );
  }

export default function Engagement() {
    const [data, setData] = useState(loadEng);
    const [manage, setManage] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const editing = manage;                       // structural edits gated by the Edit-list toggle
    const [open, setOpen] = useState(() => new Set(loadEng().groups.map((g) => g.id)));
    const persist = (next) => { try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {} };
    const mutate = (fn) => setData((prev) => { const n = JSON.parse(JSON.stringify(prev)); fn(n); persist(n); return n; });
    const toggleGroup = (id) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const total = data.groups.reduce((s, g) => s + g.items.length, 0);
    const done = data.groups.reduce((s, g) => s + g.items.filter((i) => i.done).length, 0);
    const pct = total ? Math.round((done / total) * 100) : 0;

    return (
      <div className={"wa-pcard wa-engcard" + (expanded ? " wa-engcard--open" : "")}>
        {/* collapsed summary bar — click to expand */}
        <button type="button" className="wa-engbar" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          <span className="wa-engbar__title"><i className="bi bi-ui-checks"></i>Coach Engagement</span>
          <span className="wa-engbar__prog">
            <span className="wa-engbar__count"><strong>{done}</strong>/{total}</span>
            <span className="wa-eng__bar wa-engbar__mini"><span className="wa-eng__fill" style={{ width: pct + "%" }}></span></span>
            <span className="wa-engbar__pct">{pct}%</span>
          </span>
          <i className={"bi wa-engbar__chev " + (expanded ? "bi-chevron-up" : "bi-chevron-down")}></i>
        </button>

        {expanded && (
        <div className="wa-engcard__body">
        <div className="wa-pgroup__h wa-pgroup__h--action" style={{ marginTop: 4 }}>
          <span className="wa-engcard__sub">{done} of {total} touchpoints done · {pct}%</span>
          <span style={{ display: "flex", gap: 8 }}>
            {editing && <button type="button" className="wa-addentry"
              onClick={() => mutate((n) => n.groups.push({ id: "g" + Date.now(), name: "New category", icon: "bi-stars", items: [] }))}>
              <i className="bi bi-plus-lg"></i>Add category</button>}
            <button type="button" className={"wa-editbtn" + (manage ? " wa-editbtn--save" : "")} onClick={() => setManage((m) => !m)}>
              <i className={"bi " + (manage ? "bi-check-lg" : "bi-pencil")}></i>{manage ? "Done" : "Edit list"}
            </button>
          </span>
        </div>

        <div className="wa-eng" style={{ marginTop: 4 }}>
          {data.groups.map((g, gi) => {
            const gd = g.items.filter((i) => i.done).length;
            const isOpen = open.has(g.id);
            return (
              <div className="wa-enggroup" key={g.id}>
                <div className="wa-enggroup__head">
                  <button type="button" className="wa-enggroup__toggle" onClick={() => toggleGroup(g.id)} aria-expanded={isOpen}>
                    <i className={"bi wa-enggroup__icn " + g.icon}></i>
                    {editing
                      ? <span onClick={(e) => e.stopPropagation()}><InlineEdit value={g.name} placeholder="Category"
                          cls="wa-enggroup__nm" onCommit={(v) => mutate((n) => (n.groups[gi].name = v))} /></span>
                      : <span className="wa-enggroup__nm">{g.name}</span>}
                    <span className="wa-enggroup__count">{gd}/{g.items.length}</span>
                    <i className={"bi wa-enggroup__chev " + (isOpen ? "bi-chevron-up" : "bi-chevron-down")}></i>
                  </button>
                  {editing && (
                    <button type="button" className="wa-iconbtn wa-iconbtn--danger" aria-label="Remove category"
                      onClick={() => mutate((n) => n.groups.splice(gi, 1))}><i className="bi bi-trash3"></i></button>
                  )}
                </div>
                {isOpen && (
                  <div className="wa-enggroup__body">
                    {g.items.map((it, ii) => (
                      <Item key={it.id} it={it} editing={editing}
                        onToggle={() => mutate((n) => { const t = n.groups[gi].items[ii]; t.done = !t.done; t.date = t.done ? todayStr() : ""; if (!t.done) t.note = ""; })}
                        onLabel={(v) => mutate((n) => (n.groups[gi].items[ii].label = v))}
                        onNote={(v) => mutate((n) => (n.groups[gi].items[ii].note = v))}
                        onDelete={() => mutate((n) => n.groups[gi].items.splice(ii, 1))} />
                    ))}
                    {editing && (
                      <button type="button" className="wa-addfield" style={{ marginTop: 4 }}
                        onClick={() => mutate((n) => n.groups[gi].items.push({ id: "i" + Date.now(), label: "", done: false, date: "", note: "" }))}>
                        <i className="bi bi-plus-lg"></i>Add task</button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>
        )}
      </div>
    );
}
