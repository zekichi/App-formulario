# backend/routes.py

from flask import Blueprint, request, jsonify # type: ignore
from database import Session
from models import Formulario

formulario_bp = Blueprint('formulario', __name__)

@formulario_bp.route('/submit', methods=['POST'])
def submit_form():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    mensaje = data.get('mensaje')

    if not nombre or not email:
        return jsonify({"error": "Nombre y email son obligatorios"}), 400
    
    session = Session()
    nuevo_formulario = Formulario(nombre=nombre, email=email, mensaje=mensaje)

    try:
        session.add(nuevo_formulario)
        session.commit()
        return jsonify({"message": "Formulario guardado correctamente"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


@formulario_bp.route('/formularios', methods=['GET'])
def obtener_formularios():
    session = Session()
    formularios = session.query(Formulario).all()
    resultado = [
        {
            'id': f.id,
            'nombre': f.nombre,
            'email': f.email,
            'mensaje': f.mensaje
        }
        for f in formularios
    ]
    session.close()
    return jsonify(resultado)

@formulario_bp.route('/eliminar/<int:id>', methods = ['DELETE'])
def eliminar_formulario(id):
    session = Session()
    formulario = session.query(Formulario).get(id)

    if not formulario:
        session.close()
        return jsonify({"error": "Formulario no encontrado"}), 404
    
    try:
        session.delete(formulario)
        session.commit()
        return jsonify({"message": "Formulario eliminado"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()