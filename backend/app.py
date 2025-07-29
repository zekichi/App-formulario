# backend/app.py

from flask import Flask, request, jsonify # type: ignore
from database import Session
from models import db, Formulario
# from flask_cors import CORS # type: ignore

app = Flask(__name__)
# CORS(app) # permite peticiones desde el frontend

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.get_json()

    # Validación básica

    nombre = data.get('nombre')
    email = data.get('email')

    if not nombre or not email:
        return jsonify({"error": "Nombre y email son obligatorios"}), 400
    
    #Guardar en la base

    session = Session()
    nuevo_formulario = Formulario(nombre=nombre, email=email)

    try:
        session.add(nuevo_formulario)
        session.commit()
        return jsonify({"message": "Formulario guardado correctamente"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()

    # Simulamos el procesamiento de datos
    
    # response = {"message": "Formulario recibido correctamente", "data": data}
    # return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)

from database import crear_tablas
crear_tablas()  # Crea las tablas en la base de datos al iniciar la aplicación

@app.route('/formularios', methods=['GET'])
def obtener_formularios():
    formularios = Formulario.query.all()
    resultado = [
        {'id': f.id, 'nombre': f.nombre, 'email': f.email}
        for f in formularios
    ]
    return jsonify(resultado)