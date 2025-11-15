import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
import { Navigate } from 'react-router-dom';

import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, apikey } from '../../utils/constants';
import {
  getItems,
  deleteItem,
  addItem,
  getUser,
  updateUser,
  loginUser,
  createUser,
  likeItem,
  unlikeItem,
} from '../../utils/api';

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
    deleteItem(itemId)
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
    return addItem(inputValues)
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
    return updateUser({ name, avatar })
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

  const handleLogin = async (values) => {
    try {
      const data = await loginUser(values);
      localStorage.setItem('jwt', data.token);
      const user = await getUser();
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
      await createUser(values);
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
    navigate('/');
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return Promise.reject('You muse be logged in to like items');
    }

    const action = isLiked ? unlikeItem(id) : likeItem(id);

    return action
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === updatedCard._id ? updatedCard : item))
      );
    })
      .catch(console.error);
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
    getWeather(coordinates, apikey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getUser()
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
              currentUser={currentUser}
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
                    handleProfileClick={() => setActiveModal('profile-data')}
                    handleLogout={handleLogout}
                    currentUser={currentUser}
                    onCardLike={handleCardLike}
                  />
                  ) : (
                    <Navigate to='/' replace />
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
              <label className="profile__modal">Name</label>
              <div className="profile__name-container">
                <input
                  value={name}
                  onChange={handleNameChange}
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="profile__input"
                />
              </div>
              <label className="profile__modal">Avatar URL</label>
              <div className="profile__avatar-container">
                <input
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
