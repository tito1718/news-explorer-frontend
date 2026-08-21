import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import "./Header.css";

function Header({ onSignInClick, onSignOutClick, isLoggedIn, userName }) {
  return (
    <header className="header">
      <Navigation
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      <div className="header__content">
        <h1 className="header__title">What&apos;s going on in the world?</h1>

        <p className="header__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>

        <SearchForm />
      </div>
    </header>
  );
}

export default Header;
