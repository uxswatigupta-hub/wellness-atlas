/* =========================================================================
   Sidebar — grouped left navigation (rail ≥lg, off-canvas drawer <lg)
   Path: src/pages/WellnessAtlasCms/Components/Sidebar.jsx
   ========================================================================= */
import React from "react";
import { navGroups, navAccount } from "./data";

export default function Sidebar({ active, onNavigate, open, onClose, isLeader = true }) {
  const renderItem = (it) => {
    if (it.leaderOnly && !isLeader) return null;
    const cls = "wa-side__item" + (active === it.id ? " wa-side__item--active" : "");
    return (
      <div key={it.id} className={cls} onClick={() => onNavigate(it.id)}>
        <i className={"bi " + it.icon}></i><span>{it.label}</span>
      </div>
    );
  };
  return (
    <>
      <nav className={"wa-side" + (open ? " is-open" : "")} onClick={onClose}>
        {navGroups.map((g) => (
          <div className="wa-side__group" key={g.label}>
            <div className="wa-side__glabel">{g.label}</div>
            {g.items.map(renderItem)}
          </div>
        ))}
        <div className="wa-side__group wa-side__group--account">
          <div className="wa-side__glabel">{navAccount.label}</div>
          {navAccount.items.map(renderItem)}
        </div>
      </nav>
      {open && <div className="wa-backdrop d-lg-none" onClick={onClose}></div>}
    </>
  );
}
