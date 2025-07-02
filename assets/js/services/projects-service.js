/**
 * @file Servicio para gestionar los datos de los proyectos del portafolio.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Establece el título de la sección de portafolio y genera la estructura de datos para los filtros.
 * @param {object} data - El objeto de datos que contiene los textos del portafolio.
 * @param {object} data.portfolio - Contiene los datos del portafolio.
 * @param {string} data.portfolio.title - El título de la sección de portafolio.
 * @param {object} data.portfolio.filter - Objeto con los textos para los botones de filtro.
 * @param {string} data.portfolio.filter.all - Texto para el filtro "Todos".
 * @param {string} data.portfolio.filter.applications - Texto para el filtro "Aplicaciones".
 * @param {string} data.portfolio.filter.webDevelopment - Texto para el filtro "Desarrollo Web".
 * @returns {Array<object>} Una lista de objetos de filtro para ser usados en la UI.
 */
function setTextProject(data) {
    const filterItems = [
        { category: 'all', lang: 'portfolio.filter.all', text: data.portfolio.filter.all, active: true },
        { category: 'applications', lang: 'portfolio.filter.applications', text: data.portfolio.filter.applications, active: false },
        { category: 'webDevelopment', lang: 'portfolio.filter.webDevelopment', text: data.portfolio.filter.webDevelopment, active: false },
    ];
    document.querySelector("[data-lang='portfolio.title']").textContent = data.portfolio.title;
    return filterItems;
}

export { setTextProject };
