// Navbar.jsx — reusable site navigation (Wellness Atlas)
// Responsive: full bar on desktop, hamburger collapse on mobile.
// Requires: react-bootstrap + bootstrap installed
//   npm install react-bootstrap bootstrap
//
// Usage on any page:
//   import SiteNav from "./Navbar";
//   <SiteNav />
import { Navbar, Container, Button } from "react-bootstrap";
//import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/wellness-atlas.css";
import logoImg from "../../assets/logo/WellnessAtlas_Logo1.png";

// Single source of truth for the menu structure.
// Edit here and it updates on every page.
/*const MENUS = {
  About: ["Philosophy", "People", "Testimonials"],
  Wellness: ["Offerings", "Challenges", "Events"],
  Learn: ["School of Life", "WeShare", "Health 2.0"],
  Community: ["Community.Inc", "Join"],
};

// Optional: map each item label to a real route.
const LINKS = {
  Philosophy: "/about/philosophy",
  People: "/about/people",
  Testimonials: "/about/testimonials",
  Offerings: "/wellness/offerings",
  Challenges: "/wellness/challenges",
  Events: "/wellness/events",
  "School of Life": "/learn/school-of-life",
  WeShare: "/learn/weshare",
  "Health 2.0": "/learn/health-2-0",
  "Community.Inc": "/community/inc",
  Join: "/community/join",
};*/

export default function SiteNav() {
  return (
    <Navbar expand="lg" className="wa-nav" collapseOnSelect sticky="top">
      <Container fluid className="px-lg-4 px-3">
        {/* Left: logo */}
        <div className="tt-container d-flex align-items-center justify-content-between w-100" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <a href="/" className="tt-brand" style={{ gap: ".7rem" }}>
            <img src={logoImg} alt="Wellness Atlas" className="tt-brand-logo" />
            {/*<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: "var(--ink)" }}>Wellness Atlas</span>*/}
          </a>
          <div className="d-flex align-items-center">
            <Button href="/login" className="wa-login">
              LOGIN
            </Button>
          </div>
        </div>

        {/* Hamburger — auto-shows below the `lg` breakpoint */}
         {/*<Navbar.Toggle aria-controls="wa-navbar" />

        <Navbar.Collapse id="wa-navbar" className="justify-content-end">
          {/* Center: categorized links */}
          {/*
          <Nav className="mx-auto align-items-lg-center gap-lg-4">
            <Nav.Link href="/">Home</Nav.Link>

            {Object.entries(MENUS).map(([label, items]) => (
              <NavDropdown title={label} id={`nd-${label}`} key={label}>
                {items.map((item) => (
                  <NavDropdown.Item href={LINKS[item] || "#"} key={item}>
                    {item}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </Nav>*/}

          {/* Right: login */}
          {/*<Button href="/login" className="wa-login ms-lg-3 mt-3 mt-lg-0">
            LOGIN
          </Button>
        </Navbar.Collapse>*/}
      </Container>
    </Navbar>
  );
}
