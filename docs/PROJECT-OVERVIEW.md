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
