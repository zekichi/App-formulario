# backend/app.py

from flask import Flask, redirect, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from database import db, init_app
import logging
from dotenv import load_dotenv
import os
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno una sola vez 
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={
        r"/api/*": {
            "origins": os.getenv('CORS_ORIGIN', 'http://localhost:5173'),
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

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

@app.route('/test-db')
def test_db():
    try:
        # Use sqlalchemy.text() to properly escape the SQL query
        db.session.execute(text('SELECT 1'))
        return jsonify({
            'status': 'success',
            'message': 'Database connection successful'
        }), 200
    except SQLAlchemyError as e:
        return jsonify({
            'status': 'error',
            'message': 'Database connection failed',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)