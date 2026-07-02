/* =========================================================================
   FollowupTracking — weekly assessments + client feedback
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/FollowupTracking.jsx
   ========================================================================= */
import React, { useState } from "react";
import { followups, client, loadSubmittedFollowups } from "../../Components/data";
import Engagement from "./Engagement";

function Stars({ n }) {
  return (
    <span className="wa-stars" aria-label={"Coach rating " + n + " of 5"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={"bi " + (i <= n ? "bi-star-fill on" : "bi-star")}></i>
      ))}
      <span className="wa-stars__n">{n}.0</span>
    </span>
  );
}

const GA_LABELS = {
  exercise: "Days exercised", deviations: "Meals deviated", lowSleep: "Days slept <6h",
  missedSupp: "Supplements missed", lowWater: "Days low water",
};
const CHANGE_OPTS = [["worse", "Worse"], ["same", "Same"], ["better", "Better"], ["resolved", "Resolved"]];

function FollowupCard({ fu, prev, open, onToggle, editing, draft, onEdit, onCancel, onSave, onDraft }) {
  const wPrev = prev ? parseFloat(prev.measurements.Weight[0]) : null;
  const wNow = parseFloat(fu.measurements.Weight[0]);
  const dW = wPrev != null ? +(wNow - wPrev).toFixed(1) : null;
  const d = editing ? draft : fu;

  return (
    <div className="wa-fu">
      <button className="wa-fu__head" onClick={onToggle} aria-expanded={open}>
        <span className="wa-fu__num"><b>#{fu.num}</b><span>F/U</span></span>
        <span>
          <div className="wa-fu__date">{fu.date}</div>
          <div className="wa-fu__sub">{fu.since}</div>
        </span>
        {fu.submitted && <span className="wa-fu__stamp"><i className="bi bi-check-circle-fill"></i>Submitted {fu.stamp}</span>}
        <dl className="wa-fu__metric">
          <dt>Weight</dt>
          <dd>{fu.measurements.Weight[0]} <span style={{ fontSize: 11, color: "var(--muted)" }}>kg</span></dd>
        </dl>
        <span style={{ marginLeft: 4 }}><Stars n={fu.rating} /></span>
        <span className="wa-fu__spacer"></span>
        <span className="wa-fu__toggle">
          <i className={"bi " + (open ? "bi-chevron-up" : "bi-chevron-down")}></i>
          {open ? "Hide details" : "View details"}
        </span>
      </button>

      {open && (
        <div className="wa-fu__body">
          <div className="wa-fu__editbar">
            <span className="wa-fu__editbar-t">
              <i className={"bi " + (editing ? "bi-pencil-square" : "bi-clipboard2-data")}></i>
              {editing ? "Editing followup #" + fu.num : "Followup #" + fu.num + " details"}
            </span>
            <span className="wa-fu__editbar-actions">
              {!editing && <button className="wa-editbtn" onClick={onEdit}><i className="bi bi-pencil"></i>Edit details</button>}
              {editing && <button className="wa-editbtn wa-editbtn--ghost" onClick={onCancel}>Cancel</button>}
              {editing && <button className="wa-editbtn wa-editbtn--save" onClick={onSave}><i className="bi bi-check-lg"></i>Save changes</button>}
            </span>
          </div>

          <div className="wa-fu__sech">Client feedback — “How would you rate your coach?”</div>
          {editing
            ? <div className="wa-yn" style={{ marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" className={"wa-yn__btn" + (d.rating === n ? " is-on" : "")}
                    onClick={() => onDraft((x) => (x.rating = n))}>{n}</button>
                ))}
              </div>
            : <Stars n={d.rating} />}
          {editing
            ? <textarea className="wa-in" style={{ minHeight: 96, marginTop: 4 }} value={d.feedback}
                onChange={(e) => onDraft((x) => (x.feedback = e.target.value))} />
            : <blockquote className="wa-quote">{d.feedback}</blockquote>}

          <div className="wa-fu__sech">General assessment (last week)</div>
          <div className="wa-ga">
            {Object.keys(GA_LABELS).map((k) => (
              <div className="wa-ga__tile" key={k}>
                {editing
                  ? <input className="wa-edit-input" type="number" style={{ maxWidth: 64, textAlign: "center" }}
                      value={d.general[k]} onChange={(e) => onDraft((x) => (x.general[k] = e.target.value === "" ? "" : Number(e.target.value)))} />
                  : <div className="v">{d.general[k]}</div>}
                <div className="k">{GA_LABELS[k]}</div>
              </div>
            ))}
          </div>

          <div className="wa-fu__sech">Measurements{!editing && dW != null && (
            <span className={"wa-delta " + (dW < 0 ? "wa-delta--down" : dW > 0 ? "wa-delta--up" : "wa-delta--flat")}
                  style={{ marginLeft: 10, textTransform: "none", letterSpacing: 0 }}>
              {dW < 0 ? "▼ " : dW > 0 ? "▲ " : ""}{Math.abs(dW)} kg vs #{prev.num}
            </span>
          )}</div>
          <div className="wa-meas">
            {Object.keys(d.measurements).map((k) => (
              <div className="wa-meas__cell" key={k}>
                <div className="wa-meas__k">{k}</div>
                {editing
                  ? <input className="wa-edit-input" type="number" step="0.1" style={{ maxWidth: "100%", textAlign: "left" }}
                      value={d.measurements[k][0]} onChange={(e) => onDraft((x) => (x.measurements[k] = [e.target.value, x.measurements[k][1]]))} />
                  : <div className="wa-meas__v">{d.measurements[k][0]} <small>{d.measurements[k][1]}</small></div>}
              </div>
            ))}
          </div>

          {!editing && fu.improved.length > 0 && (
            <>
              <div className="wa-fu__sech">Concerns better</div>
              <div className="wa-concern wa-concern--improved">
                {fu.improved.map((c, i) => <span key={i}>{c}</span>)}
              </div>
            </>
          )}
          {!editing && fu.resolved.length > 0 && (
            <>
              <div className="wa-fu__sech">Concerns resolved</div>
              <div className="wa-concern wa-concern--resolved">
                {fu.resolved.map((c, i) => <span key={i}><i className="bi bi-check-lg"></i> {c}</span>)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function FollowupTracking() {
  const [overrides, setOverrides] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wa-fu-edits") || "{}"); } catch (e) { return {}; }
  });
  const [editNum, setEditNum] = useState(null);
  const [draft, setDraft] = useState(null);

  const submitted = loadSubmittedFollowups();
  const rawList = [...submitted, ...followups];   // client submissions first
  const list = rawList.map((fu) => overrides[fu.num] ? Object.assign({}, fu, overrides[fu.num]) : fu);
  const [open, setOpen] = useState(list[0].num);
  const [nextDate, setNextDate] = useState("2026-07-08");
  const [editingSched, setEditingSched] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [copied, setCopied] = useState(false);

  const startEdit = (fu) => { setDraft(JSON.parse(JSON.stringify(fu))); setEditNum(fu.num); setOpen(fu.num); };
  const cancelEdit = () => { setDraft(null); setEditNum(null); };
  const editDraft = (mut) => setDraft((prev) => { const d = JSON.parse(JSON.stringify(prev)); mut(d); return d; });
  const saveEdit = () => {
    const next = Object.assign({}, overrides, {
      [editNum]: {
        rating: draft.rating, feedback: draft.feedback,
        general: draft.general, measurements: draft.measurements, health: draft.health,
      },
    });
    try { localStorage.setItem("wa-fu-edits", JSON.stringify(next)); } catch (e) {}
    setOverrides(next); setDraft(null); setEditNum(null);
  };

  const formLink = window.location.origin + "/f/" + ((client && client.name) || "client").toLowerCase().replace(/\s+/g, "-");
  const copyLink = () => {
    try { navigator.clipboard.writeText(formLink); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const waText = encodeURIComponent("Hi! Here's your weekly Wellness Atlas follow-up — please fill it in: " + formLink);

  const latest = list[0];
  const baseline = list[list.length - 1];
  const wNow = parseFloat(latest.measurements.Weight[0]);
  const wBase = parseFloat(baseline.measurements.Weight[0]);
  const wDelta = +(wNow - wBase).toFixed(1);
  const avgRating = (list.reduce((a, b) => a + b.rating, 0) / list.length).toFixed(1);

  const fmt = (iso) => {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };
  const daysAway = Math.ceil((new Date(nextDate + "T00:00:00") - new Date()) / 86400000);

  return (
    <div role="tabpanel" id="panel-tracking" aria-labelledby="tab-tracking" tabIndex={0}>
      {/* next followup scheduler */}
      <div className="wa-nextfu">
        <div className="wa-nextfu__icon"><i className="bi bi-calendar-plus"></i></div>
        <div className="wa-nextfu__body">
          <div className="wa-nextfu__k">Next followup</div>
          {editingSched
            ? <div className="wa-nextfu__edit">
                <input type="date" className="wa-edit-input" style={{ textAlign: "left" }}
                  value={nextDate} onChange={(e) => setNextDate(e.target.value)} />
                <button className="wa-editbtn wa-editbtn--save" onClick={() => setEditingSched(false)}>
                  <i className="bi bi-check-lg"></i>Done</button>
              </div>
            : <div className="wa-nextfu__v">{fmt(nextDate)}
                {daysAway >= 0
                  ? <span className="wa-nextfu__in">in {daysAway} day{daysAway === 1 ? "" : "s"}</span>
                  : <span className="wa-nextfu__in wa-nextfu__in--over">overdue</span>}
              </div>}
        </div>
        {!editingSched && (
          <div className="wa-nextfu__actions">
            <button className="wa-editbtn" onClick={() => setEditingSched(true)}>
              <i className="bi bi-calendar-event"></i>Reschedule</button>
            <button className="wa-editbtn wa-editbtn--save" onClick={() => setShowLink(!showLink)}>
              <i className="bi bi-send"></i>Send follow-up link</button>
          </div>
        )}
      </div>
      {showLink && (
        <div className="wa-linkpanel">
          <p className="wa-linkpanel__t">Weekly follow-up link for {(client && client.name) || "this client"}</p>
          <p className="wa-linkpanel__sub">Share this link — when they submit, their follow-up shows up below with the submission date.</p>
          <div className="wa-linkrow">
            <input readOnly value={formLink} onClick={(e) => e.target.select()} />
            <button className="wa-editbtn wa-editbtn--save" onClick={copyLink}>
              <i className={"bi " + (copied ? "bi-check-lg" : "bi-clipboard")}></i>{copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="wa-share">
            <a href={"https://wa.me/?text=" + waText} target="_blank" rel="noreferrer"><i className="bi bi-whatsapp"></i>WhatsApp</a>
            <a href={"mailto:?subject=Your%20weekly%20follow-up&body=" + waText}><i className="bi bi-envelope"></i>Email</a>
          </div>
        </div>
      )}

      <div className="wa-summary">
        <div className="wa-stat"><div className="wa-stat__k">Current weight</div>
          <div className="wa-stat__v">{wNow} <small>kg</small>
            <span className={"wa-delta " + (wDelta < 0 ? "wa-delta--down" : wDelta > 0 ? "wa-delta--up" : "wa-delta--flat")}>
              {wDelta < 0 ? "▼" : wDelta > 0 ? "▲" : "–"} {Math.abs(wDelta)} kg
            </span>
          </div>
        </div>
        <div className="wa-stat"><div className="wa-stat__k">Followups logged</div>
          <div className="wa-stat__v">{list.length} <small>since {baseline.date}</small></div></div>
        <div className="wa-stat"><div className="wa-stat__k">Avg coach rating</div>
          <div className="wa-stat__v">{avgRating} <small>of 5</small></div></div>
      </div>

      {/* coach engagement checklist */}
      {/* coach engagement checklist — secondary; collapsed by default */}

      <div className="wa-listhead" style={{ marginTop: 24 }}><h3>Followup history</h3></div>

      {list.map((fu, i) => (
        <FollowupCard key={fu.num} fu={fu} prev={list[i + 1] || null}
          open={open === fu.num} onToggle={() => setOpen(open === fu.num ? null : fu.num)}
          editing={editNum === fu.num} draft={draft}
          onEdit={() => startEdit(fu)} onCancel={cancelEdit} onSave={saveEdit} onDraft={editDraft} />
      ))}

      <div style={{ marginTop: 28 }}>
        <Engagement />
      </div>
    </div>
  );
}
