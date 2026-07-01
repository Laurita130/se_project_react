import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";
  const currentDate = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
  });
  return (
    <header className="header">
      <NavLink to="/" className="header__nav-link">
        <img src={logo} alt="Logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate},{weatherData.city}
        </p>
      </NavLink>
      <div className="header__navigation">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>

            <NavLink to="/profile" className="header__nav-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name || ""}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__signup-btn"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__login-btn"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
