# PROJECT-OVERVIEW

## 1. Descripción del Proyecto

App-Formularios es una plataforma fullstack para:
- Crear formularios personalizados
- Almacenar respuestas en PostgreSQL
- Visualizar datos mediante gráficas y reportes PDF
- Ofrecer una experiencia retro, con tipografías serif y paleta de colores suaves

## 2. Stack Tecnológico

### Frontend
- React 19.x + Vite
- Tailwind CSS (configuración retro)
- React Router v6
- Formik + Yup (validación)
- Axios (comunicaciones HTTP)

### Backend
- Python 3.x + Flask 3.x
- Flask-RESTful / Blueprints
- SQLAlchemy (ORM)
- PostgreSQL (host local o ElephantSQL)
- Flask-CORS / Flask-JWT-Extended (CORS y autenticación)
- Waitress o Gunicorn (servidor WSGI)

## 3. Estructura de Carpetas

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


## 4. Variables de Entorno

### backend/.env.backend
DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/formularios_db
JWT_SECRET=<clave-secreta-para-jwt>
FLASK_ENV=development

### frontend/.env.local
VITE_API_URL=http://localhost:5000/api


## 5. Configuracines Clave

- Flask (app.py):
    - db.init_app(app), blueprints: auth_bp, formulario_bp
    - Carga de .env con python-dotenv
- SQLAlchemy (database.py):
    - Exporta db y función crear_tablas()
- Modelos(models.py):
    - User y Formulario con relación Usuario-Formularios
- Migraciones:
    - Flask-Migrate o Alembic configurado
- Vite (vite.config.js):
    - Proxy /api -> http://localhost:5000
- Tailwind (tailwind.config.js):
    - Paleta: fondo, borde, acento, texto, blanco con #
    - Fuente: "Libre Bakersville" o "Playfair Display"

## 6. Roadmap de Funcionalidades

1. Ajustar models.py y generar migraciones para incluir user_id en formulario
2. Crear páginas React y estilizar con paleta retro
3. Integrar Formik + Yup en Register/Login y creación de formularios
4. Proteger rutas con JWT (AuthContext + PrivateRoute)
5. Probar flujo completo: registro -> login -> crear formulario -> ver Dashboard