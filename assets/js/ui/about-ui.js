/**
 * @file Gestiona la interfaz de usuario para la sección "Sobre mí".
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Rellena la sección "Sobre mí" con los datos proporcionados y los elementos del DOM.
 * @param {object} data - El objeto de datos que contiene los textos para la sección.
 * @param {HTMLElement} aboutTitleEl - Elemento del DOM para el título "Sobre mí".
 * @param {HTMLElement} aboutIntroEl - Elemento del DOM para la introducción "Sobre mí".
 * @param {HTMLElement} aboutDescriptionEl - Elemento del DOM para la descripción "Sobre mí".
 * @param {HTMLElement} serviceTitleEl - Elemento del DOM para el título de servicios.
 * @param {HTMLElement} serviceListEl - Elemento del DOM para la lista de servicios.
 * @param {HTMLElement} skillsTitleEl - Elemento del DOM para el título de habilidades.
 */
function setAbout(data, aboutTitleEl, aboutIntroEl, aboutDescriptionEl, serviceTitleEl, serviceListEl, skillsTitleEl) {
    aboutTitleEl.textContent = data.about.title;
    aboutIntroEl.textContent = data.about.intro;
    aboutDescriptionEl.textContent = data.about.description;
    serviceTitleEl.textContent = data.about.services.title;

    serviceListEl.innerHTML = "";
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

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

        fragment.appendChild(serviceItem);
    });
    
    // Single DOM operation
    serviceListEl.appendChild(fragment);

    skillsTitleEl.textContent = data.about.skills.title;
}

export { setAbout };
