/* =========================================================================
   ClientProfile — full profile + preferences (editable, persists to localStorage)
   Path: src/pages/WellnessAtlasCms/Pages/CustomerDetail/ClientProfile.jsx
   ========================================================================= */
import React, { useState } from "react";
import { loadProfile, saveProfile } from "../../Components/data";
import PhysicalUCD from "./PhysicalUCD";

function ChipGroup({ title, list, editing, onToggle, style }) {
  return (
    <div className="wa-chipgroup" style={style}>
      <p className="wa-chipgroup__k">{title}</p>
      <div className="wa-chips">
        {list.map((c, i) => (
          <span key={i}
            className={"wa-chip" + (c.on ? " wa-chip--on" : "") + (editing ? " wa-chip--edit" : "")}
            onClick={editing ? () => onToggle(i) : undefined}>
            {c.on && <i className="bi bi-check-lg"></i>}{c.l}
          </span>
        ))}
      </div>
    </div>
  );
}

function EField({ k, v, editing, onChange }) {
  return (
    <div className="wa-field">
      <span className="wa-field__k">{k}</span>
      {editing
        ? <input className="wa-edit-input" value={v} onChange={(e) => onChange(e.target.value)} />
        : <span className="wa-field__v">{v}</span>}
    </div>
  );
}

function Card({ card, editing, colCls, onRow }) {
  return (
    <div className={colCls}>
      <div className="wa-pcard">
        <div className="wa-pgroup__h"><i className={"bi " + card.icon}></i>{card.title}</div>
        {card.rows.map((r, ri) => (
          <EField key={ri} k={r[0]} v={r[1]} editing={editing} onChange={(val) => onRow(ri, val)} />
        ))}
      </div>
    </div>
  );
}

export default function ClientProfile({ onBack }) {
  const [data, setData] = useState(loadProfile);
  const [editing, setEditing] = useState(false);
  const [backup, setBackup] = useState(null);

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const upd = (m) => { const d = clone(data); m(d); setData(d); };

  const start = () => { setBackup(clone(data)); setEditing(true); };
  const cancel = () => { if (backup) setData(backup); setBackup(null); setEditing(false); };
  const save = () => { saveProfile(data); setBackup(null); setEditing(false); };

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <>
      {/* profile header (breadcrumb handles back navigation) */}
      <div className="wa-profilepage__head">
        <div className="wa-profile__avatar wa-profile__avatar--sm">CLIENT&nbsp;PHOTO</div>
        <div className="wa-profilepage__id">
          {editing
            ? <input className="wa-edit-name" value={data.name}
                     onChange={(e) => upd((d) => (d.name = e.target.value))} />
            : <h2>{data.name}</h2>}
          <span className="wa-profilepage__role">Client</span>
        </div>
        <div className="wa-edit-actions">
          {!editing && <button className="wa-editbtn" onClick={start}><i className="bi bi-pencil"></i>Edit profile</button>}
          {editing && <button className="wa-editbtn wa-editbtn--ghost" onClick={cancel}>Cancel</button>}
          {editing && <button className="wa-editbtn wa-editbtn--save" onClick={save}><i className="bi bi-check-lg"></i>Save changes</button>}
        </div>
      </div>

      {editing && (
        <div className="wa-editbanner">
          <i className="bi bi-pencil-square"></i>
          Editing — change any field, tap chips, size or colour to toggle, then Save changes.
        </div>
      )}

      <div className="row g-4">
        {data.cards.map((c, ci) => (
          <Card key={ci} card={c} editing={editing} colCls="col-12 col-md-6 col-xl-4"
            onRow={(ri, val) => upd((d) => (d.cards[ci].rows[ri][1] = val))} />
        ))}
      </div>

      <div className="wa-psection">
        <div className="wa-psection__bar"><span className="wa-psection__tag">A</span><h3>Personal Preferences</h3><span className="line"></span></div>
        <div className="wa-pcard">
          <ChipGroup title="Food preferences" list={data.chips.food} editing={editing}
            onToggle={(i) => upd((d) => (d.chips.food[i].on = !d.chips.food[i].on))} />
          <ChipGroup title="Hobbies & interests" list={data.chips.hobby} editing={editing} style={{ marginTop: 18 }}
            onToggle={(i) => upd((d) => (d.chips.hobby[i].on = !d.chips.hobby[i].on))} />
          <ChipGroup title="Content they enjoy" list={data.chips.content} editing={editing} style={{ marginTop: 18 }}
            onToggle={(i) => upd((d) => (d.chips.content[i].on = !d.chips.content[i].on))} />
        </div>
      </div>

      <div className="wa-psection">
        <div className="wa-psection__bar"><span className="wa-psection__tag">B</span><h3>Emotional Connectors &amp; Delight Triggers</h3><span className="line"></span></div>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="wa-pcard">
              <ChipGroup title="Ways to make them feel special" list={data.chips.special} editing={editing}
                onToggle={(i) => upd((d) => (d.chips.special[i].on = !d.chips.special[i].on))} />
              <ChipGroup title="Gifts they'd love" list={data.chips.gift} editing={editing} style={{ marginTop: 18 }}
                onToggle={(i) => upd((d) => (d.chips.gift[i].on = !d.chips.gift[i].on))} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="wa-pcard">
              <ChipGroup title="Dreams, aspirations & goals" list={data.chips.goal} editing={editing}
                onToggle={(i) => upd((d) => (d.chips.goal[i].on = !d.chips.goal[i].on))} />
              <div className="row g-3" style={{ marginTop: 6 }}>
                <div className="col-6">
                  <p className="wa-chipgroup__k">Favourite colour</p>
                  {editing
                    ? <div className="wa-edit-colorrow">
                        <input type="color" className="wa-edit-color" value={data.color.hex}
                          onChange={(e) => upd((d) => (d.color.hex = e.target.value))} />
                        <input className="wa-edit-input" style={{ textAlign: "left", maxWidth: "none" }}
                          value={data.color.name} onChange={(e) => upd((d) => (d.color.name = e.target.value))} />
                      </div>
                    : <span className="wa-swatch">
                        <span className="wa-swatch__dot" style={{ background: data.color.hex }}></span>{data.color.name}
                      </span>}
                </div>
                <div className="col-6">
                  <p className="wa-chipgroup__k">Target clothing size</p>
                  <div className="wa-sizepills">
                    {sizes.map((s) => (
                      <span key={s}
                        className={"wa-sizepill" + (s === data.size ? " wa-sizepill--on" : "") + (editing ? " wa-sizepill--edit" : "")}
                        onClick={editing ? () => upd((d) => (d.size = s)) : undefined}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wa-psection">
        <div className="wa-psection__bar"><span className="wa-psection__tag">C</span><h3>Family Structure &amp; Key Information</h3><span className="line"></span></div>
        <div className="row g-4">
          {data.family.map((c, ci) => (
            <Card key={ci} card={c} editing={editing}
              colCls={c.wide ? "col-12" : "col-12 col-md-6 col-xl-4"}
              onRow={(ri, val) => upd((d) => (d.family[ci].rows[ri][1] = val))} />
          ))}
        </div>
      </div>

      <div className="wa-psection">
        <div className="wa-psection__bar"><span className="wa-psection__tag">UCD</span><h3>Unexpected Client Delight</h3><span className="line"></span></div>
        <div className="row g-4">
          <div className="col-12">
            <div className="wa-pcard">
              <div className="wa-pgroup__h"><i className="bi bi-phone"></i>Digital UCD</div>
              <div className="wa-ucd" style={{ marginTop: 14 }}>
                {[
                  ["Trailblazer", "12 Jan"], ["Hydration Hero", "20 Jan"], ["Sugar Slayer", "3 Feb"],
                  ["Salad Ninja", null], ["Label Legend", null], ["Unstoppable Wellness Warrior", null],
                  ["\u201CLook How Far You've Come\u201D Video", null], ["Ultimate Wellness Warrior", null],
                  ["Pause the Program gift", null], ["Extend the Program gift", null], ["Enrol in a challenge gift", null],
                ].map(([name, date], i) => (
                  <div key={i} className={"wa-ucd__row" + (date ? " wa-ucd__row--done" : "")}>
                    <span className="wa-ucd__check"><i className="bi bi-check-lg"></i></span>
                    <span className="wa-ucd__name">{name}</span>
                    {date && <span className="wa-ucd__date">{date}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12">
            <PhysicalUCD editing={editing} />
          </div>
        </div>
      </div>
    </>
  );
}
