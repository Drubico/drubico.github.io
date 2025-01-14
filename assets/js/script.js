'use strict';

import { setAbout } from './data-about.js';
import { setContacts } from './data-contacts.js';
import { setExperience } from './data-experience.js';
import { setModal } from './data-modal.js';
import { setNavBarData, setEventNavBar } from './data-navbar.js';
import { renderProjects } from './data-projects.js';
import { setSidebar } from './data-sidebar.js';
import { setFilters, setFilterBox, setFilterDefaultValue } from './filters.js';


document.addEventListener("DOMContentLoaded", function () {
  // Retrieve currentLang and currentJsonPath from localStorage or set defaults
  let currentLang = localStorage.getItem("currentLang") || "es";
  let currentJsonPath = localStorage.getItem("jsonPath") || "assets/lang-es.json";
  let langToggleSrc = localStorage.getItem("langToggleSrc") || "assets/images/usa.svg";
  let langToggleAlt = localStorage.getItem("langToggleAlt") || "English";
  const langToggle = document.getElementById("lang-toggle");
  langToggle.src = langToggleSrc;
  langToggle.alt = langToggleAlt;

  // Function to set current language and save to localStorage
  function setCurrentLang(lang, jsonPath, imgSrc, imgAlt) {
    currentLang = lang;
    currentJsonPath = jsonPath;
    langToggleSrc = imgSrc;
    langToggleAlt = imgAlt;
    langToggle.src = imgSrc;
    langToggle.alt = imgAlt;
    localStorage.setItem("currentLang", currentLang);
    localStorage.setItem("jsonPath", currentJsonPath);
    localStorage.setItem("langToggleSrc", langToggleSrc);
    localStorage.setItem("langToggleAlt", langToggleAlt);
  }
  document.getElementById("lang-toggle").addEventListener("click", () => {
    if (currentLang === "en") {
      loadLanguage("assets/lang-es.json");
      setCurrentLang("es", "assets/lang-es.json", "assets/images/usa.svg", "English");
    } else {
      loadLanguage("assets/lang.json");
      setCurrentLang("en", "assets/lang.json", "assets/images/spain.svg", "Español");
    }
  });
  setEventNavBar();
  setFilterBox();

  // Function to load language file
  function loadLanguage(langFile) {
    fetch(langFile)
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
  // Load the language file based on currentJsonPath
  loadLanguage(currentJsonPath);
});
