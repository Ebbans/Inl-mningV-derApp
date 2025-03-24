const fetchWeatherData = async (city) => {
    try {
      const res = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      const currentWeather = data.data[0];
      const dailyForecast = getDailyForecast(data.data);
  
      // Update last updated time
      const currentTime = new Date().toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      });
  
      return {
        current: {
          ...currentWeather,
          temperature: currentWeather.temp,
          humidity: currentWeather.rh,
          temp_min: currentWeather.min_temp,
          temp_max: currentWeather.max_temp,
          sunrise: new Date(currentWeather.sunrise_ts * 1000).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sunset: new Date(currentWeather.sunset_ts * 1000).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: currentWeather.weather.description,
          icon: currentWeather.weather.icon,
        },
        forecast: dailyForecast,
        lastUpdated: currentTime,
      };
    } catch (err) {
      throw new Error('Invalid city or API request failed: ' + err.message);
    }
  };
  
  const getDailyForecast = (data) => {
    return data.slice(1, 6).map((item) => ({
      date: new Date(item.valid_date + 'T00:00:00'),
      sunrise: new Date(item.sunrise_ts * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sunset: new Date(item.sunset_ts * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temp_min: item.min_temp || 'N/A',
      temp_max: item.max_temp || 'N/A',
      humidity: item.rh || 'N/A',
      description: item.weather?.description || 'N/A',
      icon: item.weather?.icon || '',
    }));
  };
  
  export default fetchWeatherData;