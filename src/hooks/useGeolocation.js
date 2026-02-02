import { useState, useEffect } from 'react'

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocalización no soportada por tu navegador',
        loading: false
      }))
      return
    }

    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false
      })
    }

    const error = (err) => {
      setLocation(prev => ({
        ...prev,
        error: err.message || 'Error al obtener la ubicación',
        loading: false
      }))
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    })
  }, [])

  return location
}
