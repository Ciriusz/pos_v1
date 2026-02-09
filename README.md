# Sistema POS - Backend

Backend para el sistema de Punto de Venta (POS) construido con Node.js, Express, TypeScript y Supabase.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- Cuenta y proyecto en [Supabase](https://supabase.com/)

## Configuración Inicial

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repo>
   cd pos_v1
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   El proyecto ya incluye un archivo `.env` de ejemplo, pero asegúrate de tener las siguientes variables configuradas:
   
   Crea un archivo `.env` en la raíz del proyecto (si no existe) con el siguiente contenido:
   ```env
   PORT=3000
   SUPABASE_URL=https://utbammnghhicnzfyhrlm.supabase.co
   SUPABASE_KEY=sb_publishable_AaHXFS-BpDzNKloAB7Nrdg_UcO_vdOY
   ```
   > **Nota**: Si tienes tus propias claves de Supabase, reemplázalas aquí.

## Ejecución

### Modo Desarrollo
Para trabajar en el código con recarga automática:
```bash
npm run dev
```
El servidor iniciará en `http://localhost:3000`.

### Verificación de Conexión
Puedes probar que la conexión a la base de datos funciona ejecutando:
```bash
npm run test:db
```

### Producción
Para compilar y ejecutar en un entorno productivo:
```bash
npm run build
npm start
```

## Endpoints Disponibles

- `GET /` - Estado del servicio.
- `GET /api/products` - Listar todos los productos.
- `GET /api/products/:id` - Obtener un producto por ID.
- `POST /api/products` - Crear un nuevo producto.

## Estructura del Proyecto

- `src/`
  - `config/` - Configuración de Supabase y otros servicios.
  - `controllers/` - Lógica de los endpoints.
  - `routes/` - Definición de rutas de la API.
  - `types/` - Interfaces de TypeScript (modelos de BD).
  - `app.ts` - Configuración de la aplicación Express.
  - `index.ts` - Punto de entrada del servidor.
