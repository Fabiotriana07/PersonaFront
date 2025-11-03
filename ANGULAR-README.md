# 🅰️ Person API - Frontend Angular

Frontend desarrollado en Angular 18 para consumir la API REST de Person API.

## ✅ Proyecto Completado

El proyecto Angular está completamente configurado con:

- ✅ Estructura de proyecto Angular 18 standalone
- ✅ Servicios para consumir la API REST
- ✅ Componentes CRUD completos para las 4 entidades
- ✅ Routing configurado
- ✅ Bootstrap 5 para estilos
- ✅ Validación de formularios
- ✅ Manejo de errores

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
cd personapi-angular
npm install
```

### 2. Asegurar que la API esté corriendo

La API backend debe estar ejecutándose en `http://localhost:5204`

### 3. Ejecutar el frontend

```bash
npm start
```

El frontend estará disponible en `http://localhost:4200`

## 📁 Estructura del Proyecto

```
personapi-angular/
├── src/
│   ├── app/
│   │   ├── models/              # Interfaces TypeScript
│   │   │   ├── persona.model.ts
│   │   │   ├── profesion.model.ts
│   │   │   ├── telefono.model.ts
│   │   │   └── estudio.model.ts
│   │   ├── services/            # Servicios HTTP
│   │   │   └── api.service.ts
│   │   ├── personas/            # Componentes de Personas
│   │   │   ├── personas-list/
│   │   │   ├── personas-create/
│   │   │   ├── personas-edit/
│   │   │   └── personas-details/
│   │   ├── profesiones/         # Componentes de Profesiones
│   │   ├── telefonos/           # Componentes de Teléfonos
│   │   ├── estudios/            # Componentes de Estudios
│   │   ├── home/                # Componente de inicio
│   │   ├── app.component.ts     # Componente principal
│   │   └── app.routes.ts        # Rutas
│   ├── environments/            # Configuración de entornos
│   └── styles.css               # Estilos globales
├── angular.json                  # Configuración de Angular
├── package.json                  # Dependencias
└── proxy.conf.json              # Proxy para desarrollo
```

## 🔧 Configuración

### Cambiar URL de la API

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://TU_IP:5204/api'  // Cambiar por tu IP o dominio
};
```

### Para producción

Edita `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://TU_DOMINIO:5204/api'
};
```

## 🎯 Funcionalidades Implementadas

### Personas
- ✅ Listar todas las personas
- ✅ Ver detalle de una persona
- ✅ Crear nueva persona
- ✅ Editar persona existente
- ✅ Eliminar persona
- ✅ Ver conteo total

### Profesiones
- ✅ Listar todas las profesiones
- ✅ Ver detalle de una profesión
- ✅ Crear nueva profesión
- ✅ Editar profesión existente
- ✅ Eliminar profesión
- ✅ Ver conteo total

### Teléfonos
- ✅ Listar todos los teléfonos
- ✅ Ver detalle de un teléfono
- ✅ Crear nuevo teléfono (con selector de personas)
- ✅ Editar teléfono existente
- ✅ Eliminar teléfono
- ✅ Ver conteo total

### Estudios
- ✅ Listar todos los estudios
- ✅ Ver detalle de un estudio
- ✅ Crear nuevo estudio (con selectores de personas y profesiones)
- ✅ Editar estudio existente
- ✅ Eliminar estudio
- ✅ Ver conteo total

## 📝 Scripts Disponibles

```bash
# Desarrollo (puerto 4200)
npm start

# Build para producción
npm run build

# Watch mode (recompila automáticamente)
npm run watch
```

## 🌐 Despliegue

### Desarrollo

```bash
npm start
```

Accede a: `http://localhost:4200`

### Producción

```bash
# Construir
npm run build

# Los archivos compilados estarán en dist/personapi-angular/
# Puedes servir estos archivos con cualquier servidor web estático
```

### Servir con un servidor simple

```bash
# Después de npm run build
cd dist/personapi-angular

# Con Python
python -m http.server 8080

# Con Node.js
npx http-server -p 8080
```

## 🔌 Conexión con la API

### Verificar que la API esté corriendo

1. Abre `http://localhost:5204/swagger` en el navegador
2. Debe mostrar la documentación de Swagger
3. Prueba un endpoint (ej: GET /api/personas)

### Problemas de CORS

Si hay problemas de CORS, el proxy está configurado en `proxy.conf.json` para desarrollo.

En producción, asegúrate de que:
- CORS esté configurado en el backend
- La URL en `environment.prod.ts` sea correcta

## 📚 Tecnologías Utilizadas

- **Angular 18** - Framework frontend
- **TypeScript** - Lenguaje de programación
- **RxJS** - Programación reactiva
- **Bootstrap 5** - Framework CSS
- **Angular Forms** - Manejo de formularios
- **Angular Router** - Routing

## 🐛 Troubleshooting

### Error: Cannot find module

```bash
npm install
```

### Error de conexión a la API

1. Verifica que la API esté corriendo en `http://localhost:5204`
2. Verifica la URL en `environment.ts`
3. Revisa la consola del navegador para errores de CORS

### El proxy no funciona

El proxy está configurado para desarrollo. En producción, configura CORS correctamente en el backend.

## 📖 Documentación Adicional

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Bootstrap Documentation](https://getbootstrap.com)

