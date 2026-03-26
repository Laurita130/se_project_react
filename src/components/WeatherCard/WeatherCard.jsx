import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData?.isDay &&
      option.condition === weatherData?.condition
    );
  });

  const weatherOptionUrl =
    filteredOptions[0]?.url ||
    defaultWeatherOptions[weatherData.isDay ? "day" : "night"].url;

  return (
    <section className="weather-card">
      <div className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </div>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${weatherData?.isDay ? "day" : "night"} time ${
          weatherData?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
