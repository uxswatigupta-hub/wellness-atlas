/* =========================================================================
   CustomerDetail — Systems Audit + section tabs + client context header
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/CustomerDetail.jsx
   ========================================================================= */
import React, { useState, useRef, useEffect } from "react";
import { client, systems, severity } from "../../Components/data";
import FollowupTracking from "./FollowupTracking";
import BodyComposition from "./BodyComposition";
import HabitsRoutine from "./HabitsRoutine";
import SystemsAssessment from "./SystemsAssessment";
import { systemContent } from "./systemContent";

function SystemBody({ id, score }) {
  const blocks = systemContent[id] || null;
  if (!blocks) {
    return (
      <div className="wa-acc__body">
        <p style={{ marginTop: 14 }}>
          {score < 25
            ? "This system scored below 25 — within a healthy range. Maintain current lifestyle habits to keep it balanced."
            : "The detailed protocol and recommendations for this system appear here once reviewed with the practitioner."}
        </p>
      </div>
    );
  }
  return (
    <div className="wa-acc__body">
      {blocks.map((b, i) => {
        if (b.callout) {
          return (
            <div className="wa-sec" key={i}>
              <div className="wa-info">
                <i className="bi bi-lightbulb-fill"></i>
                <div>{b.callout}</div>
              </div>
            </div>
          );
        }
        if (b.steps) {
          return (
            <div className="wa-sec" key={i}>
              {b.h && <div className="wa-sec__h">{b.h}</div>}
              <div className="wa-steps">
                {b.steps.map(([n, t, d]) => (
                  <div className="wa-step" key={n}>
                    <span className="wa-step__n">{n}</span>
                    <span className="wa-step__t"><strong>{t}</strong>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (b.recs) {
          return (
            <div className="wa-sec" key={i}>
              {b.h && <div className="wa-sec__h">{b.h}</div>}
              <div className="wa-rec-grid wa-rec-grid--2">
                {b.recs.map((r, j) => (
                  <div className="wa-rec" key={j}>
                    <p className="wa-rec__t"><i className={"bi " + r.icon}></i>{r.t}</p>
                    {r.sub && <p className="wa-rec__sub">{r.sub}</p>}
                    <ul>{r.items.map((it, k) => <li key={k}>{it}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        const paras = Array.isArray(b.p) ? b.p : b.p ? [b.p] : [];
        return (
          <div className="wa-sec" key={i}>
            {b.h && <div className="wa-sec__h">{b.h}</div>}
            {paras.map((p, j) => <p key={j} style={j === 0 ? { marginTop: 0 } : null}>{p}</p>)}
            {b.ul && <ul>{b.ul.map((it, k) => <li key={k}>{it}</li>)}</ul>}
          </div>
        );
      })}
    </div>
  );
}

function SystemRow({ sys, isOpen, onToggle }) {
  const sev = severity(sys.score);
  return (
    <div className={"wa-acc__item" + (isOpen ? " wa-acc__item--open" : "")}>
      <button className="wa-acc__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="wa-acc__icon"><i className={"bi " + sys.icon}></i></span>
        <span className="wa-acc__namecol">
          <span className="wa-acc__nm">{sys.name}</span>
          <span className="wa-sev-chip" style={{ color: sev.color }}>{sev.label}</span>
        </span>
        <span className="wa-acc__meter d-none d-md-block">
          <span className="wa-meter-track">
            <span className="wa-meter-fill" style={{ width: sys.score + "%", background: sev.color }}></span>
            <span className="wa-meter-tick"></span>
          </span>
        </span>
        <span className={"wa-acc__score wa-acc__score--" + sev.tier}>{sys.score}</span>
        <span className="wa-acc__chev"><i className={"bi " + (isOpen ? "bi-chevron-up" : "bi-chevron-down")}></i></span>
      </button>
      {isOpen && <SystemBody id={sys.id} score={sys.score} />}
    </div>
  );
}

const SECTIONS = [
  { id: "body", label: "Body Composition" },
  { id: "habits", label: "Habits & Routine" },
  { id: "assess", label: "Systems Assessment" },
  { id: "audit", label: "Systems Report" },
  { id: "tracking", label: "Followup Tracking" },
];

/* Order tabs by who's being viewed:
   - clients → Followup Tracking first (coaches' most-used day-to-day)
   - leads   → Systems Report first (no program/followups yet) */
function orderedSections(isLead) {
  const firstId = isLead ? "audit" : "tracking";
  const first = SECTIONS.filter((s) => s.id === firstId);
  const rest = SECTIONS.filter((s) => s.id !== firstId);
  return first.concat(rest);
}

function SectionTabs({ active, onChange, sections }) {
  const list = sections || SECTIONS;
  const refs = useRef({});
  const stripRef = useRef(null);
  useEffect(() => {
    const strip = stripRef.current, el = refs.current[active];
    if (!strip || !el) return;
    const pad = 24;
    const left = el.offsetLeft - pad;
    const right = el.offsetLeft + el.offsetWidth + pad;
    if (left < strip.scrollLeft) strip.scrollTo({ left, behavior: "smooth" });
    else if (right > strip.scrollLeft + strip.clientWidth) strip.scrollTo({ left: right - strip.clientWidth, behavior: "smooth" });
  }, [active]);
  const onKey = (e) => {
    const i = list.findIndex((s) => s.id === active);
    let n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % list.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + list.length) % list.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = list.length - 1;
    if (n === -1) return;
    e.preventDefault();
    const next = list[n].id;
    onChange(next);
    requestAnimationFrame(() => refs.current[next] && refs.current[next].focus());
  };
  return (
    <div className="wa-atabs-wrap">
      <div className="wa-atabs" role="tablist" aria-label="Client record sections" ref={stripRef}>
        {list.map((s) => (
          <button key={s.id}
            ref={(el) => (refs.current[s.id] = el)}
            className={"wa-atab" + (active === s.id ? " wa-atab--active" : "")}
            role="tab" id={"tab-" + s.id} aria-controls={"panel-" + s.id}
            aria-selected={active === s.id} tabIndex={active === s.id ? 0 : -1}
            onClick={() => onChange(s.id)} onKeyDown={onKey}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CustomerDetail({ onOpenProfile, onBack }) {
  const isLead = !!client.isLead;
  const sections = orderedSections(isLead);
  const [tab, setTab] = useState(sections[0].id);
  const [open, setOpen] = useState("assim");

  const flagged = systems.filter((s) => s.score >= 25).length;
  const top = systems.reduce((a, b) => (b.score > a.score ? b : a));
  const healthy = systems.length - flagged;

  return (
    <>

      <div className="wa-clienthdr">
        <div className="wa-clienthdr__avatar">PHOTO</div>
        <div className="wa-clienthdr__id">
          <p className="wa-clienthdr__name">{client.name}</p>
          <div className="wa-clienthdr__meta">
            <span><i className="bi bi-person"></i>{client.meta.age}</span>
            <span><i className="bi bi-geo-alt"></i>{client.meta.location}</span>
            <span><i className="bi bi-telephone"></i>{client.meta.phone}</span>
            <span><i className="bi bi-calendar3"></i>Program: {client.program.start} – {client.program.end}
              <span className="wa-prog-badge">{client.program.weeks} weeks</span></span>
          </div>
        </div>
        <div className="wa-clienthdr__cta">
          <button onClick={onOpenProfile}><i className="bi bi-person-vcard"></i>View profile</button>
        </div>
      </div>

      <section>
        <SectionTabs active={tab} onChange={setTab} sections={sections} />

        {tab === "body" && <BodyComposition />}
        {tab === "habits" && <HabitsRoutine />}
        {tab === "assess" && <SystemsAssessment />}

        {tab === "tracking" && <FollowupTracking />}

        {tab === "audit" && (
          <div role="tabpanel" id="panel-audit" aria-labelledby="tab-audit" tabIndex={0}>
            <div className="wa-summary">
              <div className="wa-stat"><div className="wa-stat__k">Need attention</div>
                <div className="wa-stat__v">{flagged} <small>of {systems.length} systems</small></div></div>
              <div className="wa-stat"><div className="wa-stat__k">Highest concern</div>
                <div className="wa-stat__v">{top.score} <small>{top.name}</small></div></div>
              <div className="wa-stat"><div className="wa-stat__k">In healthy range</div>
                <div className="wa-stat__v">{healthy} <small>Structure</small></div></div>
            </div>

            <div className="wa-legend">
              <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#2f7d3a" }}></span>Healthy &lt;25</span>
              <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#c9a83a" }}></span>Mild 25–49</span>
              <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#cf7536" }}></span>Moderate 50–74</span>
              <span className="wa-legend__item"><span className="wa-legend__dot" style={{ background: "#c34b4b" }}></span>Severe 75+</span>
            </div>

            <div className="wa-listhead">
              <h3>Systems flagged</h3>
              <span className="wa-infodot" tabIndex={0} role="button" aria-label="How systems are scored">
                <i className="bi bi-info-circle"></i>
                <span className="wa-infodot__pop">Each system is scored <strong>0–100 — higher means more concern</strong>. Anything <strong>above 25</strong> needs attention, and a 75 is more severe than a 40. Systems under 25 are in a healthy range — keep focusing on lifestyle basics.</span>
              </span>
            </div>

            <div className="wa-acc">
              {[...systems].sort((a, b) => b.score - a.score).map((sys) => (
                <SystemRow key={sys.id} sys={sys} isOpen={open === sys.id}
                  onToggle={() => setOpen(open === sys.id ? null : sys.id)} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
