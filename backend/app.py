# backend/app.py

from flask import Flask, redirect
from flask_cors import CORS
from database import db
from routes import formulario_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:270998@localhost:5432/formularios_db'
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