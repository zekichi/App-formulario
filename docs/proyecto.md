# Proyecto de Aplicación web de formularios

## Estructura de carpetas

/frontend
  ├── index.js
  ├── index.css, app.css
  └── /components
      ├── Formulario.jsx
      └── ListadoFormularios.jsx
  ├── tailwind.config.js
  └── /public
      └── index.html ← Link a fuente Playfair Display

/backend
  ├── app.py              ← Flask app
  ├── config.py           ← DB config
  ├── models.py           ← SQLAlchemy Models
  ├── routes.py           ← Endpoints API
  ├── db_init.sql         ← Script creación de tabla
  └── requirements.txt    ← Dependencias

/docs
  ├── seguimiento-estilos-retro.md
  └── memoria-completa.md


### 🔙 Backend:

- Flask configurado en app.py, con blueprints si se expanden los modulos
- Variables de entorno y URI en config.py
- Modelos en models.py usando SQLAlchemy
- Endpoints RESTful en rputes