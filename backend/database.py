from sqlalchemy import create_engine # pyright: ignore[reportMissingImports]
from sqlalchemy.orm import sessionmaker # type: ignore
from models import Base
from dotenv import load_dotenv # type: ignore
import os

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def crear_tablas():
    Base.metadata.create_all(engine)