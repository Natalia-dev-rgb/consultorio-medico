# Configuración de Weather App

## Pasos para configurar la aplicación

### 1. Obtener API Key de OpenWeatherMap

1. Visita: https://openweathermap.org/api
2. Haz clic en "Sign Up" para crear una cuenta gratuita
3. Una vez registrado, ve a "API keys" en tu perfil
4. Copia tu API key (la key por defecto está disponible inmediatamente)

### 2. Configurar la API Key

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

**Importante:** Reemplaza `tu_api_key_aqui` con tu API key real de OpenWeatherMap.

### 3. Instalar dependencias (si no están instaladas)

```bash
npm install
```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

### 5. Acceder a la aplicación

Navega a: `http://localhost:5173/app/weather`

## Características implementadas

✅ React con Hooks personalizados
✅ CSS moderno (Flexbox y Grid)
✅ API de OpenWeatherMap
✅ Geolocalización del navegador
✅ Mapas con Leaflet
✅ Service Workers para PWA
✅ LocalStorage para persistencia
✅ Diseño responsive mobile-first
✅ Componentes reutilizables
✅ Código limpio y buenas prácticas

## Notas

- La aplicación solicitará permisos de geolocalización al cargar
- Si no permites la geolocalización, puedes buscar ciudades manualmente
- La última ubicación buscada se guarda automáticamente en localStorage
- La aplicación funciona como PWA y se puede instalar en dispositivos

## Solución de problemas

### Error: "No se pudo obtener el clima"
- Verifica que tu API key sea correcta
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de crear el `.env`

### El mapa no se muestra
- Verifica que Leaflet esté instalado: `npm install leaflet react-leaflet`
- Asegúrate de tener conexión a internet (los mapas se cargan desde OpenStreetMap)

### Service Worker no funciona
- Verifica que estés usando HTTPS o localhost
- Abre las herramientas de desarrollador y revisa la consola
- El Service Worker se registra automáticamente al cargar la página
