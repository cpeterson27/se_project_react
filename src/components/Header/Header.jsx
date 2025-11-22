import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import defaultAvatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({ weatherData, handleNavClick, handleAddClick, onLogin, onRegister }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  // ----- Modal Handlers -----
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  // ----- Form Handlers -----
  const handleLogin = async (values) => {
    try {
      await onLogin(values);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const handleRegister = async (values) => {
    try {
      await onRegister(values);
      closeRegisterModal();
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
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
            onClick={openRegisterModal}
            type="button"
            className="header__add-clothes-btn"
          >
            Sign Up
          </button>

          <button
            onClick={openLoginModal}
            type="button"
            className="header__add-clothes-btn"
          >
            Log In
          </button>
        </>
      )}

      {/* ----- Modals ----- */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onLogin={handleLogin}
        onClose={closeLoginModal}
        buttonText="Log In"
        openRegisterModal={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onSubmit={handleRegister}
        onClose={closeRegisterModal}
        buttonText="Next"
        openLoginModal={openLoginModal}
      />
    </header>
  );
}

export default Header;

