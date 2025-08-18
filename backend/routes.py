# backend/routes.py

from flask import Blueprint, request, jsonify
from database import db
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

    nuevo_formulario = Formulario(nombre=nombre, email=email, mensaje=mensaje)

    try:
        db.session.add(nuevo_formulario)
        db.session.commit()
        return jsonify({"message": "Formulario guardado correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@formulario_bp.route('/formularios', methods=['GET'])
def obtener_formularios():
    formularios = Formulario.query.order_by(Formulario.fecha_envio.desc()).all()
    resultado = [
        {
            'id': f.id,
            'nombre': f.nombre,
            'email': f.email,
            'mensaje': f.mensaje,
            'fecha_envio': f.fecha_envio.strftime('%Y-%m-%d %H:%M')
        }
        for f in formularios
    ]
    return jsonify(resultado)

@formulario_bp.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminar_formulario(id):
    formulario = Formulario.query.get(id)

    if not formulario:
        return jsonify({"error": "Formulario no encontrado"}), 404

    try:
        db.session.delete(formulario)
        db.session.commit()
        return jsonify({"message": "Formulario eliminado"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500