const API = "http://127.0.0.1:5000/calificaciones";


// ===============================================
// OBTENER CALIFICACIONES
// ===============================================

async function obtenerCalificaciones() {

    try {

        const response = await fetch(API);

        const calificaciones = await response.json();

        const tabla = document.getElementById("tablaCalificaciones");

        tabla.innerHTML = "";

        calificaciones.forEach(calificacion => {

            tabla.innerHTML += `
                <tr>
                    <td>${calificacion.id}</td>
                    <td>${calificacion.valor}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al obtener calificaciones");

    }

}


// ===============================================
// CREAR CALIFICACION
// ===============================================

document
    .getElementById("formCalificacion")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const valor = document.getElementById("valor").value;

        try {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    valor: valor
                })

            });

            if (response.ok) {

                alert("Calificación creada correctamente");

                document.getElementById("formCalificacion").reset();

                obtenerCalificaciones();

            } else {

                alert("Error al crear calificación");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });


// ===============================================
// BUSCAR
// ===============================================

function buscarCalificaciones() {

    const texto = document
        .getElementById("inputBuscar")
        .value
        .toLowerCase();

    const filas = document.querySelectorAll("#tablaCalificaciones tr");

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

obtenerCalificaciones();