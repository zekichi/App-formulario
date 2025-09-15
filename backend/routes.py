# backend/routes.py
import logging
from flask import Blueprint, jsonify, request
from database import db
from models import Formulario, User, Pregunta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import Schema, fields, validate, ValidationError
import json

logger = logging.getLogger(__name__)

# --------- auth_bp ---------

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "email ya registrado"}), 400

    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario creado"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"access_token": token}), 200
    return jsonify({"error": "Credenciales inválidas"}), 401


 
# --------- formulario_bp ---------

formulario_bp = Blueprint('formulario', __name__)

@formulario_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_form():
    user_id = get_jwt_identity()
    data = request.get_json()
    nuevo_formulario = Formulario(
        nombre=data.get('nombre'),
        email=data.get('email'),
        mensaje=data.get('mensaje'),
        user_id=user_id
    )
    db.session.add(nuevo_formulario)
    db.session.commit()
    return jsonify({"message": "Formulario guardado"}), 201

@formulario_bp.route('/forms', methods=['GET'])
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
@jwt_required()
def eliminar_formulario(id):
    user_id = get_jwt_identity()
    formulario = Formulario.query.filter_by(id=id, user_id=user_id).first()

    if not formulario:
        return jsonify({"error": "Formulario no encontrado"}), 404

    db.session.delete(formulario)
    db.session.commit()
    return jsonify({"message": "Eliminado"}), 200

# Agregar validación y manejo de errores
from marshmallow import Schema, fields, validate, ValidationError

class PreguntaSchema(Schema):
    texto = fields.Str(required=True)
    tipo = fields.Str(validate=validate.OneOf(['texto', 'checkbox', 'radio']))
    opciones = fields.List(fields.Str())

class FormularioSchema(Schema):
    nombre = fields.Str(required=True)
    email = fields.Email(required=True) 
    mensaje = fields.Str()
    preguntas = fields.List(fields.Nested(PreguntaSchema))

@formulario_bp.route('/crear', methods=['POST'])
@jwt_required()
def crear_formulario():
    try:
        schema = FormularioSchema()
        data = schema.load(request.json)
        
        user_id = get_jwt_identity()
        
        try:
            nuevo_formulario = Formulario(
                nombre=data['nombre'],
                email=data['email'],
                mensaje=data.get('mensaje'),
                user_id=user_id
            )
            db.session.add(nuevo_formulario)
            db.session.flush()

            for p in data.get('preguntas', []):
                pregunta = Pregunta(
                    texto=p['texto'],
                    tipo=p['tipo'],
                    opciones=json.dumps(p.get('opciones', [])),
                    formulario_id=nuevo_formulario.id
                )
                db.session.add(pregunta)
            
            db.session.commit()
            logger.info(f"Formulario creado: ID {nuevo_formulario.id}")
            
            # CAMBIO: Devolver el ID del formulario creado
            return jsonify({
                "message": "Formulario creado con éxito",
                "formulario_id": nuevo_formulario.id
            }), 201
            
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error al crear formulario: {str(e)}")
            return jsonify({"error": "Error al crear formulario"}), 500
            
    except ValidationError as err:
        logger.warning(f"Error de validación: {err.messages}")
        return jsonify({"error": err.messages}), 400