import React from "react";

const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="forecast">
      <h2>5 dagars prognos</h2>
      <div className="forecast-cards">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <h4>
              {new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </h4>
            <p>Min: {day.temp_min}°C | Max: {day.temp_max}°C</p>
            <p>Humidity: {day.humidity}%</p>
            <p>{day.description}</p>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${day.icon}.png`}
              alt={day.description}
              className="weather-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
