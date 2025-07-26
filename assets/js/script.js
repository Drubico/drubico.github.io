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
import { initializeThemeManager } from './services/theme-manager.js';

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
  const sidebarEl = document.querySelector("[data-sidebar]");
  const sidebarBtnEl = document.querySelector("[data-sidebar-btn]");
  if (sidebarEl && sidebarBtnEl) {
    setSidebarClick(sidebarEl, sidebarBtnEl);
  } else {
    console.error("Sidebar elements not found. sidebarEl:", sidebarEl, "sidebarBtnEl:", sidebarBtnEl);
  }
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  setEventNavBar(navigationLinks, pages);
  languageMain(languageTagLS, langSpanish, langEnglish);
  initializeThemeManager();

  // Responsive filter select logic reutilizable
  function setupResponsiveFilterSelect() {
    document.querySelectorAll('.filter-select-box').forEach(box => {
      const selectBtn = box.querySelector('.filter-select');
      const filterList = box.querySelector('.filter-list');
      const selectValue = box.querySelector('.select-value');
      if (selectBtn && filterList && selectValue) {
        // Elimina listeners previos
        selectBtn.onclick = null;
        filterList.onclick = null;
        // Cierra menú y elimina clases activas
        box.classList.remove('open');
        selectBtn.classList.remove('active');
        filterList.classList.remove('active');
        // Asegura que solo un botón esté activo y el texto del select sea el correcto
        const activeBtn = filterList.querySelector('button.active');
        if (activeBtn) {
          selectValue.textContent = activeBtn.textContent;
          selectValue.setAttribute('data-category', activeBtn.getAttribute('data-category'));
          selectValue.setAttribute('data-lang', activeBtn.getAttribute('data-lang'));
        } else {
          // Si no hay activo, activa el primero
          const firstBtn = filterList.querySelector('button[data-filter-btn]');
          if (firstBtn) {
            firstBtn.classList.add('active');
            selectValue.textContent = firstBtn.textContent;
            selectValue.setAttribute('data-category', firstBtn.getAttribute('data-category'));
            selectValue.setAttribute('data-lang', firstBtn.getAttribute('data-lang'));
          }
        }
        // Click para abrir/cerrar menú
        selectBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          box.classList.toggle('open');
          selectBtn.classList.toggle('active');
          filterList.classList.toggle('active');
        });
        // Click fuera para cerrar
        document.addEventListener('click', function docClick(e) {
          if (!box.contains(e.target)) {
            box.classList.remove('open');
            selectBtn.classList.remove('active');
            filterList.classList.remove('active');
          }
        }, { once: true });
        // Al seleccionar un filtro, cerrar menú y actualizar select
        filterList.addEventListener('click', function (e) {
          if (e.target.matches('button[data-filter-btn]')) {
            // Quitar clase active de todos
            filterList.querySelectorAll('button[data-filter-btn]').forEach(btn => btn.classList.remove('active'));
            // Activar el seleccionado
            e.target.classList.add('active');
            // Actualizar texto y atributos
            selectValue.textContent = e.target.textContent;
            selectValue.setAttribute('data-category', e.target.getAttribute('data-category'));
            selectValue.setAttribute('data-lang', e.target.getAttribute('data-lang'));
            // Cerrar menú
            box.classList.remove('open');
            selectBtn.classList.remove('active');
            filterList.classList.remove('active');
          }
        });
      }
    });
  }
  setupResponsiveFilterSelect();

  // Exponer para recarga tras cambio de idioma
  window.setupResponsiveFilterSelect = setupResponsiveFilterSelect;

  const loadingElement = document.getElementById("loading");
  setTimeout(() => {
    loadingElement.style.display = "none";
  }, 300);
});