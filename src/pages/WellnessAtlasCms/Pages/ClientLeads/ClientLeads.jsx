/* =========================================================================
   ClientLeads — Leads / Customers landing list
   Path: src/pages/WellnessAtlasCms/Pages/ClientLeads/ClientLeads.jsx
   ========================================================================= */
import React, { useState, useMemo } from "react";
import { customers, leads } from "../../Components/data";

const STATUS_LABEL = { active: "Active", new: "New", risk: "At-risk" };
const TAGS = ["Weight Loss", "Insulin Resistance", "High Stress", "Poor Sleep", "Emotional Eating",
  "Sugar Cravings", "Low Movement", "Inflammation", "Gut Health", "Skin Health", "Hair Health",
  "Uric Acid", "Hormonal Health", "Dental Health", "BOB", "LYL"];
const FILTER_SECTIONS = ["Client Source", "Client Status", "Client Temperature"];

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const Avatar = ({ name, color }) => (
  <div className="wa-idcell__avatar" style={{ background: color }}>{initials(name)}</div>
);
const Status = ({ s }) => <span className={"wa-status wa-status--" + s}>{STATUS_LABEL[s]}</span>;
const Rating = ({ r }) =>
  r == null
    ? <span className="wa-rating--none">—</span>
    : <span className="wa-rating"><i className="bi bi-star-fill"></i><span>{r.toFixed(1)}</span></span>;
const Cmos = ({ tag, more }) => (
  <span className="wa-cmos" title={more > 0 ? more + " more conditions" : tag}>
    <span className="wa-cmos__tag">{tag}</span>
    {more > 0 && <span className="wa-cmos__more">+{more}</span>}
  </span>
);

function FilterAcc({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="wa-facc">
      <button className="wa-facc__head" onClick={() => setOpen(!open)}>
        {title}<i className={"bi " + (open ? "bi-dash" : "bi-plus")}></i>
      </button>
      {open && <div className="wa-facc__body">{children}</div>}
    </div>
  );
}

function Th({ id, label, sort, onSort, sortable }) {
  if (!sortable) return <th>{label}</th>;
  const on = sort.key === id;
  return (
    <th className={"sortable" + (on ? " is-sorted" : "")} onClick={() => onSort(id)}
        aria-sort={on ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      {label}
      <i className={"bi sort-i " + (on ? (sort.dir === 1 ? "bi-caret-up-fill" : "bi-caret-down-fill") : "bi-chevron-expand")}></i>
    </th>
  );
}

export default function ClientLeads({ onOpenClient }) {
  const [tab, setTab] = useState("customers");
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState("all");
  const [sort, setSort] = useState({ key: "name", dir: 1 });
  const [drawer, setDrawer] = useState(false);
  const [tags, setTags] = useState({});

  const base = tab === "customers" ? customers : leads;
  const activeTags = Object.keys(tags).filter((t) => tags[t]).length;

  const rows = useMemo(() => {
    let r = base.filter((x) => {
      if (quick !== "all" && x.status !== quick) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(x.name.toLowerCase().includes(q) || x.email.toLowerCase().includes(q))) return false;
      }
      return true;
    });
    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      let av = a[key], bv = b[key];
      if (key === "rating") { av = av ?? -1; bv = bv ?? -1; return (av - bv) * dir; }
      return String(av).localeCompare(String(bv)) * dir;
    });
    return r;
  }, [base, quick, query, sort]);

  const onSort = (key) => setSort((s) => (s.key === key ? { key, dir: -s.dir } : { key, dir: 1 }));
  const toggleTag = (t) => setTags((s) => ({ ...s, [t]: !s[t] }));

  const QUICK = tab === "customers"
    ? [["all", "All"], ["active", "Active"], ["risk", "At-risk"]]
    : [["all", "All"], ["new", "New"]];

  return (
    <>
      <div className="wa-ltabs" role="tablist" aria-label="Lead and customer lists">
        {[["leads", "Leads"], ["customers", "Customers"]].map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id}
            className={"wa-ltab" + (tab === id ? " wa-ltab--active" : "")}
            onClick={() => { setTab(id); setQuick("all"); }}>{label}</button>
        ))}
      </div>

      <div className="wa-list__head">
        <div className="wa-list__count">
          <b>{String(rows.length).padStart(2, "0")}</b>{tab === "customers" ? "Customers" : "Leads"}
        </div>
      </div>

      <div className="wa-toolbar">
        <label className="wa-search">
          <i className="bi bi-search"></i>
          <input type="search" placeholder={"Search " + (tab === "customers" ? "customers" : "leads") + " by name or email…"}
            value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
        </label>
        <div className="wa-segment" role="group" aria-label="Quick status filter">
          {QUICK.map(([id, label]) => (
            <button key={id} className={quick === id ? "is-on" : ""} onClick={() => setQuick(id)}>{label}</button>
          ))}
        </div>
        <button className="wa-filterbtn" onClick={() => setDrawer(true)}>
          <i className="bi bi-sliders"></i>Filters{activeTags > 0 && <span className="n">{activeTags}</span>}
        </button>
      </div>

      {/* table (≥lg) */}
      <div className="wa-tblwrap wa-tblwrap--sticky d-none d-lg-block">
        <table className="wa-tbl">
          <thead>
            <tr>
              <Th id="name" label="Client" sort={sort} onSort={onSort} sortable />
              <th>Status</th>
              <Th id="program" label="Active Program" sort={sort} onSort={onSort} sortable />
              <th>CMOS</th>
              <Th id="rating" label="Coach Rating" sort={sort} onSort={onSort} sortable />
              <Th id="lastFu" label="Last Follow-up" sort={sort} onSort={onSort} sortable />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} tabIndex={0} onClick={() => onOpenClient(r.id)}
                  onKeyDown={(e) => { if (e.key === "Enter") onOpenClient(r.id); }}>
                <td>
                  <div className="wa-idcell">
                    <Avatar name={r.name} color={r.color} />
                    <div><div className="wa-idcell__nm">{r.name}</div><div className="wa-idcell__sub">{r.email}</div></div>
                  </div>
                </td>
                <td><Status s={r.status} /></td>
                <td><div className="wa-progcell__t">{r.program}</div>
                  {r.start !== "—" && <div className="wa-progcell__d">Started {r.start}</div>}</td>
                <td><Cmos tag={r.cmos} more={r.more} /></td>
                <td><Rating r={r.rating} /></td>
                <td>{r.lastFu}</td>
                <td><button className="wa-kebab" onClick={(e) => e.stopPropagation()} aria-label="Row actions"><i className="bi bi-three-dots-vertical"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="wa-panel-empty">No matches — try adjusting search or filters.</div>}
      </div>

      {/* cards (<lg) */}
      <div className="d-lg-none">
        {rows.map((r) => (
          <div className="wa-dcard" key={r.id} tabIndex={0} onClick={() => onOpenClient(r.id)}
               onKeyDown={(e) => { if (e.key === "Enter") onOpenClient(r.id); }}>
            <div className="wa-dcard__top">
              <Avatar name={r.name} color={r.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="wa-idcell__nm">{r.name}</div>
                <div className="wa-idcell__sub">{r.email}</div>
              </div>
              <Status s={r.status} />
            </div>
            <div className="wa-dcard__grid">
              <div><div className="wa-dcard__k">Active Program</div><div className="wa-dcard__v">{r.program}</div></div>
              <div><div className="wa-dcard__k">CMOS</div><div className="wa-dcard__v"><Cmos tag={r.cmos} more={r.more} /></div></div>
              <div><div className="wa-dcard__k">Coach Rating</div><div className="wa-dcard__v"><Rating r={r.rating} /></div></div>
              <div><div className="wa-dcard__k">Last Follow-up</div><div className="wa-dcard__v">{r.lastFu}</div></div>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="wa-panel-empty">No matches — try adjusting search or filters.</div>}
      </div>

      <div className="wa-pager">
        <button disabled><i className="bi bi-arrow-left"></i> Previous</button>
        <span className="wa-pager__n">1</span>
        <button>Next <i className="bi bi-arrow-right"></i></button>
      </div>

      {/* filters drawer */}
      <div className={"wa-drawer" + (drawer ? " is-open" : "")}>
        <div className="wa-drawer__head">
          <h3>Filters</h3>
          <button className="wa-drawer__close" onClick={() => setDrawer(false)} aria-label="Close filters"><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="wa-drawer__body">
          {FILTER_SECTIONS.map((s) => (
            <FilterAcc key={s} title={s}>
              <label className="wa-check"><input type="checkbox" /> Option A</label>
              <label className="wa-check"><input type="checkbox" /> Option B</label>
            </FilterAcc>
          ))}
          <FilterAcc title="Tags" defaultOpen>
            {TAGS.map((t) => (
              <label className="wa-check" key={t}>
                <input type="checkbox" checked={!!tags[t]} onChange={() => toggleTag(t)} /> {t}
              </label>
            ))}
          </FilterAcc>
          <FilterAcc title="Demographics">
            <label className="wa-check"><input type="checkbox" /> Age range</label>
            <label className="wa-check"><input type="checkbox" /> Gender</label>
          </FilterAcc>
        </div>
        <div className="wa-drawer__foot">
          <button className="wa-editbtn wa-editbtn--ghost" onClick={() => setTags({})}>Clear all</button>
          <button className="wa-editbtn wa-editbtn--save" onClick={() => setDrawer(false)}>
            Show {rows.length} result{rows.length === 1 ? "" : "s"}
          </button>
        </div>
      </div>
      {drawer && <div className="wa-backdrop" onClick={() => setDrawer(false)}></div>}
    </>
  );
}
