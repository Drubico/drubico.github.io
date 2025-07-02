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
 * @param {object} data.about.services.mobileApps - Textos para el servicio de aplicaciones móviles.
 * @param {string} data.about.services.mobileApps.title - Título para aplicaciones móviles.
 * @param {string} data.about.services.mobileApps.description - Descripción para aplicaciones móviles.
 * @param {object} data.about.services.webDevelopment - Textos para el servicio de desarrollo web.
 * @param {string} data.about.services.webDevelopment.title - Título para desarrollo web.
 * @param {string} data.about.services.webDevelopment.description - Descripción para desarrollo web.
 * @param {object} data.about.skills - Textos para la subsección de habilidades.
 * @param {string} data.about.skills.title - Título para la subsección de habilidades.
 */
function setAbout(data) {
    document.querySelector("[data-about-title]").textContent = data.about.title;
    document.querySelector("[data-about-intro]").textContent = data.about.intro;
    document.querySelector("[data-about-description]").textContent = data.about.description;
    document.querySelector("[data-service-title]").textContent = data.about.services.title;
    document.querySelector("[data-mobile-app-title]").textContent = data.about.services.mobileApps.title;
    document.querySelector("[data-mobile-app-description]").textContent = data.about.services.mobileApps.description;
    document.querySelector("[data-web-dev-title]").textContent = data.about.services.webDevelopment.title;
    document.querySelector("[data-web-dev-description]").textContent = data.about.services.webDevelopment.description;
    document.querySelector("[data-skills-title]").textContent = data.about.skills.title;
}
export { setAbout };
