import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption =
      defaultWeatherOptions[weatherData.condition]?.[
        weatherData.isDay ? "day" : "night"
      ];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      {weatherOption && weatherOption.url && (
        <img
          src={weatherOption.url}
          alt={`Card showing ${weatherData.isDay ? "day" : "night"} time ${
            weatherData.condition
          } weather`}
          className="weather-card__image"
        />
      )}
    </section>
  );
};

export default WeatherCard;
