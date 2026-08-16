import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <a className="navigation__logo" href="/">
        NewsExplorer
      </a>

      <div className="navigation__links">
        <a
          className="navigation__link navigation__link_active"
          href="/"
          aria-current="page"
        >
          Home
        </a>

        <button className="navigation__signin-button" type="button">
          Sign in
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
