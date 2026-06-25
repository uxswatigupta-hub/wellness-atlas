import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-content">
            <h2>Wellness Atlas Participating Communities</h2>

            <p>
              Wellness Atlas powers wellness communities whose members believe
              that prevention is better than cure and who like to be actively
              engaged in the quest to improve their wellness quotient by
              following time-tested principles of well being.
            </p>
          </div>

          <div className="footer-logos">
            <img src="/images/wq.png" alt="WQ" />
            <img src="/images/gfc.png" alt="GFC" />
            <img src="/images/warriors.png" alt="Warriors" />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/">terms of use</a>
            <span>|</span>
            <a href="/">privacy policy</a>
            <span>|</span>
            <a href="/">about us</a>
            <span>|</span>
            <a href="/">reach us</a>
          </div>

          <div className="footer-contact">
            Helpline +91-82176-08659, support@thewellnessatlas.com
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;