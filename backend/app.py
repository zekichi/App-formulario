# backend/app.py

from flask import Flask, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from database import db
from routes import auth_bp, formulario_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'sqlite:///formularios.db'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'cambiaesta_clave')
jwt = JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(formulario_bp, url_prefix='/api/forms')

db.init_app(app)

Migrate = Migrate(app, db)

# 👇 Mover esta función arriba
def crear_tablas():
    with app.app_context():
        db.create_all()

@app.route('/')
def index():
    return redirect('http://localhost:5173') 