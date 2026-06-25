import { useState } from "react";
import logoImg from '../../assets/WellnessAtlas_Logo1.png';
import "./navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <header className="site-header">

                <nav className="desktop-nav nav-left">
                    <a href="/">home</a>
                    <a href="/">philosophy</a>
                    <a href="/">people</a>
                    <a href="/">offerings</a>
                    <a href="/">events</a>
                    <a href="/">testimonials</a>
                </nav>

                <div className="logo">
                    <img
                        src={logoImg}
                        alt="Wellness Atlas"
                    />
                </div>

                <nav className="desktop-nav nav-right">
                    <a href="/">learn</a>
                    <a href="/">schooloflife</a>
                    <a href="/">weshare</a>
                    <a href="/">health2.0</a>
                    <a href="/">community.inc</a>
                    <a href="/">join</a>
                </nav>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </header>

            {menuOpen && (
                <div className="mobile-menu">

                    <a href="/">home</a>
                    <a href="/">philosophy</a>
                    <a href="/">people</a>
                    <a href="/">offerings</a>
                    <a href="/">events</a>
                    <a href="/">testimonials</a>

                    <hr />

                    <a href="/">learn</a>
                    <a href="/">schooloflife</a>
                    <a href="/">weshare</a>
                    <a href="/">health2.0</a>
                    <a href="/">community.inc</a>
                    <a href="/">join</a>

                </div>
            )}
        </nav> 
    );
}

export default Navbar;