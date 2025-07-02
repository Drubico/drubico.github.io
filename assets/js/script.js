'use strict';

import { languageMain } from './services/language-manager.js';
import { setEventNavBar } from './ui/navbar-ui.js';
import { setSidebarClick } from './ui/sidebar-ui.js';
import { setFilterBox } from './ui/filters-ui.js';

let languageTagLS = "languageTag";;

let langSpanish = {
  "lang": "es",
  "jsonPath": "assets/lang-es.json",
  "imgSrc": "assets/images/spain.svg",
  "imgAlt": "Español",
}

let langEnglish = {
  "lang": "en",
  "jsonPath": "assets/lang.json",
  "imgSrc": "assets/images/usa.svg",
  "imgAlt": "English",
}

document.addEventListener("DOMContentLoaded", function () {
  setSidebarClick();
  setEventNavBar();
  setFilterBox();
  languageMain(languageTagLS, langSpanish, langEnglish);

  const loadingElement = document.getElementById("loading");
  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 300);
});