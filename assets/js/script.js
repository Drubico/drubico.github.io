/**
 * @file Script principal para inicializar la página.
 * @author Diego Rubi
 * @copyright 2025
 */

'use strict';

import { languageMain } from './services/language-manager.js';
import { setEventNavBar } from './ui/navbar-ui.js';
import { setSidebarClick } from './ui/sidebar-ui.js';
import { setFilterBox } from './ui/filters-ui.js';

/**
 * Clave para guardar el idioma en el Local Storage.
 * @type {string}
 */
let languageTagLS = "languageTag";

/**
 * Objeto de configuración para el idioma español.
 * @type {{lang: string, jsonPath: string, imgSrc: string, imgAlt: string}}
 */
let langSpanish = {
  "lang": "es",
  "jsonPath": "assets/lang-es.json",
  "imgSrc": "assets/images/spain.svg",
  "imgAlt": "Español",
}

/**
 * Objeto de configuración para el idioma inglés.
 * @type {{lang: string, jsonPath: string, imgSrc: string, imgAlt: string}}
 */
let langEnglish = {
  "lang": "en",
  "jsonPath": "assets/lang.json",
  "imgSrc": "assets/images/usa.svg",
  "imgAlt": "English",
}

/**
 * Se ejecuta cuando el contenido del DOM ha sido cargado.
 */
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