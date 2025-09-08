import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, handleNavClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="App Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <button onClick={handleNavClick} className="header__nav-menu">
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>

      <div className="header__line"></div>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>

      <div className="profile-text">
        <p className="profile-data">Change profile data</p>
        <p className="log-out">Log out</p>
      </div>

      <div className="header__line"></div>

      <div className="text-button__mobile">
        <p className="your-items__mobile">Your Items</p>
        <button
          className="add-new__mobile"
          onClick={handleAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>
    </header>
  );
}

export default Header;
