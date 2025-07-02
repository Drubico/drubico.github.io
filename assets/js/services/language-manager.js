/**
 * @file Gestiona el cambio de idioma y la carga de datos en toda la aplicación.
 * @author Diego Rubi
 * @copyright 2025
 */

import { setAbout } from '../ui/about-ui.js';
import { setContacts } from '../ui/contacts-ui.js';
import { setExperience } from '../ui/experience-ui.js';
import { setModal } from '../ui/modal-ui.js';
import { setNavBarData } from '../ui/navbar-ui.js';
import { renderProjects } from '../ui/projects-ui.js';
import { setTextProject } from './projects-service.js';
import { setSidebar } from '../ui/sidebar-ui.js';
import { setFilters, setFilterDefaultValue } from '../ui/filters-ui.js';
import { loadSkills } from '../ui/skills-ui.js';

/**
 * URL del archivo de datos estáticos.
 * @type {string}
 */
const dataUrl = 'assets/data.json';

/**
 * Función principal para inicializar y gestionar el cambio de idioma.
 * Determina el idioma actual desde localStorage, establece los datos iniciales y
 * configura el evento de clic para el botón de cambio de idioma.
 * @param {string} languageTagLS - La clave utilizada para guardar la etiqueta de idioma en localStorage.
 * @param {object} langSpanish - Objeto de configuración para el idioma español.
 * @param {object} langEnglish - Objeto de configuración para el idioma inglés.
 */
function languageMain(languageTagLS, langSpanish, langEnglish) {
    let currentLanguageTag = localStorage.getItem(languageTagLS);
    let currentLanguage = langSpanish;
    if (currentLanguageTag === "en") {
        currentLanguage = langEnglish;
    } else {
        currentLanguage = langSpanish;
    }

    setLanguageData(currentLanguage);

    document.getElementById("lang-toggle").addEventListener("click", () => {
        const loadingElement = document.getElementById("loading");
        loadingElement.style.display = "flex";
        currentLanguage = currentLanguage === langSpanish ? langEnglish : langSpanish;
        setLanguageData(currentLanguage);
        localStorage.setItem(languageTagLS, currentLanguage.lang);
        setTimeout(() => {
            loadingElement.style.display = "none";
        }, 10);
    });
}

/**
 * Carga los datos del idioma seleccionado y los datos estáticos, y luego actualiza toda la interfaz de usuario.
 * @param {object} language - El objeto de configuración del idioma a establecer.
 * @param {string} language.imgSrc - Ruta del archivo de imagen para la bandera del idioma.
 * @param {string} language.imgAlt - Texto alternativo para la imagen de la bandera.
 * @param {string} language.jsonPath - Ruta del archivo JSON con las traducciones del idioma.
 */
function setLanguageData(language) {
    const langToggle = document.getElementById("lang-toggle");
    langToggle.src = language.imgSrc;
    langToggle.alt = language.imgAlt;

    Promise.all([fetch(language.jsonPath).then(res => res.json()), fetch(dataUrl).then(res => res.json())])
        .then(([langData, staticData]) => {
            loadSkills(staticData);
            setExperience(langData);
            setAbout(langData);
            setContacts(langData, staticData);
            renderProjects(langData.portfolio.projects);
            setModal(langData);
            setNavBarData(langData);
            setSidebar(langData, staticData);
            const filterItems = setTextProject(langData);
            setFilters(filterItems);
            setFilterDefaultValue(filterItems);
        })
        .catch((error) => console.error("Error al cargar los archivos de datos:", error));
}


export { languageMain };