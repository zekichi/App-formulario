# backend/models.py

from database import db
from datetime import datetime

class Formulario(db.Model):
    __tablename__ = 'formularios'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    mensaje = db.Column(db.Text, nullable=True)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Formulario {self.id} - {self.nombre}>"