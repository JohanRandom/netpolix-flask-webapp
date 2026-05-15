const API_RELACION = "http://127.0.0.1:5000/video-categoria";

const API_VIDEOS = "http://127.0.0.1:5000/videos";

const API_CATEGORIAS = "http://127.0.0.1:5000/categorias";


// ===============================================
// OBTENER VIDEO CATEGORIA
// ===============================================

async function obtenerVideoCategoria() {

    try {

        // RELACIONES
        const responseRelacion = await fetch(API_RELACION);

        const relaciones = await responseRelacion.json();


        // VIDEOS
        const responseVideos = await fetch(API_VIDEOS);

        const videos = await responseVideos.json();


        // CATEGORIAS
        const responseCategorias = await fetch(API_CATEGORIAS);

        const categorias = await responseCategorias.json();


        const tabla = document.getElementById("tablaVideoCategoria");

        tabla.innerHTML = "";


        relaciones.forEach(relacion => {

            // BUSCAR VIDEO
            const video = videos.find(v => v.id === relacion.video_id);

            // BUSCAR CATEGORIA
            const categoria = categorias.find(c => c.id === relacion.categoria_id);


            tabla.innerHTML += `
                <tr>
                    <td>${relacion.id}</td>
                    <td>${video ? video.titulo : "No encontrado"}</td>
                    <td>${categoria ? categoria.nombre : "No encontrada"}</td>
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
    .getElementById("formCategoria")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const video_id = document.getElementById("video_id").value;

        const categoria_id = document.getElementById("categoria_id").value;

        try {

            const response = await fetch(API_RELACION, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    video_id: parseInt(video_id),
                    categoria_id: parseInt(categoria_id)
                })

            });

            if (response.ok) {

                alert("Relación creada correctamente");

                document.getElementById("formCategoria").reset();

                obtenerVideoCategoria();

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

function buscarVideoCategoria() {

    const texto = document
        .getElementById("inputBuscar")
        .value
        .toLowerCase();

    const filas = document.querySelectorAll("#tablaVideoCategoria tr");

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

                obtenerVideoCategoria();

            } else {

                alert("Error al eliminar relación");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });

// ===============================================
// INICIO
// ===============================================

obtenerVideoCategoria();