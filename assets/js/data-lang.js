import { setAbout } from './data-about.js';
import { setContacts } from './data-contacts.js';
import { setExperience } from './data-experience.js';
import { setModal } from './data-modal.js';
import { setNavBarData } from './data-navbar.js';
import { renderProjects } from './data-projects.js';
import { setSidebar } from './data-sidebar.js';
import { setFilters, setFilterDefaultValue } from './filters.js';


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
        currentLanguage = currentLanguage === langSpanish ? langEnglish : langSpanish;
        setLanguageData(currentLanguage);
        localStorage.setItem(languageTagLS, currentLanguage.lang);
    });
}

function setLanguageData(language) {
    const langToggle = document.getElementById("lang-toggle");
    langToggle.src = language.imgSrc;
    langToggle.alt = language.imgAlt;
    fetch(language.jsonPath)
        .then((response) => response.json())
        .then((data) => {
            const filterItems = [
                { category: 'all', lang: 'portfolio.filter.all', text: data.portfolio.filter.all, active: true },
                { category: 'applications', lang: 'portfolio.filter.applications', text: data.portfolio.filter.applications, active: false },
                { category: 'webDevelopment', lang: 'portfolio.filter.webDevelopment', text: data.portfolio.filter.webDevelopment, active: false },
            ];
            setExperience(data);
            setAbout(data);
            setContacts(data);
            renderProjects(data.portfolio.projects);
            setModal(data);
            setNavBarData(data);
            setSidebar(data);
            setFilters(filterItems);
            setFilterDefaultValue(filterItems);
        })
        .catch((error) => console.error("Error al cargar el archivo de idioma:", error));
}


export { languageMain };