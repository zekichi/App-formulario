# backend/routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import Schema, fields, validate, ValidationError
from database import db
from models import Formulario, Pregunta
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create blueprints
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
formulario_bp = Blueprint('formulario', __name__)

# Marshmallow Schemas - FIXED VERSION
class PreguntaSchema(Schema):
    texto = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    tipo = fields.Str(required=True, validate=validate.OneOf(['texto', 'checkbox', 'radio']))
    opciones = fields.List(fields.Str(), load_default=[])  # Changed from missing=[] to load_default=[]
    required = fields.Bool(load_default=False)  # Changed from missing=False to load_default=False

class FormularioSchema(Schema):
    nombre = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    mensaje = fields.Str(load_default='', validate=validate.Length(max=500))  # Changed from missing='' to load_default=''
    preguntas = fields.List(fields.Nested(PreguntaSchema), required=True, validate=validate.Length(min=1))

# Authentication routes
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email y contraseña son requeridos'}), 400
        
        from models import User
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({'error': 'El usuario ya existe'}), 400
        
        # Create new user
        user = User(email=data['email'])
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        logger.info(f"Usuario registrado: {data['email']}")
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
        
    except Exception as e:
        logger.error(f"Error en registro: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email y contraseña son requeridos'}), 400
        
        from models import User
        from flask_jwt_extended import create_access_token
        
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email
                }
            }), 200
        else:
            return jsonify({'error': 'Credenciales inválidas'}), 401
            
    except Exception as e:
        logger.error(f"Error en login: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500

# Formulario routes
@formulario_bp.route('/forms', methods=['GET'])
@jwt_required()
def obtener_formularios():
    try:
        user_id = get_jwt_identity()
        formularios = Formulario.query.filter_by(user_id=user_id).all()
        
        result = []
        for form in formularios:
            result.append({
                'id': form.id,
                'nombre': form.nombre,
                'email': form.email,
                'mensaje': form.mensaje,
                'fecha_envio': form.fecha_envio.isoformat()
            })
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error al obtener formularios: {str(e)}")
        return jsonify({'error': 'Error al obtener formularios'}), 500

@formulario_bp.route('/crear', methods=['POST'])
@jwt_required()
def crear_formulario():
    try:
        print("=== INICIO DEBUG BACKEND ===")
        print("1. Request recibido")
        print("2. Headers:", dict(request.headers))
        print("3. Request JSON:", request.json)
        
        user_id = get_jwt_identity()
        print("4. User ID del token:", user_id)
        
        schema = FormularioSchema()
        data = schema.load(request.json)
        print("5. Datos validados:", data)
        
        try:
            nuevo_formulario = Formulario(
                nombre=data['nombre'],
                email=data['email'],
                mensaje=data.get('mensaje', ''),
                user_id=user_id
            )
            print("6. Formulario creado en memoria")
            
            db.session.add(nuevo_formulario)
            print("7. Agregado a sesión")
            
            db.session.flush()
            print("8. Flush realizado, ID:", nuevo_formulario.id)

            # Crear preguntas asociadas
            for i, p in enumerate(data.get('preguntas', [])):
                print(f"9.{i+1}. Creando pregunta:", p)
                pregunta = Pregunta(
                    texto=p['texto'],
                    tipo=p['tipo'],
                    opciones=json.dumps(p.get('opciones', [])),
                    required=p.get('required', False),
                    formulario_id=nuevo_formulario.id
                )
                db.session.add(pregunta)
                print(f"9.{i+1}. Pregunta agregada a sesión")
            
            db.session.commit()
            print("10. Commit realizado exitosamente")
            
            result = {
                "message": "Formulario creado con éxito",
                "formulario_id": nuevo_formulario.id,
                "public_url": f"/form/{nuevo_formulario.id}",
                "success": True
            }
            print("11. Respuesta preparada:", result)
            print("=== FIN DEBUG BACKEND ===")
            
            return jsonify(result), 201
            
        except Exception as e:
            print("=== ERROR EN TRY INTERNO ===")
            print("Error:", str(e))
            print("Tipo de error:", type(e))
            import traceback
            print("Traceback:", traceback.format_exc())
            db.session.rollback()
            return jsonify({"error": "Error al crear formulario en base de datos"}), 500
            
    except ValidationError as err:
        print("=== ERROR DE VALIDACIÓN ===")
        print("Errores de validación:", err.messages)
        return jsonify({"error": err.messages}), 400
    except Exception as e:
        print("=== ERROR GENERAL ===")
        print("Error:", str(e))
        print("Tipo de error:", type(e))
        import traceback
        print("Traceback:", traceback.format_exc())
        return jsonify({"error": "Error interno del servidor"}), 500

@formulario_bp.route('/formulario/<int:formulario_id>', methods=['GET'])
@jwt_required()
def obtener_formulario(formulario_id):
    try:
        user_id = get_jwt_identity()
        formulario = Formulario.query.filter_by(id=formulario_id, user_id=user_id).first()
        
        if not formulario:
            return jsonify({"error": "Formulario no encontrado"}), 404
            
        # Obtener preguntas asociadas
        preguntas = Pregunta.query.filter_by(formulario_id=formulario_id).all()
        
        return jsonify({
            "id": formulario.id,
            "nombre": formulario.nombre,
            "email": formulario.email,
            "mensaje": formulario.mensaje,
            "fecha_envio": formulario.fecha_envio.isoformat(),
            "preguntas": [
                {
                    "id": p.id,
                    "texto": p.texto,
                    "tipo": p.tipo,
                    "opciones": json.loads(p.opciones) if p.opciones else [],
                    "required": p.required if hasattr(p, 'required') else False
                } for p in preguntas
            ]
        }), 200
        
    except Exception as e:
        logger.error(f"Error al obtener formulario: {str(e)}")
        return jsonify({"error": "Error al obtener formulario"}), 500

@formulario_bp.route('/eliminar/<int:formulario_id>', methods=['DELETE'])
@jwt_required()
def eliminar_formulario(formulario_id):
    try:
        user_id = get_jwt_identity()
        formulario = Formulario.query.filter_by(id=formulario_id, user_id=user_id).first()
        
        if not formulario:
            return jsonify({"error": "Formulario no encontrado"}), 404
        
        db.session.delete(formulario)
        db.session.commit()
        
        return jsonify({"message": "Formulario eliminado exitosamente"}), 200
        
    except Exception as e:
        logger.error(f"Error al eliminar formulario: {str(e)}")
        return jsonify({"error": "Error al eliminar formulario"}), 500

@formulario_bp.route('/submit', methods=['POST'])
def enviar_formulario():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        nuevo_formulario = Formulario(
            nombre=data.get('nombre'),
            email=data.get('email'),
            mensaje=data.get('mensaje'),
            user_id=None  # Para formularios públicos
        )
        
        db.session.add(nuevo_formulario)
        db.session.commit()
        
        return jsonify({'message': 'Formulario enviado exitosamente', 'id': nuevo_formulario.id}), 201
        
    except Exception as e:
        logger.error(f"Error al enviar formulario: {str(e)}")
        return jsonify({'error': 'Error al procesar formulario'}), 500