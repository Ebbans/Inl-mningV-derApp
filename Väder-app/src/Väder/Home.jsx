import React, { useState, useEffect } from 'react';
import Favorites from '../components/Favorites';
import Header from '../components/Header';
import Search from '../components/Search'; 
import fetchWeatherData from '../Service/Väder.Service';
import CurrentWeather from "../components/Current.W";
import Forecast from "../components/Forecast";
import '../styles/Väder.css';


const Home = () => {
  const [city, setCity] = useState('Stockholm');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);



  
  const handleFavoriteClick = (location) => {
    setCity(location);
    reorderFavorites(location);
  };

  
  const addFavorite = (location) => {
    if (!favorites.includes(location)) {
      const updatedFavorites = [location, ...favorites];  
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Remove city from favorites and update localStorage
  const removeFavorite = (location) => {
    const updatedFavorites = favorites.filter(fav => fav !== location);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Reorder favorites by moving the selected location to the top
  const reorderFavorites = (location) => {
    const updatedFavorites = [location, ...favorites.filter(fav => fav !== location)];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Fetch data when the city changes
  useEffect(() => {
    const fetchData = async () => {
      if (!city.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(city);
        if (data) {
          setWeather(data.current);
          setForecast(data.forecast);
          setLastUpdated(data.lastUpdated);
        } else {
          setError('Failed to fetch weather data');
        }
      } catch (err) {
        setError('API request failed: ' + err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [city]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
            
    <div className="home-container">
      <Header />
      <div className="head">
        <Search value={city} onChange={(e) => setCity(e.target.value)} />
        <h2 className="city-names">{city}</h2>

      </div>
      <div className="favorites">
        <h3>Favoriter</h3>
        <Favorites
          favorites={favorites}
          onFavoriteClick={handleFavoriteClick}
          removeFavorite={removeFavorite}
        />
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

    
    {weather && (
      <CurrentWeather
      weather={weather}
      city={city}
      lastUpdated={lastUpdated}
      addFavorite={addFavorite}
      favorites={favorites}
    />
)}

{forecast.length > 0 && <Forecast forecast={forecast} />}

  </div>
);
};

export default Home;
