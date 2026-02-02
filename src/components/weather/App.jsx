import { useState, useEffect } from 'react'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useWeather } from '../../hooks/useWeather'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import MapView from './MapView'
import LoadingAnimation from './LoadingAnimation'
import './App.css'

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState(null)
  const [lastCities, setLastCities] = useLocalStorage('lastCities', [])
  const [currentLocation, setCurrentLocation] = useState(null)
  const geolocation = useGeolocation()

  // Determinar qué ubicación usar
  const latitude = searchCity ? null : (currentLocation?.latitude || geolocation.latitude)
  const longitude = searchCity ? null : (currentLocation?.longitude || geolocation.longitude)
  const cityName = searchCity || currentLocation?.cityName || null

  const { weather, forecast, loading, error } = useWeather(
    latitude,
    longitude,
    cityName
  )

  // Al iniciar, pedir geolocalización y obtener clima
  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude && !currentLocation && !searchCity) {
      setCurrentLocation({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        cityName: null,
        isAutoDetected: true
      })
    }
  }, [geolocation.latitude, geolocation.longitude, currentLocation, searchCity])

  // Guardar ciudad cuando se busca exitosamente
  useEffect(() => {
    if (weather && searchCity) {
      const newLocation = {
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
        cityName: searchCity,
        isAutoDetected: false
      }
      setCurrentLocation(newLocation)
      
      // Guardar en últimas ciudades (máximo 5)
      setLastCities((prev) => {
        const filtered = prev.filter(city => city.toLowerCase() !== searchCity.toLowerCase())
        return [searchCity, ...filtered].slice(0, 5)
      })
    }
  }, [weather, searchCity, setLastCities])

  // Guardar ubicación detectada automáticamente
  useEffect(() => {
    if (weather && currentLocation?.isAutoDetected) {
      setCurrentLocation(prev => ({
        ...prev,
        cityName: weather.name
      }))
    }
  }, [weather, currentLocation])

  const handleSearch = (city) => {
    if (city && city.trim()) {
      setSearchCity(city.trim())
      // Limpiar error anterior al hacer nueva búsqueda
      if (error) {
        // El error se limpiará automáticamente cuando useWeather se ejecute
      }
    }
  }

  return (
    <div className="weather-app-container">
      <div className="weather-app-wrapper">
        <header className="app-header">
          <h1 className="app-title">Clima App</h1>
          <p className="app-subtitle">Información meteorológica en tiempo real</p>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
          lastCities={lastCities}
          onCitySelect={handleSearch}
        />

        {loading && <LoadingAnimation />}

        {error && (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
            <p className="error-hint">
              {error.includes('404') || error.includes('No se encontró')
                ? 'La ciudad no fue encontrada. Intenta con otro nombre.'
                : 'Verifica tu conexión a internet o intenta más tarde.'}
            </p>
          </div>
        )}

        {!loading && weather && (
          <>
            <CurrentWeather weather={weather} />
            
            {forecast && <Forecast forecast={forecast} />}
            
            <MapView 
              latitude={weather.coord.lat}
              longitude={weather.coord.lon}
              cityName={weather.name}
              weather={weather}
            />
          </>
        )}

        {!loading && !weather && !error && geolocation.error && (
          <div className="info-message">
            <p>📍 Permite el acceso a tu ubicación o busca una ciudad</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherApp
