# models.py
# ---------------------------------------------------------
# Define las entidades del sistema usando ORM
# Cada clase representa una tabla en la base de datos
# ---------------------------------------------------------

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

# Base de la cual heredan todos los modelos
Base = declarative_base()


# ---------------------- VIDEO ----------------------
class Video(Base):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True)
    titulo = Column(String(100))
    anio = Column(Integer)
    duracion = Column(Integer)


# -------------------- CATEGORIA --------------------
class Categoria(Base):
    __tablename__ = "categoria"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(50))
    descripcion = Column(String(100))


# ------------------ CALIFICACION ------------------
class Calificacion(Base):
    __tablename__ = "calificacion"

    id = Column(Integer, primary_key=True)
    valor = Column(String(50))


# ---------------- VIDEO CATEGORIA ----------------
class VideoCategoria(Base):
    __tablename__ = "video_categoria"

    id = Column(Integer, primary_key=True)
    video_id = Column(Integer)
    categoria_id = Column(Integer)


# -------------- VIDEO CALIFICACION --------------
class VideoCalificacion(Base):
    __tablename__ = "video_calificacion"

    id = Column(Integer, primary_key=True)
    video_id = Column(Integer)
    calificacion_id = Column(Integer)
