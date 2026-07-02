/* =========================================================================
   AppBar — top banner (logo + dynamic title + hamburger)
   Path: src/pages/WellnessAtlasCms/Components/AppBar.jsx
   ========================================================================= */
import React from "react";
import logoImg from "../../../assets/logo/WellnessAtlas_Logo1.png";

export default function AppBar({ title, onBurger }) {
  return (
    <header className="wa-appbar">
      <div className="wa-logo">
        <a href="/" className="tt-brand" style={{ gap: ".7rem" }}>
          <img src={logoImg} alt="Wellness Atlas" className="tt-brand-logo" />
        </a>
      </div>
      <div className="wa-appbar__title"><h1>{title}</h1></div>
      <button className="wa-burger d-lg-none" onClick={onBurger} aria-label="Open menu">
        <i className="bi bi-list"></i>
      </button>
    </header>
  );
}
