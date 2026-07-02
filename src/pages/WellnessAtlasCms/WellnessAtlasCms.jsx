/* =========================================================================
   WellnessAtlasCms — shell + routing between list / detail / profile
   Path: src/pages/WellnessAtlasCms/WellnessAtlasCms.jsx
   Render this from your router, e.g. <Route path="/customers" element={<WellnessAtlasCms/>} />
   ========================================================================= */
import React, { useState } from "react";
import AppBar from "./Components/AppBar";
import Sidebar from "./Components/Sidebar";
import { navGroups, client } from "./Components/data";
import ClientLeads from "./Pages/ClientLeads/ClientLeads";
import CustomerDetail from "./Pages/CustomerDetail/CustomerDetail";
import ClientProfile from "./Pages/CustomerDetail/ClientProfile";
import FollowupForm from "./Pages/FollowupForm/FollowupForm";
import { useNavigate, Navigate } from "react-router-dom";

// design system (Bootstrap + icons must be loaded once at app level — see README)
import "./Styles/wellness-atlas.css";
import "./Styles/App.css";

function Breadcrumb({ items }) {
  return (
    <nav className="wa-crumb" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <i className="bi bi-chevron-right wa-crumb__sep"></i>
          )}

          {it.onClick && i < items.length - 1 ? (
            <button
              type="button"
              className="tt-link"
              onClick={it.onClick}
            >
              {it.label}
            </button>
          ) : (
            <span
              className={i === items.length - 1 ? "wa-crumb__cur" : ""}
              aria-current={i === items.length - 1 ? "page" : undefined}
            >
              {it.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default function WellnessAtlasCms() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");      // "list" | "detail" | "profile"
  const [nav, setNav] = useState("customers");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const authed = localStorage.getItem("wa-authed") === "1";

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  // Client-facing form. In this self-contained build it opens via #followup so
  // the coach's "Copy link" works without a router. If you use react-router,
  // delete this block and add: <Route path="/f/:token" element={<FollowupForm/>} />
  if (hash === "#followup") return <FollowupForm />;

  const logout = () => {
    try {
      localStorage.removeItem("wa-authed");
    } catch (e) { }

    setMenuOpen(false);
    navigate("/login");
  };

  const onNavigate = (id) => {
    setMenuOpen(false);
    if (id === "logout") { logout(); return; }
    if (id === "profile") { setNav("profile"); setView("profile"); }
    else if (id === "customers") { setNav("customers"); setView("list"); }
    else { setNav(id); }
  };

  const openClient = () => { setNav("customers"); setView("detail"); };
  const backToList = () => { setNav("customers"); setView("list"); };
  const openProfile = () => { setNav("customers"); setView("profile"); };

  const title = view === "list" ? "Customers"
    : view === "profile" ? (nav === "profile" ? "Client Profile" : "Client Tracking")
      : "Customer Details";

  // breadcrumb trail reflecting the current page
  const navLabel = (id) => {
    for (const g of navGroups) { const m = g.items.find((x) => x.id === id); if (m) return m.label; }
    return "Dashboard";
  };
  let crumbs;
  if (nav === "profile") {
    crumbs = [{ label: "Home", onClick: () => onNavigate("dashboard") }, { label: "My Profile" }];
  } else if (nav !== "customers") {
    crumbs = [{ label: "Home", onClick: () => onNavigate("dashboard") }, { label: navLabel(nav) }];
  } else if (view === "list") {
    crumbs = [{ label: "Home", onClick: () => onNavigate("dashboard") }, { label: "Customers / Leads" }];
  } else if (view === "detail") {
    crumbs = [{ label: "Customers / Leads", onClick: backToList }, { label: client.name, onClick: openClient }, { label: "Customer Details" }];
  } else {
    crumbs = [{ label: "Customers / Leads", onClick: backToList }, { label: client.name, onClick: openClient }, { label: "Profile" }];
  }

  return (
    <div className="wa-page">
      <div className="wa-app">
        <AppBar title={title} onBurger={() => setMenuOpen(true)} />
        <div className="wa-body">
          <Sidebar active={nav} onNavigate={onNavigate}
            open={menuOpen} onClose={() => setMenuOpen(false)} isLeader={true} />
          <main className="wa-content">
            <Breadcrumb items={crumbs} />
            {view === "list" && <ClientLeads onOpenClient={openClient} />}
            {view === "detail" && <CustomerDetail onOpenProfile={openProfile} onBack={backToList} />}
            {view === "profile" && <ClientProfile onBack={backToList} />}
          </main>
        </div>
      </div>
    </div>
  );


}

