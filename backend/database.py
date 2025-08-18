# backend/database.py

from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Carga variables de entorno desde .env
load_dotenv()

# Instancia global de SQLAlchemy
db = SQLAlchemy()

# Función para crear las tablas dentro del contexto Flask
def crear_tablas():
    from app import app  # Importación local para evitar ciclos
    with app.app_context():
        db.create_all()