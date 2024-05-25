const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/current/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).send('Weather API key is missing');
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).send('Error fetching current weather');
  }
});

router.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).send('Weather API key is missing');
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily`, {
      params: {
        q: city,
        cnt: 7,
        appid: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather forecast:', error.message);
    res.status(500).send('Error fetching weather forecast');
  }
});

module.exports = router;
