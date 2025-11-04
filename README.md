# Person API - Frontend Angular

Frontend desarrollado en Angular 18 para consumir la API REST de Person API.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn
- La API backend ejecutándose en `http://localhost:5204`

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── models/          # Modelos TypeScript
│   ├── services/        # Servicios para consumir API
│   ├── personas/        # Componentes de Personas
│   ├── profesiones/     # Componentes de Profesiones
│   ├── telefonos/       # Componentes de Teléfonos
│   ├── estudios/        # Componentes de Estudios
│   ├── home/            # Componente de inicio
│   ├── app.component.ts # Componente principal
│   └── app.routes.ts    # Rutas de la aplicación
```

## 🔧 Configuración

### Cambiar URL de la API

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://TU_IP:5204/api'
};
```

### Proxy para Desarrollo

El proyecto incluye `proxy.conf.json` para evitar problemas de CORS durante el desarrollo.

## 🎯 Funcionalidades

- ✅ CRUD completo para Personas
- ✅ CRUD completo para Profesiones
- ✅ CRUD completo para Teléfonos
- ✅ CRUD completo para Estudios
- ✅ Navegación entre páginas
- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Interfaz responsive con Bootstrap

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas

## 🌐 Despliegue

### Desarrollo

```bash
npm start
```

### Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/personapi-angular/`

## 🔌 Conexión con la API

Asegúrate de que:
1. La API backend esté ejecutándose en `http://localhost:5204`
2. CORS esté configurado correctamente en el backend
3. La URL en `api.service.ts` apunte a la API correcta

