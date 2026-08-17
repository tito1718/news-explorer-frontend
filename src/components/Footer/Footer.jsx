import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} Cesar &quot;Tito&quot; Chirino, Powered by News API
      </p>

      <div className="footer__content">
        <nav className="footer__links" aria-label="Footer navigation">
          <a className="footer__link" href="/">
            Home
          </a>

          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
        </nav>

        <div className="footer__social">
          <a
            className="footer__social-link"
            href="https://github.com/tito1718"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Cesar Chirino's GitHub profile"
          >
            <img className="footer__icon" src={githubIcon} alt="" />
          </a>

          <a
            className="footer__social-link"
            href="https://www.linkedin.com/in/cesar-tito-chirino/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Cesar Chirino's LinkedIn profile"
          >
            <img className="footer__icon" src={linkedinIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
