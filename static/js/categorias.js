const API = "http://127.0.0.1:5000/categorias";


// ===============================================
// OBTENER CATEGORIAS
// ===============================================

async function obtenerCategorias() {

    try {

        const response = await fetch(API);

        const categorias = await response.json();

        const tabla = document.getElementById("tablaCategorias");

        tabla.innerHTML = "";

        categorias.forEach(categoria => {

            tabla.innerHTML += `
                <tr>
                    <td>${categoria.id}</td>
                    <td>${categoria.nombre}</td>
                    <td>${categoria.descripcion}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Error al obtener categorías");

    }

}


// ===============================================
// BUSCAR CATEGORIAS
// ===============================================

function buscarCategorias() {

    const texto = document
        .getElementById("inputBuscar")
        .value
        .toLowerCase();

    const filas = document.querySelectorAll("#tablaCategorias tr");

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
// CREAR CATEGORIA
// ===============================================

document
    .getElementById("formCategoria")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;

        const descripcion = document.getElementById("descripcion").value;

        try {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion
                })

            });

            if (response.ok) {

                alert("Categoría creada correctamente");

                document.getElementById("formCategoria").reset();

                obtenerCategorias();

            } else {

                alert("Error al crear categoría");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });

// ===============================================
// EDITAR CATEGORIA
// ===============================================

document
    .getElementById("formEditarCategoria")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const id = document.getElementById("editar_id").value;

        const nombre = document.getElementById("editar_nombre").value;

        const descripcion = document.getElementById("editar_descripcion").value;

        try {

            const response = await fetch(`${API}/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion
                })

            });

            if (response.ok) {

                alert("Categoría actualizada correctamente");

                document
                    .getElementById("formEditarCategoria")
                    .reset();

                obtenerCategorias();

            } else {

                alert("Error al actualizar categoría");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });

// ===============================================
// ELIMINAR CATEGORIA
// ===============================================

document
    .getElementById("formEliminarCategoria")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const id = document.getElementById("eliminar_id").value;

        const confirmar = confirm(
            "¿Seguro que deseas eliminar esta categoría?"
        );

        if (!confirmar) return;

        try {

            const response = await fetch(`${API}/${id}`, {

                method: "DELETE"

            });

            if (response.ok) {

                alert("Categoría eliminada correctamente");

                document
                    .getElementById("formEliminarCategoria")
                    .reset();

                obtenerCategorias();

            } else {

                alert("Error al eliminar categoría");

            }

        } catch (error) {

            console.error(error);

            alert("Error de conexión");

        }

    });

// ===============================================
// CARGAR AL INICIAR
// ===============================================

obtenerCategorias();