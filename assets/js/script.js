'use strict';

import { languageMain } from './data-lang.js';
import { loadLinkedin } from './linkedin.js';
import { setEventNavBar } from './data-navbar.js';
import { setSidebarClick } from './data-sidebar.js';
import { setFilterBox } from './filters.js';

let languageTagLS = "languageTag"; ;

let langSpanish = {
  "lang": "es",
  "jsonPath": "assets/lang-es.json",
  "imgSrc": "assets/images/usa.svg",
  "imgAlt": "English",
}

let langEnglish = {
  "lang": "en",
  "jsonPath": "assets/lang.json",
  "imgSrc": "assets/images/spain.svg",
  "imgAlt": "Español",
}

document.addEventListener("DOMContentLoaded", function () {
  loadLinkedin();
  setSidebarClick();
  setEventNavBar();
  setFilterBox();
  languageMain(languageTagLS, langSpanish, langEnglish);

  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "none";
});