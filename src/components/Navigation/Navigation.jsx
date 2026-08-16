import { useState } from "react";
import "./Navigation.css";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleHomeClick() {
    setIsMenuOpen(false);
  }

  return (
    <nav
      className={`navigation ${isMenuOpen ? "navigation_menu_open" : ""}`}
      aria-label="Main navigation"
    >
      <a className="navigation__logo" href="/">
        NewsExplorer
      </a>

      <div className="navigation__links">
        <a
          className="navigation__link navigation__link_active"
          href="/"
          aria-current="page"
          onClick={handleHomeClick}
        >
          Home
        </a>

        <button className="navigation__signin-button" type="button">
          Sign in
        </button>
      </div>

      <button
        className="navigation__menu-button"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      >
        <span className="navigation__menu-line" />
        <span className="navigation__menu-line" />
      </button>
    </nav>
  );
}

export default Navigation;
