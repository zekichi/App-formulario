# backend/app.py

from flask import Flask, request, jsonify # type: ignore
from database import crear_tablas
from models import db
from routes import formularios_bp
# from flask_cors import CORS # type: ignore

app = Flask(__name__)
# CORS(app) # permite peticiones desde el frontend

app.register_blueprint(formularios_bp)

if __name__ == '__main__':
    crear_tablas()
    app.run(debug=True)