import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapView = ({ latitude, longitude, cityName, weather }) => {
  if (!latitude || !longitude) return null

  return (
    <div className="map-view-card">
      <h3 className="map-title">Ubicación en el mapa</h3>
      <div className="map-container">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="map-popup-content">
                <strong className="popup-city">{cityName || 'Tu ubicación'}</strong>
                {weather && (
                  <>
                    <div className="popup-weather">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="popup-icon"
                      />
                      <div className="popup-temp">
                        <span className="popup-temp-value">
                          {Math.round(weather.main.temp)}°C
                        </span>
                        <span className="popup-description">
                          {weather.weather[0].description}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView
