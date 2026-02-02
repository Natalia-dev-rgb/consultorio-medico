# Weather App - Aplicación de Clima

Una aplicación de clima moderna y completa desarrollada con React, que proporciona información meteorológica en tiempo real con un diseño tipo portfolio tech.

## Características

- 🌡️ **Clima en tiempo real** - Información meteorológica actualizada
- 📍 **Geolocalización** - Detección automática de ubicación
- 🗺️ **Mapas interactivos** - Visualización con Leaflet
- 📱 **PWA** - Funciona offline con Service Workers
- 💾 **LocalStorage** - Guarda tu ubicación favorita
- 🔍 **Búsqueda de ciudades** - Busca cualquier ciudad del mundo
- 📊 **Pronóstico 5 días** - Información extendida del clima
- 🎨 **Diseño moderno** - UI tipo portfolio tech con gradientes y glassmorphism
- 📱 **Responsive** - Diseño mobile-first completamente adaptable

## Tecnologías

- **React 18** con Hooks
- **CSS moderno** (Flexbox y Grid)
- **OpenWeatherMap API** - API de clima
- **Leaflet** - Mapas interactivos
- **Service Workers** - PWA y funcionalidad offline
- **LocalStorage** - Persistencia de datos
- **Vite** - Build tool

## Configuración

### 1. Obtener API Key de OpenWeatherMap

1. Visita [OpenWeatherMap](https://openweathermap.org/api)
2. Crea una cuenta gratuita
3. Obtén tu API Key

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/app/weather`

## Estructura de Componentes

```
weather/
├── WeatherApp.jsx          # Componente principal
├── WeatherApp.css          # Estilos principales
├── WeatherCard.jsx         # Tarjeta de clima actual
├── WeatherCard.css
├── ForecastCard.jsx        # Pronóstico extendido
├── ForecastCard.css
├── WeatherMap.jsx          # Mapa interactivo
├── WeatherMap.css
├── SearchBar.jsx           # Barra de búsqueda
└── SearchBar.css
```

## Hooks Personalizados

- `useGeolocation` - Obtiene la ubicación del usuario
- `useWeather` - Fetch de datos del clima
- `useLocalStorage` - Persistencia en localStorage
- `useServiceWorker` - Gestión de Service Worker

## Funcionalidades

### Geolocalización
La aplicación detecta automáticamente tu ubicación usando la API de Geolocalización del navegador. Si el usuario no permite el acceso, puede buscar ciudades manualmente.

### Búsqueda de Ciudades
Busca cualquier ciudad del mundo usando la barra de búsqueda. Los resultados se guardan automáticamente en localStorage.

### Información del Clima
- Temperatura actual y sensación térmica
- Condiciones climáticas
- Humedad y presión
- Velocidad del viento
- Temperaturas mínima y máxima
- Pronóstico extendido (5 días)

### Mapas
Visualización interactiva de la ubicación en un mapa usando Leaflet con OpenStreetMap.

### PWA
La aplicación es una Progressive Web App (PWA) que:
- Funciona offline
- Se puede instalar en dispositivos
- Cachea recursos para mejor rendimiento

## Diseño

El diseño sigue principios modernos:
- **Glassmorphism** - Efectos de vidrio esmerilado
- **Gradientes** - Colores vibrantes y modernos
- **Animaciones suaves** - Transiciones fluidas
- **Mobile-first** - Diseño responsive desde móvil
- **Accesibilidad** - ARIA labels y navegación por teclado

## Mejoras Futuras

- [ ] Notificaciones push del clima
- [ ] Múltiples ubicaciones favoritas
- [ ] Gráficos de temperatura
- [ ] Modo oscuro/claro
- [ ] Widgets personalizables
- [ ] Alertas meteorológicas

## Licencia

Este proyecto es parte de un portfolio personal.
