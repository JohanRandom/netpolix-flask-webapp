# app.py
# ---------------------------------------------------------
# API REST del sistema NETPOLIX
# ---------------------------------------------------------
# Este archivo expone las funcionalidades CRUD de:
# - Video
# - Categoria
# - Calificacion
# - VideoCategoria (relación entre Video y Categoria)
# - VideoCalificacion (relación entre Video y Calificacion)
#
# Utiliza:
# - Flask para crear servicios web (API REST)
# - SQLAlchemy para interactuar con la base de datos
# - JSON para enviar y recibir datos
# ---------------------------------------------------------

from flask import Flask, request, jsonify
from conexion import session
from flask_cors import CORS
from models import Video, Categoria, Calificacion, VideoCategoria, VideoCalificacion

# Inicialización de la aplicación Flask
app = Flask(__name__)

CORS(app)


# =========================================================
# ===================== VIDEOS =============================
# =========================================================


# -------------------- CREATE --------------------
# Endpoint: POST /videos
# Permite crear un nuevo video enviando datos en formato JSON
@app.route("/videos", methods=["POST"])
def crear_video():
    data = request.json  # Datos enviados desde Postman

    nuevo = Video(titulo=data["titulo"], anio=data["anio"], duracion=data["duracion"])

    session.add(nuevo)  # Se agrega a la sesión
    session.commit()  # Se guarda en la BD

    return jsonify({"mensaje": "Video creado"}), 201


# -------------------- READ ALL --------------------
# Endpoint: GET /videos
# Devuelve todos los videos registrados
@app.route("/videos", methods=["GET"])
def listar_videos():
    videos = session.query(Video).all()

    resultado = []

    # Convertimos objetos a JSON
    for v in videos:
        resultado.append(
            {"id": v.id, "titulo": v.titulo, "anio": v.anio, "duracion": v.duracion}
        )

    return jsonify(resultado)


# -------------------- READ BY ID --------------------
# Endpoint: GET /videos/{id}
# Devuelve un video específico
@app.route("/videos/<int:id>", methods=["GET"])
def obtener_video(id):
    video = session.get(Video, id)

    if video:
        return jsonify(
            {
                "id": video.id,
                "titulo": video.titulo,
                "anio": video.anio,
                "duracion": video.duracion,
            }
        )
    else:
        return jsonify({"error": "No encontrado"}), 404


# -------------------- READ BY NAME --------------------
# Endpoint: GET /videos/nombre/{titulo}
# Busca videos por coincidencia en el título
@app.route("/videos/nombre/<string:titulo>", methods=["GET"])
def buscar_por_nombre(titulo):
    videos = session.query(Video).filter(Video.titulo.like(f"%{titulo}%")).all()

    resultado = []

    for v in videos:
        resultado.append(
            {"id": v.id, "titulo": v.titulo, "anio": v.anio, "duracion": v.duracion}
        )

    return jsonify(resultado)


# -------------------- UPDATE --------------------
# Endpoint: PUT /videos/{id}
# Actualiza un video existente
@app.route("/videos/<int:id>", methods=["PUT"])
def actualizar_video(id):
    data = request.json
    video = session.get(Video, id)

    if video:
        video.titulo = data["titulo"]
        video.anio = data["anio"]
        video.duracion = data["duracion"]

        session.commit()

        return jsonify({"mensaje": "Video actualizado"})
    else:
        return jsonify({"error": "No encontrado"}), 404


# -------------------- DELETE --------------------
# Endpoint: DELETE /videos/{id}
# Elimina un video por ID
@app.route("/videos/<int:id>", methods=["DELETE"])
def eliminar_video(id):
    video = session.get(Video, id)

    if video:
        session.delete(video)
        session.commit()
        return jsonify({"mensaje": "Video eliminado"})
    else:
        return jsonify({"error": "No encontrado"}), 404


# =========================================================
# ================== CATEGORIAS ============================
# =========================================================


# -------------------- CREATE --------------------
# Endpoint: POST /categorias
# Crea una nueva categoría
@app.route("/categorias", methods=["POST"])
def crear_categoria():
    data = request.json

    nueva = Categoria(nombre=data["nombre"], descripcion=data["descripcion"])

    session.add(nueva)
    session.commit()

    return jsonify({"mensaje": "Categoria creada"}), 201


# -------------------- READ ALL --------------------
# Endpoint: GET /categorias
# Lista todas las categorías
@app.route("/categorias", methods=["GET"])
def listar_categorias():
    categorias = session.query(Categoria).all()

    resultado = []

    for c in categorias:
        resultado.append({"id": c.id, "nombre": c.nombre, "descripcion": c.descripcion})

    return jsonify(resultado)


# -------------------- READ BY ID --------------------
# Endpoint: GET /categorias/{id}
# Obtiene una categoría específica
@app.route("/categorias/<int:id>", methods=["GET"])
def obtener_categoria(id):
    categoria = session.get(Categoria, id)

    if categoria:
        return jsonify(
            {
                "id": categoria.id,
                "nombre": categoria.nombre,
                "descripcion": categoria.descripcion,
            }
        )
    else:
        return jsonify({"error": "No encontrada"}), 404


# -------------------- UPDATE --------------------
# Endpoint: PUT /categorias/{id}
# Actualiza una categoría
@app.route("/categorias/<int:id>", methods=["PUT"])
def actualizar_categoria(id):
    data = request.json
    categoria = session.get(Categoria, id)

    if categoria:
        categoria.nombre = data["nombre"]
        categoria.descripcion = data["descripcion"]

        session.commit()

        return jsonify({"mensaje": "Categoria actualizada"})
    else:
        return jsonify({"error": "No encontrada"}), 404


# -------------------- DELETE --------------------
# Endpoint: DELETE /categorias/{id}
# Elimina una categoría
@app.route("/categorias/<int:id>", methods=["DELETE"])
def eliminar_categoria(id):
    categoria = session.get(Categoria, id)

    if categoria:
        session.delete(categoria)
        session.commit()

        return jsonify({"mensaje": "Categoria eliminada"})
    else:
        return jsonify({"error": "No encontrada"}), 404


# =========================================================
# ================= CALIFICACIÓN ==========================
# =========================================================


# -------------------- CREATE --------------------
# Endpoint: POST /categorias
# Crea una nueva categoría
@app.route("/calificaciones", methods=["POST"])
def crear_calificacion():
    data = request.json

    nueva = Calificacion(valor=data["valor"])
    session.add(nueva)
    session.commit()

    return jsonify({"mensaje": "Creada"}), 201


# -------------------- READ ALL --------------------
# Endpoint: GET /categorias
# Lista todas las categorías
@app.route("/calificaciones", methods=["GET"])
def listar_calificaciones():
    calificaciones = session.query(Calificacion).all()

    resultado = []
    for c in calificaciones:
        resultado.append({"id": c.id, "valor": c.valor})

    return jsonify(resultado)


# -------------------- UPDATE --------------------
# Endpoint: UPDATE /categorias
# Lista todas las categorías
@app.route("/calificaciones/<int:id>", methods=["PUT"])
def actualizar_calificacion(id):
    data = request.json
    c = session.get(Calificacion, id)

    if c:
        c.valor = data["valor"]
        session.commit()
        return jsonify({"mensaje": "Actualizada"})
    return jsonify({"error": "No encontrada"}), 404


# -------------------- DELETE --------------------
# Endpoint: DELETE /categorias
# Lista todas las categorías
@app.route("/calificaciones/<int:id>", methods=["DELETE"])
def eliminar_calificacion(id):
    c = session.get(Calificacion, id)

    if c:
        session.delete(c)
        session.commit()
        return jsonify({"mensaje": "Eliminada"})
    return jsonify({"error": "No encontrada"}), 404


# =========================================================
# ================ VIDEO-CATEGORIA ========================
# =========================================================


# -------------------- CREATE --------------------
# Endpoint: POST /categorias
# Crea una nueva categoría
@app.route("/video-categoria", methods=["POST"])
def relacion_video_categoria():
    data = request.json

    nueva = VideoCategoria(video_id=data["video_id"], categoria_id=data["categoria_id"])

    session.add(nueva)
    session.commit()

    return jsonify({"mensaje": "Relacion creada"})


# -------------------- READ ALL --------------------
# Endpoint: GET /categorias
# Lista todas las categorías
@app.route("/video-categoria", methods=["GET"])
def listar_relaciones():
    datos = session.query(VideoCategoria).all()

    return jsonify(
        [
            {"id": d.id, "video_id": d.video_id, "categoria_id": d.categoria_id}
            for d in datos
        ]
    )


# -------------------- DELETE --------------------
# Endpoint: DELETE /categorias
# Lista todas las categorías
@app.route("/video-categoria/<int:id>", methods=["DELETE"])
def eliminar_relacion(id):
    d = session.get(VideoCategoria, id)

    if d:
        session.delete(d)
        session.commit()
        return jsonify({"mensaje": "Eliminada"})
    return jsonify({"error": "No encontrada"}), 404


# =========================================================
# =============== VIDEO-CALIFICACIÓN ======================
# =========================================================


# -------------------- CREATE --------------------
# Endpoint: POST /categorias
# Crea una nueva categoría
@app.route("/video-calificacion", methods=["POST"])
def asignar_calificacion():
    data = request.json

    nueva = VideoCalificacion(
        video_id=data["video_id"], calificacion_id=data["calificacion_id"]
    )

    session.add(nueva)
    session.commit()

    return jsonify({"mensaje": "Calificacion asignada"})


# -------------------- READ ALL --------------------
# Endpoint: GET /categorias
# Lista todas las categorías
@app.route("/video-calificacion", methods=["GET"])
def listar_video_calificacion():
    datos = session.query(VideoCalificacion).all()

    return jsonify(
        [
            {"id": d.id, "video_id": d.video_id, "calificacion_id": d.calificacion_id}
            for d in datos
        ]
    )


# -------------------- DELETE --------------------
# Endpoint: DELETE /categorias
# Lista todas las categorías
@app.route("/video-calificacion/<int:id>", methods=["DELETE"])
def eliminar_video_calificacion(id):
    d = session.get(VideoCalificacion, id)

    if d:
        session.delete(d)
        session.commit()
        return jsonify({"mensaje": "Eliminada"})
    return jsonify({"error": "No encontrada"}), 404


# =========================================================
# ====================== RUN ===============================
# =========================================================

# Punto de entrada de la aplicación
if __name__ == "__main__":
    app.run(debug=True)
