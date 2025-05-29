import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://project-weather-6al3.onrender.com/api/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <>
          <div className="card">
            <h2>{weather.current.name}</h2>
            <p>{weather.current.weather[0].description}</p>
            <p>Temp: {weather.current.main.temp}°C</p>
            <p>Humidity: {weather.current.main.humidity}%</p>
            <p>Wind: {weather.current.wind.speed} m/s</p>
          </div>

          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {weather.forecast.list.filter((_, i) => i % 8 === 0).map((f, index) => (
              <div key={index} className="card">
                <p><strong>{new Date(f.dt_txt).toDateString()}</strong></p>
                <p>{f.weather[0].description}</p>
                <p>Temp: {f.main.temp}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
