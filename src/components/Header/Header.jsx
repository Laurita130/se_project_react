import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
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
      <button
        type="button"
        className="header__add-clothes-btn"
        onClick={handleAddClick}
      >
        {" "}
        + Add clothes
      </button>
      <NavLink to="/profile" className="header__nav-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
      </div>
    </header>
  );
}
export default Header;
