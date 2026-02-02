import './ForecastCard.css'

const ForecastCard = ({ forecastItem }) => {
  if (!forecastItem) return null

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana'
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      })
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <div className="forecast-card-item">
      <div className="forecast-date">
        <span className="forecast-day">{formatDate(forecastItem.dt)}</span>
        <span className="forecast-time">{formatTime(forecastItem.dt)}</span>
      </div>
      
      <div className="forecast-icon-container">
        <img
          src={getWeatherIcon(forecastItem.weather[0].icon)}
          alt={forecastItem.weather[0].description}
          className="forecast-icon"
        />
      </div>

      <div className="forecast-description">
        {forecastItem.weather[0].description.charAt(0).toUpperCase() +
          forecastItem.weather[0].description.slice(1)}
      </div>

      <div className="forecast-temps">
        <span className="forecast-temp-max">
          {Math.round(forecastItem.main.temp_max)}°
        </span>
        <span className="forecast-temp-min">
          {Math.round(forecastItem.main.temp_min)}°
        </span>
      </div>
    </div>
  )
}

export default ForecastCard
