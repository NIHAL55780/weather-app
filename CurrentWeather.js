import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Currentweather.css';

const CurrentWeather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetchCurrentWeather(city);
    }
  }, [city]);

  const fetchCurrentWeather = async (city) => {
    try {
      const response = await axios.get(`/api/weather/current/${city}`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching current weather:', error.message);
      setError('Could not fetch current weather. Please try again.');
    }
  };

  return (
    <div className="current-weather-container">
      {error && <p className="error">{error}</p>}
      {weather && (
        <div>
          <h2>Current Weather in {city}</h2>
          <p>Temperature: {weather.main.temp}K</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed}m/s</p>
          {/* You can display additional weather data here */}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
