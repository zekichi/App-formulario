# Resumen Completo del Proyecto

## 1. Descripción General

App-Formularios es una plataforma fullstack para crear formularios personalizados, almacenar respuestas en PostgreSQL y visualizar datos mediante gráficas y reportes PDF. Ofrece una experiencia retro, con tipografías serif y paleta de colores suaves. El proyecto está orientado tanto a fines educativos como administrativos.

## 2. Stack Tecnológico

**Frontend:**
- React 19.x + Vite
- Tailwind CSS (configuración retro)
- React Router v6
- Formik + Yup (validación)
- Axios (comunicaciones HTTP)

**Backend:**
- Python 3.x + Flask 3.x
- Flask-RESTful / Blueprints
- SQLAlchemy (ORM)
- PostgreSQL (host local o ElephantSQL)
- Flask-CORS / Flask-JWT-Extended (CORS y autenticación)
- Waitress o Gunicorn (servidor WSGI)

**Infraestructura:**
- GitHub (repositorio y versionado)
- Vercel / Netlify (frontend)
- Render / Railway (backend)
- ElephantSQL / Supabase (base de datos)

## 3. Estructura de Carpetas

```
/
├─ .env.example
├─ README.md
├─ requirements.txt
├─ backend/
│  ├─ .env.backend
│  ├─ app.py
│  ├─ database.py
│  ├─ models.py
│  ├─ routes.py
│  └─ run.py
├─ frontend/
│  ├─ index.html
│  ├─ vite.config.ts
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  ├─ package.json
│  └─ src/
│     ├─ main.tsx
│     ├─ index.css
│     ├─ App.tsx
│     ├─ components/
│     │  ├─ Formulario.tsx
│     │  ├─ Home.tsx
│     │  ├─ Login.tsx
│     │  └─ Register.tsx
│     ├─ layouts/
│     │  └─ BaseLayout.tsx
│     └─ context/
│        └─ AuthContext.tsx
└─ docs/
   └─ PROJECT_OVERVIEW.md
```

## 4. Variables de Entorno

**backend/.env.backend**
```
DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/formularios_db
JWT_SECRET=<clave-secreta-para-jwt>
FLASK_ENV=development
```

**frontend/.env.local**
```
VITE_API_URL=http://localhost:5000/api
```

## 5. Infraestructura y Configuración

- Migraciones gestionadas con Flask-Migrate y Alembic.
- Proxy en Vite para redirigir `/api` al backend.
- Tailwind CSS configurado con paleta retro y fuente "Libre Baskerville".
- Documentación en `/docs` sobre el esquema de base de datos, configuración de entorno y metodología Scrum.

## 6. Funcionalidades Clave

- Registro y login de usuarios con JWT.
- Creación, listado y eliminación de formularios.
- Relación entre usuarios y formularios.
- Validación de datos tanto en frontend como en backend.
- Preparado para agregar preguntas dinámicas y exportar reportes.

## 7. Roadmap y Avances

**Roadmap:**
1. Ajustar models.py y generar migraciones para incluir user_id en formulario
2. Crear páginas React y estilizar con paleta retro
3. Integrar Formik + Yup en Register/Login y creación de formularios
4. Proteger rutas con JWT (AuthContext + PrivateRoute)
5. Crear Dashboard.tsx con listado de formularios
6. Crear NewForm.tsx para generar formularios dinámicos
7. Añadir lógica de envío al backend con JWT
8. Mostrar respuestas y permitir eliminar formularios
9. Crear modelo Pregunta para formularios personalizados
10. Crear endpoint /forms/crear que recibe preguntas dinámicas
11. Visualizar respuestas con gráficas (Charts.js / Recharts)
12. Exportar reportes en PDF (jsPDF /PDFMake)

**Avances Implementados:**
- Modelo 'User' con contraseña encriptada y relación con 'Formularios'
- Modelo 'Formulario' vinculado a 'user_id'
- Blueprint 'auth_bp' con endpoints '/register' y '/login'
- Blueprint 'formulario_bp' con endpoints '/submit', '/forms', '/eliminar/<id>'
- JWT configurado con 'JWT_SECRET'
- Migraciones generadas y aplicadas con Flask-Migrate
- Endpoint protegido con '@jwt_required()' para envío y eliminación de formularios
- Páginas creadas: 'Home.tsx', 'Login.tsx', 'Register.tsx', 'Dashboard.tsx', 'NewForm.tsx'
- Estilizadas con Tailwind y paletas retro
- Validación con Formik + Yup en login, registro y creación de formularios
- Contexto de autenticación ('AuthContext.tsx') con login, register, logout
- Rutas protegidas con 'PrivateRoute.tsx'
- Navegación con React Router v6
- Envío de formularios con JWT en header 'Authorization'
- Listado de formularios en 'Dashboard.tsx' con opción de eliminar

## 8. Documentación y Archivos Relevantes

- `README.md`: Introducción y stack tecnológico.
- `docs/PROJECT-OVERVIEW.md`: Resumen y roadmap.
- `docs/esquema_base_datos.md`: Esquema de la base de datos.
- `docs/scrum-plan.md`: Planificación ágil y sprints.
- `docs/listado-formularios.md`: Flujo de datos y ejemplo de respuesta.

## 9. Formularios Personalizados

### Tipos de Preguntas Soportadas
- Texto libre
- Checkbox (selección múltiple)
- Radio (opción única)

### Estructura de Datos
```typescript
interface Pregunta {
    id: string;          // ID único para cada pregunta
    texto: string;       // Texto de la pregunta
    tipo: 'texto' | 'checkbox' | 'radio';  // Tipo de respuesta
    opciones: string[];  // Opciones para checkbox/radio
    required: boolean;   // Si es obligatoria
}
```