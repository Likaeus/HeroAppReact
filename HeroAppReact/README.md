# Epic Enclave Web

Frontend de Epic Enclave construido con React, TypeScript y Vite.

## Desarrollo local

1. Ejecuta `npm install`.
2. Copia `.env.example` como `.env`.
3. Ajusta `VITE_APIURL` si la API no se ejecuta en `http://localhost:8000`.
4. Ejecuta `npm run dev`.

## Publicación en Netlify

El repositorio incluye `netlify.toml` con la configuración necesaria:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 20
- Fallback SPA para React Router
- `VITE_APIURL` apuntando a la función publicada de Epic Enclave API

En Netlify, importa el repositorio y configura **Base directory** como `HeroAppReact`, ya que la aplicación está dentro de esa carpeta del repositorio. Netlify leerá desde ahí el `netlify.toml` incluido. Si cambia el dominio del backend, actualiza `VITE_APIURL` en las variables del sitio o en `netlify.toml` y vuelve a desplegar.

El backend debe configurar `CORS_ORIGIN` con el dominio definitivo del frontend, por ejemplo `https://epic-enclave.netlify.app`.

## Verificación

```bash
npm run lint
npm run build
```
