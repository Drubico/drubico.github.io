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

const dataUrl = 'assets/data.json';

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
            setSidebar(langData);
            const filterItems = setTextProject(langData);
            setFilters(filterItems);
            setFilterDefaultValue(filterItems);
        })
        .catch((error) => console.error("Error al cargar los archivos de datos:", error));
}


export { languageMain };