# backend/app.py

from flask import Flask, redirect
from flask_cors import CORS
from database import db
from routes import formulario_bp
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

db.init_app(app)
app.register_blueprint(formulario_bp)

# 👇 Mover esta función arriba
def crear_tablas():
    with app.app_context():
        db.create_all()

@app.route('/')
def index():
    return redirect('http://localhost:5173') 