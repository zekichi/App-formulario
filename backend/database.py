# backend/database.py
from flask_sqlalchemy import SQLAlchemy


# Instancia global de SQLAlchemy
db = SQLAlchemy()

# Función para crear las tablas dentro del contexto Flask
def init_app(app):
    """Inicializar la base de datos con la aplicación Flask"""
    with app.app_context():
        db.create_all()