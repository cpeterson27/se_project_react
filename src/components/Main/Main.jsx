import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleDeleteRequest,
  closeActiveModal,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const userContext = useContext(CurrentUserContext);
  const currentUser = userContext?.currentUser;

  return (
    <main className="main">
      <p className="welcome">Welcome, {currentUser?.name || "user"}!</p>

      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onDeleteRequest={handleDeleteRequest}
                onClose={closeActiveModal}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;


