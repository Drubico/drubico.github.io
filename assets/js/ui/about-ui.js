/**
 * @file Gestiona la interfaz de usuario para la sección "Sobre mí".
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Rellena la sección "Sobre mí" con los datos proporcionados.
 * @param {object} data - El objeto de datos que contiene los textos para la sección.
 * @param {object} data.about - Contiene los textos de la sección "Sobre mí".
 * @param {string} data.about.title - Título principal de la sección.
 * @param {string} data.about.intro - Texto de introducción.
 * @param {string} data.about.description - Descripción detallada.
 * @param {object} data.about.services - Textos para la subsección de servicios.
 * @param {string} data.about.services.title - Título de la subsección de servicios.
 * @param {Array<object>} data.about.services.items - Lista de servicios a mostrar.
 * @param {object} data.about.skills - Textos para la subsección de habilidades.
 * @param {string} data.about.skills.title - Título para la subsección de habilidades.
 */
function setAbout(data) {
    document.querySelector("[data-about-title]").textContent = data.about.title;
    document.querySelector("[data-about-intro]").textContent = data.about.intro;
    document.querySelector("[data-about-description]").textContent = data.about.description;
    document.querySelector("[data-service-title]").textContent = data.about.services.title;

    const serviceList = document.getElementById("service-list");
    serviceList.innerHTML = "";

    data.about.services.items.forEach(item => {
        const serviceItem = document.createElement("li");
        serviceItem.className = "service-item";

        const iconBox = document.createElement("div");
        iconBox.className = "service-icon-box";
        const icon = document.createElement("img");
        icon.src = item.icon;
        icon.alt = item.title;
        icon.width = 70;
        iconBox.appendChild(icon);

        const contentBox = document.createElement("div");
        contentBox.className = "service-content-box";
        const title = document.createElement("h4");
        title.className = "h4 service-item-title";
        title.textContent = item.title;
        const description = document.createElement("p");
        description.className = "service-item-text";
        description.textContent = item.description;
        contentBox.appendChild(title);
        contentBox.appendChild(description);

        serviceItem.appendChild(iconBox);
        serviceItem.appendChild(contentBox);

        serviceList.appendChild(serviceItem);
    });

    document.querySelector("[data-skills-title]").textContent = data.about.skills.title;
}

export { setAbout };
