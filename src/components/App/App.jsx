import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  defaultClothingItems,
  coordinates,
  APIkey,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, deleteItem } from "../../utils/api.js";
import { useCallback } from 'react';



const baseUrl = "http://localhost:3001";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "Loading..." },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

const handleDeleteItem = (id) => {
  deleteItem(id)
  .then(() => {
    setClothingItems(items => items.filter(item => item._id !== id))
  })
  .catch(console.error);
};

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    return fetch(`${baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weather,
    })
  })
      .then((res) => {
        if (!res.ok) {
        return  Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
.then((newCardData) => {
    setClothingItems([...clothingItems, newCardData]);
    closeActiveModal();
    })
    .catch(console.error);
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  useEffect(() => {
    if (!activeModal) return; 
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, closeActiveModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }
  , []);

   useEffect(() => {
   getItems()
   .then ((data) => {
    console.log(data);
    setClothingItems(data);
   })
   .catch(console.error);
   }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
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
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            deleteItem={handleDeleteItem}
          />
          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
