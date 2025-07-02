# Portfolio

Mi portafolio personal, construido con HTML, CSS y JavaScript puro. El contenido se carga dinámicamente desde archivos JSON para facilitar la actualización y el mantenimiento.

## ¿Cómo funciona?

El sitio web utiliza JavaScript para leer los datos de los archivos JSON y generar el contenido HTML dinámicamente. Esto permite separar el contenido de la presentación, haciendo que el sitio sea más fácil de mantener y escalar.

La internacionalización (inglés y español) se gestiona a través de archivos de idioma JSON.

## Estructura de archivos de datos

-   `assets/data.json`: Contiene la estructura de datos principal para elementos como habilidades, información de contacto y proyectos. Este archivo no contiene texto visible para el usuario, sino claves que se utilizan para buscar las traducciones en los archivos de idioma.
-   `assets/lang.json`: Contiene todas las cadenas de texto para la versión en inglés del sitio.
-   `assets/lang-es.json`: Contiene todas las cadenas de texto para la versión en español del sitio.

## ¿Cómo agregar más datos?

Para agregar nuevo contenido, como proyectos, habilidades o experiencia, debes editar los archivos JSON correspondientes.

### Agregar un nuevo proyecto

1.  **Agrega los datos del proyecto en `assets/data.json`:**
    Añade un nuevo objeto al array `projects` con la siguiente estructura:

    ```json
    {
        "id": "nuevo-proyecto",
        "img": "nombre-imagen.webp",
        "images": [
            "./assets/images/nombre-imagen.webp"
        ],
        "languages": ["Kotlin"],
        "frameworks": ["Jetpack Compose"],
        "libraries": ["Firebase"],
        "links": {
            "github": "https://github.com/tu-usuario/nuevo-proyecto"
        }
    }
    ```

2.  **Agrega las traducciones en `assets/lang.json` y `assets/lang-es.json`:**
    Dentro del array `portfolio.projects` en ambos archivos de idioma, agrega un nuevo objeto. Asegúrate de que el `id` coincida con el que agregaste en `data.json`.

    En `assets/lang.json` (Inglés):
    ```json
    {
        "id": "nuevo-proyecto",
        "title": "New Project",
        "category": {
            "key": "applications",
            "value": "Applications"
        },
        "description": "Description of the new project.",
        "links": {
            "github": {
                "title": "View Source Code"
            }
        }
    }
    ```

    En `assets/lang-es.json` (Español):
    ```json
    {
        "id": "nuevo-proyecto",
        "title": "Nuevo Proyecto",
        "category": {
            "key": "applications",
            "value": "Aplicaciones"
        },
        "description": "Descripción del nuevo proyecto.",
        "links": {
            "github": {
                "title": "Ver código fuente"
            }
        }
    }
    ```

### Agregar una nueva habilidad

Añade un nuevo objeto al array `skills` en `assets/data.json`.

```json
{
    "icon": "./assets/images/nueva-habilidad.svg",
    "alt": "nueva-habilidad",
    "title": "Nueva Habilidad",
    "languages": [],
    "frameworks": [],
    "libraries": []
}
```

### Agregar nueva experiencia laboral

Añade un nuevo objeto al array `resume.experience.items` en `assets/lang.json` y `assets/lang-es.json`.

En `assets/lang.json` (Inglés):
```json
{
    "position": "New Position - Company",
    "dates": "Month Year — Present",
    "details": [
        "Responsibility 1",
        "Responsibility 2"
    ]
}
```

En `assets/lang-es.json` (Español):
```json
{
    "position": "Nuevo Puesto - Empresa",
    "dates": "Mes Año — Presente",
    "details": [
        "Responsabilidad 1",
        "Responsabilidad 2"
    ]
}
```