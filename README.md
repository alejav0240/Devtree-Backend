# DevTree Backend

Este es el backend del proyecto DevTree, una aplicación para gestionar proyectos de desarrollo.

## Requisitos

- Node.js >= 14.x
- npm >= 6.x
- MongoDB >= 4.x

## Instalación

1. Clona el repositorio:
  ```sh
  git clone https://github.com/tu-usuario/devtree-backend.git
  ```
2. Navega al directorio del proyecto:
  ```sh
  cd devtree-backend
  ```
3. Instala las dependencias:
  ```sh
  npm install
  ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
MONGO_URI=mongodb://localhost:27017/devtree
PORT=3000
JWT_SECRET=tu_secreto_jwt
```

## Uso

Para iniciar el servidor en modo desarrollo, ejecuta:

```sh
npm run dev
```

Para iniciar el servidor en modo producción, ejecuta:

```sh
npm start
```

## Endpoints

- `GET /api/projects` - Obtiene todos los proyectos
- `POST /api/projects` - Crea un nuevo proyecto
- `GET /api/projects/:id` - Obtiene un proyecto por ID
- `PUT /api/projects/:id` - Actualiza un proyecto por ID
- `DELETE /api/projects/:id` - Elimina un proyecto por ID

## Contribuir

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.