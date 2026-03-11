# 🎬 CineApp - Backend (BFF)

Backend For Frontend (BFF) que actúa como proxy entre el frontend React y la TMDB API.

**Propósito**: Ocultar la API key de TMDB y centralizar la lógica de backend.

## 🚀 Tech Stack

- **Express.js 5** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

## 📦 Instalación

```bash
npm install
```

## 🏃 Ejecución

```bash
# Producción
npm start

# Desarrollo (con auto-reload)
npm run dev
```

El servidor estará disponible en: `http://localhost:3001`

## 🔧 Configuración

Crear un archivo `.env` en la raíz del backend:

```env
TMDB_API_KEY=tu_api_key_aqui
TMDB_BASE_URL=https://api.themoviedb.org/3/
PORT=3001
```

**Importante**: El archivo `.env` ya está incluido con una API key de ejemplo. Para cambiarla:
1. Obtén una API key en [themoviedb.org](https://www.themoviedb.org/settings/api)
2. Reemplaza el valor en `.env`

## 📡 Endpoints de API

### `GET /api/trending`
Obtiene películas en tendencia.

**Respuesta**: Array de películas

### `GET /api/genres`
Obtiene lista de géneros disponibles.

**Respuesta**: Array de géneros

### `GET /api/search?query=...`
Busca películas por título.

**Query Params**:
- `query` (requerido): Término de búsqueda

**Respuesta**: Array de películas encontradas

### `GET /api/discover?genre_id=...`
Obtiene películas por género.

**Query Params**:
- `genre_id` (requerido): ID del género

**Respuesta**: Array de películas

### `GET /api/movie/:id`
Obtiene detalles completos de una película.

**Path Params**:
- `id` (requerido): ID de la película

**Respuesta**: Objeto con detalles de película

### `GET /api/movie/:id/similar`
Obtiene películas similares.

**Path Params**:
- `id` (requerido): ID de la película

**Respuesta**: Array de películas similares

### `GET /health`
Health check del servidor.

**Respuesta**: `{ status: 'ok' }`

## 🔒 Seguridad

- ✅ API key almacenada en `.env` (nunca exponida)
- ✅ CORS habilitado para origen de frontend
- ✅ Validación de parámetros
- ✅ Manejo de errores centralizado

## 📝 Notas

- El servidor debe estar corriendo cuando el frontend intenta hacer requests
- Los errores de TMDB se maneja con mensaje genérico
- Todos los endpoints devuelven JSON

## 🚨 Troubleshooting

**Error: TMDB_API_KEY not found**
- Verifica que el archivo `.env` exista en la carpeta backend
- Asegúrate que la variable esté definida

**Error: ECONNREFUSED en frontend**
- Verifica que el backend esté corriendo en puerto 3001
- Comprueba que `VITE_API_URL` en el frontend es `http://localhost:3001`

## 📄 Licencia

ISC
