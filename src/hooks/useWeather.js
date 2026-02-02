import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo_key'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const useWeather = (latitude, longitude, cityName = null) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Necesitamos al menos cityName o coordenadas
    if (!cityName && (!latitude || !longitude)) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        // Current weather
        const weatherUrl = cityName
          ? `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=es`
          : `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`

        const weatherResponse = await fetch(weatherUrl)
        
        if (!weatherResponse.ok) {
          const errorData = await weatherResponse.json().catch(() => ({}))
          if (weatherResponse.status === 404) {
            throw new Error('Ciudad no encontrada. Verifica el nombre e intenta de nuevo.')
          }
          throw new Error(errorData.message || 'No se pudo obtener el clima')
        }

        const weatherData = await weatherResponse.json()

        // Forecast
        const forecastUrl = cityName
          ? `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=es`
          : `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`

        const forecastResponse = await fetch(forecastUrl)
        
        if (!forecastResponse.ok) {
          // Si falla el forecast, solo mostramos el clima actual
          console.warn('No se pudo obtener el pronóstico')
        } else {
          const forecastData = await forecastResponse.json()
          setForecast(forecastData)
        }

        setWeather(weatherData)
      } catch (err) {
        setError(err.message)
        setWeather(null)
        setForecast(null)
        console.error('Error fetching weather:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [latitude, longitude, cityName])

  return { weather, forecast, loading, error }
}
