const API_RELACION = "http://127.0.0.1:5000/video-calificacion";

const API_VIDEOS = "http://127.0.0.1:5000/videos";

const API_CALIFICACIONES = "http://127.0.0.1:5000/calificaciones";


// ===============================================
// OBTENER VIDEO CALIFICACION
// ===============================================

async function obtenerVideoCalificacion() {

    try {

        // RELACIONES
        const responseRelacion = await fetch(API_RELACION);

        const relaciones = await responseRelacion.json();


        // VIDEOS
        const responseVideos = await fetch(API_VIDEOS);

        const videos = await responseVideos.json();


        // CALIFICACIONES
        const responseCalificaciones = await fetch(API_CALIFICACIONES);

        const calificaciones = await responseCalificaciones.json();


        const tabla = document.getElementById("tablaVideoCalificacion");

        tabla.innerHTML = "";


        relaciones.forEach(relacion => {

            // BUSCAR VIDEO
            const video = videos.find(v => v.id === relacion.video_id);

            // BUSCAR CALIFICACION
            const calificacion = calificaciones.find(
                c => c.id === relacion.calificacion_id
            );


            tabla.innerHTML += `
                <tr>
                    <td>${relacion.id}</td>
                    <td>${video ? video.titulo : "No encontrado"}</td>
                    <td>${calificacion ? calificacion.valor : "No encontrada"}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al obtener relaciones");

    }

}


// ===============================================
// CREAR RELACION
// ===============================================

document
    .getElementById("formVideoCalificacion")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const video_id = document.getElementById("video_id").value;

        const calificacion_id = document.getElementById("calificacion_id").value;

        try {

            const response = await fetch(API_RELACION, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    video_id: parseInt(video_id),
                    calificacion_id: parseInt(calificacion_id)
                })

            });

            if (response.ok) {

                alert("Relación creada correctamente");

                document.getElementById("formVideoCalificacion").reset();

                obtenerVideoCalificacion();

            } else {

                alert("Error al crear relación");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });


// ===============================================
// BUSCAR
// ===============================================

function buscarVideoCalificacion() {

    const texto = document
        .getElementById("inputBuscar")
        .value
        .toLowerCase();

    const filas = document.querySelectorAll("#tablaVideoCalificacion tr");

    filas.forEach(fila => {

        const contenido = fila.textContent.toLowerCase();

        if (contenido.includes(texto)) {

            fila.style.display = "";

        } else {

            fila.style.display = "none";

        }

    });

}

// ===============================================
// ELIMINAR RELACION
// ===============================================

document
    .getElementById("formEliminarRelacion")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const id = document.getElementById("eliminar_id").value;

        const confirmar = confirm(
            "¿Seguro que deseas eliminar esta relación?"
        );

        if (!confirmar) return;

        try {

            const response = await fetch(`${API_RELACION}/${id}`, {

                method: "DELETE"

            });

            if (response.ok) {

                alert("Relación eliminada correctamente");

                document
                    .getElementById("formEliminarRelacion")
                    .reset();

                obtenerVideoCalificacion();

            } else {

                alert("Error al eliminar relación");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });

// ===============================================
// INICIO AUTOMÁTICO
// ===============================================

// Llamada directa al final del script. Al estar al final del body en el HTML,
// los elementos de la tabla ya existen y la función se ejecutará siempre
// sin depender de eventos adicionales.
obtenerVideoCalificacion();