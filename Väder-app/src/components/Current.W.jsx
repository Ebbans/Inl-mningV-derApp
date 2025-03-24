import React from "react";

const CurrentWeather = ({ weather, city, lastUpdated, addFavorite, favorites }) => {
  if (!weather) return null;

  return (
    <div className="current-weather">
      <h3 className="current-temperature">
        {weather.temperature}°C
        <img
          src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
          alt={weather.description}
          className="weather-icon"
        />
      </h3>
      <p className="weather-description">{weather.description}</p>
      <p className="weather-humidity">Humidity: {weather.humidity}%</p>
      <p className="weather-min-max">
        Min: {weather.temp_min}°C | Max: {weather.temp_max}°C
      </p>
      <p className="weather-sunrise-sunset">
        Sunrise: {weather.sunrise} | Sunset: {weather.sunset}
      </p>
      <p className="weather-last-updated">Last updated: {lastUpdated}</p>
      <button
        className="add-favorite-btn"
        onClick={() => addFavorite(city)}
        disabled={favorites.includes(city)}
      >
        {favorites.includes(city) ? "Favorit" : "Lägg till Favorit"}
      </button>
    </div>
  );
};

export default CurrentWeather;
