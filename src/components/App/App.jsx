import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, deleteItem } from "../../utils/api.js";
import { useCallback } from "react";
import DeleteConfirmationModal from "../DeleteConfirmation/DeleteConfirmation.jsx";
import NavModal from "../NavModal/NavModal.jsx";
import { addItem, getUser, updateUser } from "../../utils/api.js";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "Loading...", C: "Loading..." },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);
  const [email, setEmail] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNavClick = () => {
    setShowNavModal(true);
  };

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        setShowDeleteModal(false);
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleProfileClick = () => {
    setActiveModal("profile-data");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
   const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onAddItem = (inputValues) => {
    return addItem(inputValues)
      .then((newCardData) => {
        setClothingItems([newCardData, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        if (showDeleteModal) {
          setShowDeleteModal(false);
        } else if (activeModal === "preview") {
          setActiveModal("");
        }
        if (showNavModal) {
          setShowNavModal(false);
        } else if (activeModal === "add-garment") {
          setActiveModal("");
        }
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, showDeleteModal, showNavModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Fetching user data...");
    getUser()
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar)
      })
      .catch(console.error);
  }, []);

  const handleonSave = (evt) => {
    evt.preventDefault();
    return updateUser(name, email, avatar)
      .then((data) => {
        setSuccessfulMessage("Saved!");
        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar)
        setTimeout(() => {
          closeActiveModal();
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to save", err);
        setErrorMessage("Failed to save");
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleNavClick={handleNavClick}
            name={name}
            avatar={avatar}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  closeActiveModal={closeActiveModal}
                  handleDeleteItem={handleDeleteItem}
                  itemToDelete={itemToDelete}
                  handleDeleteRequest={handleDeleteRequest}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleProfileClick={handleProfileClick}
                  name={name}
                  avatar={avatar}
                />
              }
            />
          </Routes>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            handleDeleteRequest={handleDeleteRequest}
            activeModal={activeModal}
            card={selectedCard}
            onClose={() => setActiveModal("")}
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
            isOpen={activeModal === "profile-data"}
            onClose={closeActiveModal}
            buttonText="Save"
            successfulMessage={successfulMessage}
            handleonSave={handleonSave}
            email={email}
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
            <label className="profile__address">Email</label>
            <input
              value={email}
              onChange={handleEmailChange}
              required
              type="email"
              name="email"
              placeholder="Email address"
              className="profile__email"
            />
          </ProfileModal>
          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
