import './CurrentWeather.css'

const CurrentWeather = ({ weather }) => {
  if (!weather) return null

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">{weather.name}</h2>
          <p className="country">{weather.sys.country}</p>
          <p className="date">{formatDate(weather.dt)}</p>
        </div>
        <div className="weather-icon-large">
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="weather-icon-img"
          />
        </div>
      </div>

      <div className="temperature-section">
        <div className="temperature-main">
          <span className="temp-value">{Math.round(weather.main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-description">
          {weather.weather[0].description.charAt(0).toUpperCase() +
            weather.weather[0].description.slice(1)}
        </p>
      </div>

      <div className="weather-details-grid">
        <div className="detail-box">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <span className="detail-label">Humedad</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <span className="detail-label">Viento</span>
            <span className="detail-value">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </span>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <span className="detail-label">Sensación</span>
            <span className="detail-value">
              {Math.round(weather.main.feels_like)}°C
            </span>
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-icon">📊</div>
          <div className="detail-content">
            <span className="detail-label">Presión</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div className="temp-range">
        <span className="temp-min">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="7" cy="7" r="4" />
            <path d="M16 11l-4-4-4 4" />
          </svg>
          Mín: {Math.round(weather.main.temp_min)}°C
        </span>
        <span className="temp-max">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="7" cy="7" r="4" />
            <path d="M16 11l-4 4 4-4" />
          </svg>
          Máx: {Math.round(weather.main.temp_max)}°C
        </span>
      </div>
    </div>
  )
}

export default CurrentWeather
