import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  // Try to find a match in weatherOptions
  const filteredOptions = weatherOptions.filter(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
  );

  let weatherOption;

  if (filteredOptions.length > 0) {
    weatherOption = filteredOptions[0];
  } else {
    // fallback lookup from defaultWeatherOptions
    const conditionKey = weatherData.condition || "clear";
    const fallback = defaultWeatherOptions[conditionKey];

    weatherOption = {
      day: weatherData.isDay,
      condition: conditionKey,
      url: fallback
        ? fallback[weatherData.isDay ? "day" : "night"]
        : defaultWeatherOptions.clear.day, // safe fallback
    };
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
