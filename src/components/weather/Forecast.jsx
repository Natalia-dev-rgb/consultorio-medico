import ForecastCard from './ForecastCard'
import './Forecast.css'

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null

  // Agrupar pronóstico por día y tomar el primero de cada día
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString()
    if (!acc[date]) {
      acc[date] = item
    }
    return acc
  }, {})

  const forecastItems = Object.values(dailyForecast).slice(0, 5)

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Pronóstico 5 días</h3>
      <div className="forecast-list-horizontal">
        {forecastItems.map((item) => (
          <ForecastCard key={item.dt} forecastItem={item} />
        ))}
      </div>
    </div>
  )
}

export default Forecast
