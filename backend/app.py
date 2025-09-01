# backend/app.py

from flask import Flask, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from database import db, init_app
import logging
from dotenv import load_dotenv
import os

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno una sola vez 
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuración desde variables de entorno
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'dev-secret-key')

    # Inicializar extenciones
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Registrar blueprints
    from routes import auth_bp, formulario_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(formulario_bp, url_prefix='/api/forms')

    return app

app = create_app()

@app.route('/')
def index():
    return redirect('http://localhost:5173')

if __name__ == '__main__':
    app.run(debug=True)