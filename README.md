# 🎬 CineApp - Frontend

Una aplicación moderna de películas construida con **React**, **Vite**, **Tailwind CSS** y **Zustand**.

## 🚀 Stack Tecnológico

- **React 18** - UI Framework
- **Vite 5** - Build tool
- **React Router v6** - Navigation
- **Zustand** - State management
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **TMDB API** - Data source (vía BFF)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env.local (si no existe)
# VITE_API_URL=http://localhost:3001
```

## 🏃 Desarrollo

```bash
# Asegúrate que el BFF esté corriendo en puerto 3001
npm run dev
```

Accede a http://localhost:5173

## 🏗️ Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Header.jsx
│   ├── MovieCard.jsx
│   ├── CategoryCard.jsx
│   └── Footer.jsx
├── pages/            # Páginas/Rutas
│   ├── Home.jsx
│   ├── MovieDetail.jsx
│   ├── SearchResults.jsx
│   ├── CategoryResults.jsx
│   └── TrendingMovies.jsx
├── store/            # Zustand store
│   └── movieStore.js
├── services/         # API clients
│   └── api.js
├── App.jsx          # Router setup
├── main.jsx         # Entry point
└── index.css        # Global styles + Tailwind
```

## 🎨 Paleta de Colores

| Elemento | Color | Hex |
|----------|-------|-----|
| Fondo Principal | Negro | `#0f0f0f` |
| Fondo Secundario | Gris Oscuro | `#1a1a1a` |
| Tarjetas | Gris Muy Oscuro | `#262626` |
| Acento Primario | Rojo | `#ef4444` |
| Acento Secundario | Dorado | `#f59e0b` |
| Texto Principal | Blanco Suave | `#f5f5f5` |
| Texto Secundario | Gris Claro | `#d4d4d4` |
| Bordes | Gris | `#404040` |

## 🗺️ Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Trending + Categorías |
| `/movie/:id` | Detalle de película |
| `/search/:query` | Resultados de búsqueda |
| `/category/:id` | Películas por categoría |
| `/trending` | Todas las películas trending |

## 🔌 Dependencias de Backend

El frontend requiere que el **BFF (Backend For Frontend)** esté corriendo en `http://localhost:3001` con los siguientes endpoints:

- `GET /api/trending` - Películas trending
- `GET /api/genres` - Géneros disponibles
- `GET /api/search?query=...` - Buscar películas
- `GET /api/discover?genre_id=...` - Películas por género
- `GET /api/movie/:id` - Detalle de película
- `GET /api/movie/:id/similar` - Películas similares

## 🔒 Seguridad

**Importante**: La API key de TMDB nunca se expone en el frontend. Se maneja únicamente en el BFF.

## 📦 Build

```bash
# Build para producción
npm run build

# Preview de build
npm run preview
```

## 📝 Notas

- La aplicación es completamente responsive (mobile-first)
- Usa Tailwind CSS para todos los estilos
- Zustand para estado global de películas
- React Router para navegación SPA

## 📄 Licencia

ISC
