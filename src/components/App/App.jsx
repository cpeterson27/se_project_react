import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import DeleteConfirmationModal from '../DeleteConfirmation/DeleteConfirmation';
import NavModal from '../NavModal/NavModal';
import ProfileModal from '../ProfileModal/ProfileModal';
import Profile from '../Profile/Profile';

import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { location, apiKey } from '../../utils/constants';
import {
  getItemList,
  removeItem,
  addItem,
  addCardLike,
  removeCardLike,
} from '../../utils/api';
import { register, login, checkToken, updateUser } from '../../utils/auth';

import { TailSpin } from 'react-loader-spinner';

import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.jsx';

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 'Loading...', C: 'Loading...' },
    city: '',
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [successfulMessage, setSuccessfulMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavClick = () => {
    setShowNavModal(true);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal('preview');
  };

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteItem = (itemId) => {
    const token = localStorage.getItem('jwt');
    removeItem(itemId, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        setShowDeleteModal(false);
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === 'F' ? 'C' : 'F'));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem('jwt');
    return addItem(inputValues, token)
      .then((newCardData) => {
        setClothingItems((prev) => [newCardData, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal('');
  }, []);

  const handleOnSave = (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem('jwt');
    return updateUser(name, avatar, token)
      .then((data) => {
        setSuccessfulMessage('Saved!');
        setName(data.name);
        setAvatar(data.avatar);
        setCurrentUser(data);
        setTimeout(() => {
          closeActiveModal();
          setSuccessfulMessage('');
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to save', err);
        setErrorMessage('Failed to save');
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return Promise.reject('You must be logged in to like items');
    }

    const action = isLiked ? removeCardLike(id, token) : addCardLike(id, token);

    return action
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch(console.error);
  };

  const handleLogin = async (values) => {
    try {
      const data = await login(values.email, values.password);
      localStorage.setItem('jwt', data.token);
      const user = await checkToken(data.token);
      setCurrentUser(user);
      setName(user.name);
      setAvatar(user.avatar);
      setIsLoggedIn(true);
      navigate('/');
      return data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  const handleRegister = async (values) => {
    try {
      await register(values.name, values.avatar, values.email, values.password);
      await handleLogin({ email: values.email, password: values.password });
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setName('');
    setAvatar('');
    setSuccessfulMessage('');
    setErrorMessage('');
    setClothingItems([]);
    navigate('/');
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteModal) {
          setShowDeleteModal(false);
        } else if (activeModal === 'preview') {
          setActiveModal('');
        }
        if (showNavModal) {
          setShowNavModal(false);
        } else if (activeModal === 'add-garment') {
          setActiveModal('');
        }
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [activeModal, showDeleteModal, showNavModal]);

  useEffect(() => {
    getWeather(location, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getItemList()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setName(userData.name);
          setAvatar(userData.avatar);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
        });
    }
  }, []);

  // **Early return for full‑page loading spinner**
  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 9999,
        }}
      >
        <TailSpin
          height={80}
          width={80}
          color="#333"
          ariaLabel="tail-spin-loading"
          visible={true}
        />
      </div>
    );
  }

  // Normal app UI
  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleNavClick={handleNavClick}
              onLogin={handleLogin}
              onRegister={handleRegister}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteRequest={handleDeleteRequest}
                    closeActiveModal={closeActiveModal}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleProfileClick={() =>
                        setActiveModal('profile-data')
                      }
                      handleLogout={handleLogout}
                      onCardLike={handleCardLike}
                      currentUser={currentUser}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === 'add-garment'}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              isOpen={activeModal === 'preview'}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteRequest={handleDeleteRequest}
            />
            <DeleteConfirmationModal
              isOpen={showDeleteModal}
              itemName={itemToDelete?.name}
              onConfirm={() => handleDeleteItem(itemToDelete._id)}
              onClose={() => setShowDeleteModal(false)}
            />
            <NavModal
              isOpen={showNavModal}
              onClose={() => setShowNavModal(false)}
              name={name}
              handleAddClick={handleAddClick}
              avatar={avatar}
            />
            <ProfileModal
              title="Edit Profile"
              name={name}
              isOpen={activeModal === 'profile-data'}
              onClose={closeActiveModal}
              buttonText="Save"
              successfulMessage={successfulMessage}
              handleOnSave={handleOnSave}
              errorMessage={errorMessage}
            >
              <label className="profile__modal" htmlFor="profile-name">
                Name
              </label>
              <div className="profile__name-container">
                <input
                  id="profile-name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="profile__input"
                />
              </div>
              <label className="profile__modal" htmlFor="profile-avatar">
                Avatar URL
              </label>
              <div className="profile__avatar-container">
                <input
                  id="profile-avatar"
                  value={avatar}
                  onChange={handleAvatarChange}
                  required
                  type="url"
                  name="avatar"
                  placeholder="Avatar URL"
                  className="profile__input"
                />
              </div>
            </ProfileModal>

            <Footer />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

