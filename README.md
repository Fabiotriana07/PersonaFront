# PersonAPI - Frontend Angular

## 📋 Descripción del Proyecto

PersonAPI Frontend es una aplicación web desarrollada con Angular 18 que proporciona una interfaz de usuario completa para gestionar personas, profesiones, estudios y teléfonos. Consume la API REST desarrollada en ASP.NET Core y ofrece operaciones CRUD (Create, Read, Update, Delete) para todas las entidades.

## 🛠️ Stack Tecnológico

- **Framework**: Angular 18 (Standalone Components)
- **Lenguaje**: TypeScript
- **Programación Reactiva**: RxJS
- **Estilos**: Bootstrap 5
- **Manejo de Formularios**: Angular Forms
- **Routing**: Angular Router
- **HTTP Client**: Angular HttpClient
- **Build Tool**: Angular CLI

## 📁 Estructura del Proyecto

```
personapi-angular/
├── src/
│   ├── app/
│   │   ├── models/              # Interfaces TypeScript para las entidades
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
│   │   └── app.routes.ts        # Configuración de rutas
│   ├── environments/            # Configuración de entornos
│   │   ├── environment.ts       # Desarrollo
│   │   └── environment.prod.ts  # Producción
│   └── assets/                  # Recursos estáticos
├── angular.json                  # Configuración de Angular
├── package.json                  # Dependencias del proyecto
├── proxy.conf.json              # Proxy para desarrollo
└── tsconfig.json                # Configuración de TypeScript
```

## ⚙️ Configuración del Ambiente

### 1. Prerrequisitos

Asegúrate de tener instalado:

- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior (incluido con Node.js)
- **Angular CLI**: Se instalará globalmente

Verificar versiones:

```bash
node --version
npm --version
```

### 2. Clonar el Repositorio

```bash
git clone https://github.com/Fabiotriana07/PersonaFront.git
cd PersonaFront
```

### 3. Instalar Angular CLI (si no está instalado)

```bash
npm install -g @angular/cli
```

### 4. Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias del proyecto.

### 5. Configurar la URL de la API

#### Para Desarrollo

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: '/api'  // Usa proxy en desarrollo
};
```

El proxy está configurado en `proxy.conf.json` para redirigir a la API.

#### Para Producción

Edita `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://TU-API-URL.com/api'  // URL completa de la API
};
```

**Nota**: Reemplaza `TU-API-URL.com` con la URL real de tu backend (ej: `https://neriah-burriest-sentiently.ngrok-free.dev/api`)

## 🔧 Compilación

### Compilar para Desarrollo

```bash
npm run build
```

O con Angular CLI:

```bash
ng build
```

### Compilar para Producción

```bash
npm run build -- --configuration=production
```

O con Angular CLI:

```bash
ng build --configuration=production
```

Los archivos compilados estarán en `dist/personapi-angular/`

## 🚀 Despliegue y Ejecución

### Opción 1: Desarrollo Local

```bash
npm start
```

O con Angular CLI:

```bash
ng serve
```

La aplicación estará disponible en:

- **Frontend**: http://localhost:4200
- **Swagger Backend**: http://localhost:5204/swagger (si el backend está corriendo localmente)

**Nota**: En desarrollo, el proxy redirige automáticamente las peticiones `/api/*` al backend configurado.

### Opción 2: Producción (Build Estático)

Después de compilar:

```bash
npm run build -- --configuration=production
```

Puedes servir los archivos compilados con:

#### Con Python:
```bash
cd dist/personapi-angular
python -m http.server 8080
```

#### Con Node.js:
```bash
cd dist/personapi-angular
npx http-server -p 8080
```

#### Con Docker:
```bash
docker run -d -p 8080:80 -v $(pwd)/dist/personapi-angular:/usr/share/nginx/html nginx
```

### Opción 3: Despliegue en Vercel

1. **Conectar el repositorio a Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Importa el repositorio de GitHub

2. **Configurar el proyecto**:
   - Framework Preset: Angular
   - Build Command: `npm run build -- --configuration=production`
   - Output Directory: `dist/personapi-angular`

3. **Variables de Entorno** (si es necesario):
   - Agregar variables personalizadas si las necesitas

4. **Desplegar**:
   - Vercel desplegará automáticamente en cada push

## 📚 Uso de la Aplicación

### Navegación Principal

La aplicación tiene una página de inicio con enlaces a todas las secciones:

- **Personas**: Gestión completa de personas
- **Profesiones**: Gestión de profesiones
- **Teléfonos**: Gestión de teléfonos
- **Estudios**: Gestión de estudios
- **Swagger**: Enlace a la documentación de la API

### Operaciones CRUD Disponibles

Cada entidad tiene las siguientes operaciones:

#### Personas
- ✅ Listar todas las personas
- ✅ Ver detalles de una persona
- ✅ Crear nueva persona
- ✅ Editar persona existente
- ✅ Eliminar persona
- ✅ Ver conteo total

#### Profesiones
- ✅ Listar todas las profesiones
- ✅ Ver detalles de una profesión
- ✅ Crear nueva profesión
- ✅ Editar profesión existente
- ✅ Eliminar profesión
- ✅ Ver conteo total

#### Teléfonos
- ✅ Listar todos los teléfonos
- ✅ Ver detalles de un teléfono
- ✅ Crear nuevo teléfono (con selector de personas)
- ✅ Editar teléfono existente
- ✅ Eliminar teléfono
- ✅ Ver conteo total

#### Estudios
- ✅ Listar todos los estudios
- ✅ Ver detalles de un estudio
- ✅ Crear nuevo estudio (con selectores de personas y profesiones)
- ✅ Editar estudio existente
- ✅ Eliminar estudio
- ✅ Ver conteo total

## 🔐 Configuración de la API

### Configuración del Proxy (Desarrollo)

El archivo `proxy.conf.json` está configurado para desarrollo:

```json
{
  "/api": {
    "target": "https://neriah-burriest-sentiently.ngrok-free.dev",
    "secure": true,
    "changeOrigin": true,
    "headers": {
      "ngrok-skip-browser-warning": "true"
    }
  }
}
```

### Headers HTTP

El servicio API (`api.service.ts`) incluye automáticamente:

- `Accept: application/json`
- `Content-Type: application/json` (solo en POST/PUT)
- `ngrok-skip-browser-warning: true` (para evitar página de advertencia de ngrok)

## 🧪 Pruebas

### Verificar que la API esté Accesible

1. Abre el navegador
2. Ve a: `https://TU-API-URL/swagger`
3. Debe mostrar la documentación de Swagger

### Probar la Aplicación

1. Ejecuta `npm start`
2. Abre http://localhost:4200
3. Navega a cualquier sección (Personas, Profesiones, etc.)
4. Verifica que los datos se carguen correctamente

### Verificar en la Consola del Navegador

Abre las herramientas de desarrollador (F12) y revisa:

- **Network**: Las peticiones HTTP deben tener Status 200 OK
- **Console**: No debe haber errores de CORS o conexión

## 🐛 Solución de Problemas

### Error: Cannot find module

```bash
npm install
```

### Error: Puerto 4200 ya en uso

```bash
# Usar otro puerto
ng serve --port 4201
```

### Error de CORS en Producción

1. Verifica que el backend tenga CORS configurado
2. Verifica la URL en `environment.prod.ts`
3. Revisa la consola del navegador para errores específicos

### Error: No se puede conectar a la API

1. Verifica que el backend esté corriendo
2. Verifica la URL en `environment.ts` o `environment.prod.ts`
3. Prueba la URL directamente en el navegador

### El proxy no funciona

El proxy solo funciona en desarrollo. En producción:
- Configura CORS en el backend
- Usa la URL completa en `environment.prod.ts`

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo (puerto 4200)
npm run build          # Compila para desarrollo
npm run build -- --configuration=production  # Compila para producción

# Utilidades
npm test              # Ejecutar pruebas (si están configuradas)
```

## 🔗 Enlaces Útiles

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 📄 Licencia

Este proyecto es parte del sistema PersonAPI desarrollado para gestión de personas, profesiones, estudios y teléfonos.

