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

## 10. Componentes Principales

### NewForm.tsx
El componente principal para crear formularios dinámicos. Características:
- Usa Formik y Yup para validación
- Manejo de preguntas dinámicas
- Soporte para diferentes tipos de campos
- Envío de datos con autenticación JWT
- Integración con contexto de autenticación
- Navegación post-envío

### Estructura del Formulario
```typescript
interface FormularioValues {
    nombre: string;
    email: string;
    mensaje: string;
    preguntas: Pregunta[];
}

interface Pregunta {
    id: string;
    texto: string;
    tipo: 'texto' | 'checkbox' | 'radio';
    opciones: string[];
    required: boolean;
}
```

## 11. Guía de Estilos

### Paleta de Colores
- Fondo: bg-fondo
- Texto: text-texto
- Acento: text-acento
- Bordes: border-borde
- Blanco: bg-blanco

### Tipografía
- Font-family: font-serif
- Títulos: text-2xl
- Subtítulos: text-lg
- Texto normal: text-sm

### Componentes UI
- Botones primarios: `bg-acento text-blanco rounded hover:opacity-90`
- Botones secundarios: `border-2 border-acento text-acento hover:bg-acento hover:text-white`
- Inputs: `p-2 border border-borde rounded bg-fondo`
- Contenedores: `bg-blanco p-6 border border-borde rounded-lg shadow-sm`

## 12. Flujo de Trabajo

1. **Creación de Formulario**
   - Usuario accede a /new-form
   - Completa datos básicos
   - Agrega preguntas dinámicamente
   - Configura tipos y opciones
   - Envía con validación

2. **Proceso de Guardado**
   - Validación frontend con Yup
   - Envío con JWT en headers
   - Almacenamiento en PostgreSQL
   - Redirección a dashboard

3. **Gestión de Preguntas**
   - Agregar/eliminar preguntas
   - Configurar tipo de respuesta
   - Gestionar opciones para checkbox/radio
   - Validación específica por tipo

## 13. Seguridad

- Validación en ambos extremos
- Protección de rutas con JWT
- Sanitización de inputs
- Control de acceso por usuario
- Encriptación de datos sensibles

## 14. Mejoras Futuras

- [ ] Previsualización de formularios
- [ ] Duplicación de formularios
- [ ] Plantillas predefinidas
- [ ] Exportación de respuestas
- [ ] Análisis de datos
- [ ] Reportes automáticos

## 15. Sistema de Formularios Dinámicos

### Componentes Principales
- **NewForm**: Componente principal para creación
- **PreguntaForm**: Componente para cada pregunta individual
- **usePreguntasForm**: Hook personalizado para gestión de estado

### Arquitectura de Datos
```typescript
// Tipos de preguntas disponibles
type PreguntaTipo = 'texto' | 'checkbox' | 'radio';

// Estructura completa del formulario
interface FormularioValues {
    nombre: string;
    email: string;
    mensaje: string;
    preguntas: Pregunta[];
}

// Estructura de cada pregunta
interface Pregunta {
    id: string;
    texto: string;
    tipo: PreguntaTipo;
    opciones: string[];
    required: boolean;
}
```

/
├─ backend/
│  ├─ app.py
│  ├─ config.py
│  ├─ database.py
│  ├─ models.py
│  ├─ routes.py
│  └─ migrations/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ formularios/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  └─ types/
│  └─ ...config files
└─ docs/
   └─ PROJECT-OVERVIEW.md