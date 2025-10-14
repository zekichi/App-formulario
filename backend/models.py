# backend/models.py

from database import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    formularios = db.relationship('Formulario', back_populates='owner', cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hashear la contraseña"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Verificar la contraseña"""
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f'<User {self.email}>'

class Formulario(db.Model):
    __tablename__ = 'formularios'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    mensaje = db.Column(db.Text, nullable=True)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Relationships
    owner = db.relationship('User', back_populates='formularios')
    preguntas = db.relationship('Pregunta', back_populates='formulario', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Formulario {self.nombre}>'

class Pregunta(db.Model):
    __tablename__ = 'preguntas'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    texto = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  # 'texto', 'checkbox', 'radio'
    opciones = db.Column(db.Text, nullable=True)  # JSON string para opciones
    required = db.Column(db.Boolean, default=False)  # AGREGAR este campo
    formulario_id = db.Column(db.Integer, db.ForeignKey('formularios.id'), nullable=False)
    
    # Relationship
    formulario = db.relationship('Formulario', back_populates='preguntas')

class Respuesta(db.Model):
    __tablename__ = 'respuesta'
    
    id = db.Column(db.Integer, primary_key=True)
    pregunta_id = db.Column(db.Integer, db.ForeignKey('preguntas.id'), nullable=False)
    respuesta = db.Column(db.Text, nullable=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)