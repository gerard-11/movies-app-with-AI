# 🚀 Guía Rápida de Inicio - CineApp

Bienvenido a **CineApp**, una aplicación moderna de películas construida con React + Vite + Tailwind CSS.

## 📋 Requisitos Previos

- Node.js 16+ instalado
- npm o yarn

## ⚡ Inicio Rápido (5 minutos)

### Opción 1: Dos Terminales (Recomendado para desarrollo)

**Terminal 1 - Backend (Puerto 3001)**:
```bash
cd backend
npm install
npm run dev
```

Deberías ver:
```
✅ TMDB_API_KEY loaded
🎬 CineApp BFF running on port 3001
```

**Terminal 2 - Frontend (Puerto 5173)**:
```bash
npm install
npm run dev
```

Deberías ver:
```
  ➜  Local:   http://localhost:5173
```

Abre http://localhost:5173 en tu navegador. ¡Listo! 🎉

### Opción 2: Una Terminal (Con npm concurrently)

```bash
# Instalar concurrently globalmente
npm install -g concurrently

# Instalar dependencias
npm install
cd backend && npm install && cd ..

# Ejecutar ambos servidores
concurrently "npm run dev" "cd backend && npm run dev"
```

## 📁 Estructura del Proyecto

```
movies-app-react/
├── src/                    # Frontend React + Vite
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Páginas/Rutas
│   ├── store/              # Zustand state management
│   ├── services/           # API services
│   ├── App.jsx             # Router principal
│   └── main.jsx            # Entry point
├── backend/                # Express BFF
│   ├── server.js           # Servidor principal
│   ├── .env                # Variables de entorno
│   └── package.json
├── README.md               # Documentación frontend
└── .env.local             # Env vars frontend (auto-generado)
```

## 🎯 Próximos Pasos

1. **Explora la app**:
   - Home: Películas trending + categorías
   - Busca una película
   - Haz clic en una película para ver detalles
   - Explora películas similares

2. **Modifica componentes**:
   - Archivos en `src/components/` se actualizan en vivo (HMR)
   - Estilos con Tailwind CSS

3. **Cambia la API key**:
   - Edita `backend/.env`
   - Reemplaza `TMDB_API_KEY` con tu clave

4. **Deploy** (después):
   - Frontend: `npm run build` → Deploy a Vercel/Netlify
   - Backend: `npm start` → Deploy a Render/Railway/Heroku

## 🔗 Endpoints Disponibles

### Frontend
- `http://localhost:5173/` - Home
- `http://localhost:5173/trending` - Todas las trending
- `http://localhost:5173/movie/550` - Detalle película
- `http://localhost:5173/search/avatar` - Búsqueda
- `http://localhost:5173/category/28` - Películas por categoría

### Backend
- `http://localhost:3001/health` - Health check
- `http://localhost:3001/api/trending` - Películas trending
- `http://localhost:3001/api/genres` - Géneros
- `http://localhost:3001/api/search?query=avatar` - Buscar
- `http://localhost:3001/api/movie/550` - Detalle película

## 🎨 Paleta de Colores

La app usa una paleta tipo Netflix:
- **Fondo**: Negro (`#0f0f0f`)
- **Acentos**: Rojo (`#ef4444`)
- **Dorado**: Destacados (`#f59e0b`)

## 🔧 Variables de Entorno

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:3001
```

**Backend** (`backend/.env`):
```env
TMDB_API_KEY=tu_api_key_aqui
PORT=3001
```

## 🚨 Problemas Comunes

### ❌ "Failed to fetch" en frontend
- Verifica que backend esté corriendo en puerto 3001
- Comprueba que `VITE_API_URL` es correcto

### ❌ "API key not found" en backend
- Verifica que `backend/.env` exista
- Recarga el servidor

### ❌ CORS error
- Backend debe estar corriendo
- Frontend y backend son localhost, CORS está habilitado

## 📚 Documentación Completa

- [Frontend README](./README.md)
- [Backend README](./backend/README.md)

## 🎓 Stack Tecnológico

- ⚛️ React 18
- ⚡ Vite 5
- 🛣️ React Router v6
- 📦 Zustand (State Management)
- 🎨 Tailwind CSS 4
- 🌐 Express 5
- 📡 Axios

## 💡 Tips

- Usa `Ctrl+Shift+K` en VS Code para cambiar colores
- Tailwind intellisense mejora la experiencia
- React DevTools útil para debugging

## 🤝 Contribuciones

¡Los PRs son bienvenidos! Por favor:
1. Fork el repo
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un PR

## 📄 Licencia

ISC - Siente la libertad de usar este código como desees.

---

¿Preguntas? ¡Revisa la documentación detallada o abre un issue!
