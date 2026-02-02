import { useEffect } from 'react'

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log('Service Worker está listo:', registration.scope)
      })

      // Verificar actualizaciones periódicamente
      setInterval(() => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.update()
          }
        })
      }, 60000) // Cada minuto
    }
  }, [])
}
