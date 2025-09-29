/**
 * @file Gestiona el cambio de idioma y la carga de datos en toda la aplicación.
 * @author Diego Rubi
 * @copyright 2025
 */

import { setAbout } from '../ui/about-ui.js';
import { setContacts } from '../ui/contacts-ui.js';
import { setExperience } from '../ui/experience-ui.js';
import { setModal } from '../ui/modal-ui.js';
import { setCertifications } from '../ui/certifications-ui.js';
import { setNavBarData } from '../ui/navbar-ui.js';
import { renderProjects } from '../ui/projects-ui.js';
import { setTextProject } from './projects-service.js';
import { setSidebar } from '../ui/sidebar-ui.js';
import { setFilters, setFilterDefaultValue, setFilterBox } from '../ui/filters-ui.js';
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
    // Actualiza el atributo lang del documento para formateo correcto
    document.documentElement.setAttribute('lang', language.lang || 'es');

    Promise.all([fetch(language.jsonPath).then(res => res.json()), fetch(dataUrl).then(res => res.json())])
        .then(([langData, staticData]) => {
            // Get DOM elements for loadSkills
            const skillListEl = document.querySelector('.skill-list');
            loadSkills(staticData, skillListEl);
            // Get DOM elements for setExperience
            const resumeTitleEl = document.querySelector("[data-lang='resume.title']");
            const experienceTitleEl = document.querySelector("[data-lang='resume.experience.title']");
            const educationTitleEl = document.querySelector("[data-lang='resume.education.title']");
            const experienceTimelineEl = document.getElementById("experience-timeline");
            const educationTimelineEl = document.getElementById("education-timeline");

            setExperience(
                langData,
                resumeTitleEl,
                experienceTitleEl,
                educationTitleEl,
                experienceTimelineEl,
                educationTimelineEl,
                staticData.experienceLogos || {}
            );
            // Get DOM elements for setCertifications
            const certificationsTitleEl = document.querySelector("[data-lang='resume.certifications.title']");
            const certificationListEl = document.getElementById("certification-list");
            if (certificationsTitleEl && certificationListEl) {
                setCertifications(langData, staticData, certificationsTitleEl, certificationListEl);
            }
            // Get DOM elements for setAbout
            const aboutTitleEl = document.querySelector("[data-about-title]");
            const aboutIntroEl = document.querySelector("[data-about-intro]");
            const aboutDescriptionEl = document.querySelector("[data-about-description]");
            const serviceTitleEl = document.querySelector("[data-service-title]");
            const serviceListEl = document.getElementById("service-list");
            const skillsTitleEl = document.querySelector("[data-skills-title]");

            setAbout(langData, aboutTitleEl, aboutIntroEl, aboutDescriptionEl, serviceTitleEl, serviceListEl, skillsTitleEl);
            // Get DOM elements for setContacts
            const contactTitleEl = document.querySelector("[data-lang='contact.title']");
            const formTitleEl = document.querySelector("[data-lang='contact.formTitle']");
            const contactListEl = document.querySelector('.contact-me-list');

            setContacts(langData, staticData, contactTitleEl, formTitleEl, contactListEl);
            // Get DOM elements for renderProjects
            const projectListEl = document.getElementById("project-list");
            renderProjects(langData.portfolio.projects, staticData, projectListEl);
            // Get DOM elements for setModal
            const projectModalEl = document.getElementById("project-modal");
            setModal(langData, staticData, projectModalEl, null);
            // Get DOM elements for setNavBarData
            const navigationLinks = document.querySelectorAll("[data-nav-link]");
            setNavBarData(langData, navigationLinks);
            // Get DOM elements for setSidebar
            const contactsListEl = document.getElementById("contacts-list");
            const nameEl = document.querySelector(".name");
            const titleEl = document.querySelector(".title");
            const showContactsBtnEl = document.querySelector("[data-show-contacts]");
            setSidebar(langData, staticData, contactsListEl, nameEl, titleEl, showContactsBtnEl);
            const filterItems = setTextProject(langData);
            // Get DOM elements for setFilters and setFilterDefaultValue
            const filterListElements = document.querySelectorAll('.filter-list');
            let filterButtonsElements = document.querySelectorAll("[data-filter-btn]"); // Changed to let
            const filterItemsToFilter = document.querySelectorAll("[data-filter-item]");
            const filterSelectValueEl = document.querySelector('.select-value');

            setFilters(filterItems, filterListElements, filterButtonsElements, filterItemsToFilter);
            // Reaplicar lógica select responsive tras regenerar filtros
            if (window.setupResponsiveFilterSelect) window.setupResponsiveFilterSelect();
            // Re-query filterButtonsElements after setFilters has rendered them
            filterButtonsElements = document.querySelectorAll("[data-filter-btn]");
            setFilterDefaultValue(filterItems, filterSelectValueEl, filterButtonsElements, filterItemsToFilter);
            // Get DOM elements for setFilterBox
            const filterSelectBox = document.querySelector('.filter-select-box');
            setFilterBox(filterSelectBox, filterButtonsElements, filterItemsToFilter);
        })
        .catch((error) => console.error("Error al cargar los archivos de datos:", error));
}


export { languageMain };