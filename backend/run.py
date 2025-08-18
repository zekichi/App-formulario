# backend/run.py

from waitress import serve
from app import app, crear_tablas

if __name__ == '__main__':
    print("Iniciando el servidor...")
    crear_tablas()
    print("🚀 Servidor iniciado en http://localhost:5000")
    serve(app, host='0.0.0.0', port=5000)