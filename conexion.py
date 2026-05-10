# conexion.py
# ---------------------------------------------------------
# Este archivo se encarga de configurar la conexión a la BD
# utilizando SQLAlchemy como ORM.
# ---------------------------------------------------------

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Cadena de conexión a MySQL
engine = create_engine("mysql+mysqlconnector://root:1234@localhost/netpolix")

# Session es la fábrica de sesiones
Session = sessionmaker(bind=engine)

# Creamos una sesión activa que será usada en toda la app
session = Session()