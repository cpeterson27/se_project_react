import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import defaultAvatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

function Header({
  weatherData,
  handleNavClick,
  handleAddClick,
  currentUser,
  onLogin,
  onRegister,
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const handleLogin = (values) => {
    onLogin(values);
  };

  const handleRegister = (values) => {
    onRegister(values);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

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

      <ToggleSwitch />

      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__user-info">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={currentUser.avatar || defaultAvatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__add-clothes-btn"
          >
            Sign Up
          </button>

          <button
            onClick={handleLoginClick}
            type="button"
            className="header__add-clothes-btn"
          >
            Log in
          </button>

          <img
            src={defaultAvatar}
            alt="Default avatar"
            className="header__avatar"
          />
        </>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onLogin={handleLogin}
        onClose={closeLoginModal}
        buttonText="Log In"
        openRegisterModal={setIsRegisterModalOpen}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onSubmit={handleRegister}
        onClose={closeRegisterModal}
        buttonText="Next"
        openLoginModal={setIsLoginModalOpen}
      />
    </header>
  );
}

export default Header;
