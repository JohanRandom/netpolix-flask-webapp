const API = "http://127.0.0.1:5000/videos";


// ===============================================
// OBTENER VIDEOS
// ===============================================

async function obtenerVideos() {

    try {

        const response = await fetch(API);

        const videos = await response.json();

        const tabla = document.getElementById("tablaVideos");

        tabla.innerHTML = "";

        videos.forEach(video => {

            tabla.innerHTML += `
                <tr>
                    <td>${video.id}</td>
                    <td>${video.titulo}</td>
                    <td>${video.anio}</td>
                    <td>${video.duracion} min</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al obtener videos");

    }

}


// ===============================================
// CREAR VIDEO
// ===============================================

document
    .getElementById("formCategoria")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const titulo = document.getElementById("titulo").value;

        const anio = document.getElementById("anio").value;

        const duracion = document.getElementById("duracion").value;

        try {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    titulo: titulo,
                    anio: parseInt(anio),
                    duracion: parseInt(duracion)
                })

            });

            if (response.ok) {

                alert("Video creado correctamente");

                document.getElementById("formCategoria").reset();

                obtenerVideos();

            } else {

                alert("Error al crear video");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });


// ===============================================
// BUSCAR VIDEOS
// ===============================================

function buscarVideos() {

    const texto = document
        .getElementById("inputBuscar")
        .value
        .toLowerCase();

    const filas = document.querySelectorAll("#tablaVideos tr");

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
// INICIO
// ===============================================

obtenerVideos();