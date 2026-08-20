import { useEffect, useState } from "react";
import "./Navigation.css";

function Navigation({ onSignInClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  function handleHomeClick() {
    handleMenuClose();
  }

  function handleSignInClick() {
    handleMenuClose();
    onSignInClick();
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`navigation ${isMenuOpen ? "navigation_menu_open" : ""}`}
      aria-label="Main navigation"
    >
      {isMenuOpen && (
        <button
          className="navigation__overlay"
          type="button"
          aria-label="Close navigation menu"
          onClick={handleMenuClose}
        />
      )}
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

        <button
          className="navigation__signin-button"
          type="button"
          onClick={handleSignInClick}
        >
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
