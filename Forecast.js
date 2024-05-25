import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      fetchForecast(city);
    }
  }, [city]);

  const fetchForecast = async (city) => {
    try {
      const response = await axios.get(`/api/weather/forecast/${city}`);
      setForecast(response.data.list);
      setError('');
    } catch (error) {
      console.error('Error fetching weather forecast:', error.message);
      setError('Could not fetch weather forecast. Please try again.');
    }
  };

  return (
    <div className="forecast-container">
      {error && <p className="error">{error}</p>}
      {forecast.length > 0 && (
        <div>
          <h2>7-day Forecast for {city}</h2>
          <div className="forecast-grid">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>Day {index + 1}</p>
                <p>Temperature: {day.temp.day}K</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Wind Speed: {day.speed}m/s</p>
                <p>Weather: {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
