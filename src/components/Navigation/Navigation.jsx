import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logoutIcon from "../../assets/logout.svg";
import logoutWhiteIcon from "../../assets/logout-white.svg";
import "./Navigation.css";

function Navigation({
  onSignInClick,
  onSignOutClick,
  isLoggedIn = false,
  userName = "Elise",
  theme = "dark",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  function handleHomeClick() {
    handleMenuClose();
  }

  function handleSignInClick() {
    handleMenuClose();

    if (onSignInClick) {
      onSignInClick();
    }
  }

  function handleSignOutClick() {
    handleMenuClose();

    if (onSignOutClick) {
      onSignOutClick();
    }
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
      className={`navigation ${
        isLoggedIn ? "navigation_logged_in" : ""
      } navigation_theme_${theme} ${
        isMenuOpen ? "navigation_menu_open" : ""
      }`.trim()}
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
      <Link className="navigation__logo" to="/" onClick={handleHomeClick}>
        NewsExplorer
      </Link>

      <div className="navigation__links">
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${
              isActive ? "navigation__link_active" : ""
            }`.trim()
          }
          to="/"
          end
          onClick={handleHomeClick}
        >
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              `navigation__link ${
                isActive ? "navigation__link_active" : ""
              }`.trim()
            }
            to="/saved-news"
            onClick={handleMenuClose}
          >
            Saved articles
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            className="navigation__user-button"
            type="button"
            aria-label={`Sign out ${userName}`}
            onClick={handleSignOutClick}
          >
            <span>{userName}</span>
            <img
              className="navigation__logout-icon"
              src={theme === "light" ? logoutIcon : logoutWhiteIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            className="navigation__signin-button"
            type="button"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        )}
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
