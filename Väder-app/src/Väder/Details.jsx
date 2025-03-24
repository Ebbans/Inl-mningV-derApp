import React from 'react';

const Details = ({ weather}) => {
    return (
        
      <div className="detail-container">
        {weather && (
          <>
            <h2>Weather Details for {weather.city}</h2>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Description: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Sunrise: {weather.sunrise}</p> 
            <p>Sunset: {weather.sunset}</p>  
          </>
          
        )}
      </div>
    );
  };
  
export default Details;
