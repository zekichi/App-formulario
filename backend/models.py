from sqlalchemy import Column, Integer, String, DateTime, Text # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from datetime import datetime

Base = declarative_base()

class Formulario(Base):
    __tablename__ = 'formularios'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    fecha_envio = Column(DateTime, default=datetime.utcnow)
    mensaje = Column(Text)