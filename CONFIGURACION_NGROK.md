# Configuración para ngrok

El frontend Angular ha sido configurado para conectarse a la API a través de ngrok.

## URL Configurada

- **API URL**: `https://neriah-burriest-sentiently.ngrok-free.dev/api`
- **Swagger**: `https://neriah-burriest-sentiently.ngrok-free.dev/swagger`

## Archivos Actualizados

1. **`src/environments/environment.ts`**: Configuración para desarrollo
2. **`src/environments/environment.prod.ts`**: Configuración para producción
3. **`src/app/home/home.component.ts`**: Enlace a Swagger actualizado

## Consideraciones Importantes

### 1. Headers de ngrok
ngrok puede requerir headers especiales. Si encuentras errores 403 o problemas de acceso, verifica que el backend esté configurado para aceptar peticiones desde ngrok.

### 2. CORS
Asegúrate de que el backend tenga configurado CORS para aceptar peticiones desde:
- El origen del frontend (si está desplegado)
- O configurar CORS para aceptar cualquier origen en desarrollo

### 3. Reconstruir la Aplicación
Si ya tienes la aplicación corriendo, necesitas reiniciarla para que los cambios en `environment.ts` tomen efecto:

```bash
# Detener el servidor (Ctrl+C)
# Reiniciar
npm start
```

### 4. Verificar la Conexión
Para verificar que la conexión funciona:

1. Abre la consola del navegador (F12)
2. Navega a cualquier sección (Personas, Profesiones, etc.)
3. Verifica que las peticiones HTTP se hagan a la URL de ngrok
4. Revisa si hay errores de CORS o conexión

## Si Cambias la URL de ngrok

Si la URL de ngrok cambia (porque reiniciaste ngrok), actualiza los archivos:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `src/app/home/home.component.ts` (enlace a Swagger)

## Solución de Problemas

### Error: CORS
Si ves errores de CORS, verifica que el backend tenga:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

### Error: 403 Forbidden
ngrok puede estar bloqueando peticiones. Verifica:
- Que la URL de ngrok sea correcta
- Que el backend esté accesible a través de ngrok
- Que no haya restricciones en ngrok

### Error: Network Error
- Verifica que ngrok esté corriendo
- Verifica que el backend esté accesible en la URL de ngrok
- Verifica la conexión a internet

