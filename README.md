# NETPOLIX - Flask Web Application

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Sistema web de gestión de videos con arquitectura profesional.**
*Desarrollado con Flask, SQLAlchemy, MySQL, Bootstrap 5 y JavaScript.*

</div>

---

## Características

- **Gestión de Videos:** CRUD completo (Crear, Leer, Actualizar, Eliminar).
- **Categorización:** Clasificación de películas por géneros.
- **Calificaciones:** Sistema de valoración de contenidos.
- **Relaciones Avanzadas:** Vinculación dinámica Video-Categoría y Video-Calificación.
- **API REST:** Backend robusto con Flask y SQLAlchemy ORM.
- **Interfaz Premium:** Diseño oscuro estilo "Netflix" con Bootstrap 5.
- **Responsive:** Adaptable a dispositivos móviles y tablets.

---

## Capturas del Sistema

<div align="center">

### Interfaz Principal
![Inicio](screenshots/inicio.webp)

| Gestión de Videos | Gestión de Categorías |
| :---: | :---: |
| ![Videos](screenshots/videos.webp) | ![Categorías](screenshots/categorias.webp) |

| Relaciones Categoría | Relaciones Calificación |
| :---: | :---: |
| ![Video Categoría](screenshots/videocategoria.webp) | ![Video Calificación](screenshots/videocalificacion.webp) |

</div>

---

## Tecnologías Utilizadas

### Backend
- **Python 3.10+**: Lenguaje base.
- **Flask**: Framework web para la API.
- **Flask-CORS**: Manejo de políticas de origen cruzado.
- **SQLAlchemy**: ORM para gestión de base de datos.
- **MySQL**: Motor de base de datos relacional.
- **python-dotenv**: Gestión de variables de entorno.

### Frontend
- **HTML5 & CSS3**: Estructura y estilos personalizados (Dark Theme).
- **Bootstrap 5**: Framework de diseño y componentes.
- **JavaScript (Vanilla)**: Lógica de consumo de API mediante fetch().
- **Bootstrap Icons**: Librería de iconos vectoriales.

---

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/netpolix.git
cd netpolix
```

### 2. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz con los siguientes datos:
```text
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_NAME=netpolix
```

---

## Ejecución

Para iniciar el servidor de desarrollo:
```bash
python app.py
```
La API estará disponible en `http://127.0.0.1:5000`. La interfaz se puede visualizar abriendo `index.html` en el navegador.

---

## Estructura del Proyecto

```text
NETPOLIX/
├── app.py                # Punto de entrada y Endpoints API
├── conexion.py           # Configuración de SQLAlchemy y Entorno
├── models.py             # Modelos de Base de Datos (ORM)
├── requirements.txt      # Dependencias del proyecto
├── .env                  # Variables sensibles (Ignorado en Git)
├── index.html            # Dashboard Principal
├── video.html            # Gestión de películas
├── categorias.html       # Gestión de categorías
├── calificaciones.html   # Gestión de calificaciones
├── videoCategoria.html   # Relaciones películas-categoría
├── videoCalificacion.html# Relaciones películas-calificación
└── static/
    ├── css/
    │   └── styles.css    # Estilos personalizados
    └── js/               # Lógica de frontend (Fetch)
        ├── video.js
        ├── categorias.js
        ├── calificaciones.js
        ├── videoCategoria.js
        └── videoCalificacion.js
```

---

## Arquitectura del Proyecto

```text
Frontend (HTML + Bootstrap + JavaScript)
↓
Fetch API
↓
Flask API REST
↓
SQLAlchemy ORM
↓
MySQL
```

---

## Autor

**Johan Moreno**
Desarrollador de Software
