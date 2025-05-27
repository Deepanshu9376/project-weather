const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const [current, forecast] = await Promise.all([
      axios.get(currentWeather),
      axios.get(forecastWeather),
    ]);

    res.json({
      current: current.data,
      forecast: forecast.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
