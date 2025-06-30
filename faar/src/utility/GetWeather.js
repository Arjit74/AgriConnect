// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const url = `${API_BASE_URL}/api/v1/weather?lat=${lat}&lon=${lon}`;
      const res = await axios.get(url);
      setWeatherData(res.data);
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
}
