# backend/models.py

from database import db
from datetime import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    formularios = db.relationship(
        'Formulario',
        back_populates='owner',
        cascade='all, delete-orphan'
    )

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode()

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Formulario(db.Model):
    __tablename__ = 'formularios'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    mensaje = db.Column(db.Text, nullable=True)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)

    # Nueva columna: relación con usuario

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship('User', back_populates='formularios')

    def __repr__(self):
        return f"<Formulario {self.id} - {self.nombre}>"

    preguntas = db.relationship('Pregunta', back_populates='formulario')

class Pregunta(db.Model):
    __tablename__ = 'preguntas'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    texto = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  # e.g., 'texto', 'opcion_multiple'

    opciones = db.Column(db.Text)  # JSON string si lo aplica

    formulario_id = db.Column(db.Integer, db.ForeignKey('formularios.id'), nullable=False)

    formulario = db.relationship('Formulario', back_populates='preguntas')