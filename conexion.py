# conexion.py
# ---------------------------------------------------------
# Este archivo se encarga de configurar la conexión a la BD
# utilizando SQLAlchemy como ORM.
# ---------------------------------------------------------

from dotenv import load_dotenv
import os

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Cadena de conexión a MySQL
engine = create_engine(
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)

# Session es la fábrica de sesiones
Session = sessionmaker(bind=engine)

# Creamos una sesión activa que será usada en toda la app
session = Session()
