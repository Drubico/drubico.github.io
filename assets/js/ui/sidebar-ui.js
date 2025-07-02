/**
 * @file Gestiona la interfaz de usuario de la barra lateral (sidebar).
 * @author Diego Rubi
 * @copyright 2025
 */

import { calculateAge } from '../services/utils.js';

/**
 * Rellena la barra lateral con la información de contacto y personal.
 * @param {object} data - Objeto que contiene los datos de la barra lateral.
 * @param {object} data.sidebar - Datos específicos de la barra lateral.
 * @param {object} data.sidebar.contacts - Información de contacto.
 * @param {string} data.sidebar.name - Nombre del titular del portafolio.
 * @param {string} data.sidebar.title - Título o rol profesional.
 * @param {string} data.sidebar.showContactsBtn - Texto para el botón de mostrar contactos.
 */
function setSidebar(data) {
    document.querySelector('[data-contact-title="email"]').textContent = data.sidebar.contacts.email.title;
    const emailLink = document.querySelector('[data-contact-link="email"]');
    emailLink.textContent = data.sidebar.contacts.email.linkText;
    emailLink.href = data.sidebar.contacts.email.linkHref;
    document.querySelector('[data-contact-title="phone"]').textContent = data.sidebar.contacts.phone.title;
    const phoneLink = document.querySelector('[data-contact-link="phone"]');
    phoneLink.textContent = data.sidebar.contacts.phone.linkText;
    phoneLink.href = data.sidebar.contacts.phone.linkHref;
    document.querySelector('[data-contact-title="birthday"]').textContent = data.sidebar.contacts.birthday.title;
    document.querySelector("[data-birthday-date]").textContent =
        calculateAge(new Date(data.sidebar.contacts.birthday.datetime)) + " " + data.sidebar.contacts.birthday.unit;
    document.querySelector("[data-birthday-date]").setAttribute("datetime", data.sidebar.contacts.birthday.datetime);
    document.querySelector('[data-contact-title="location"]').textContent = data.sidebar.contacts.location.title;
    document.querySelector("[data-location-address]").textContent = data.sidebar.contacts.location.address;
    document.querySelector('[data-contact-title="linkedin"]').textContent = data.sidebar.contacts.linkedin.title;
    const linkedinLink = document.querySelector('[data-contact-link="linkedin"]');
    linkedinLink.textContent = data.sidebar.contacts.linkedin.linkText;
    linkedinLink.href = data.sidebar.contacts.linkedin.linkHref;
    document.querySelector(".name").textContent = data.sidebar.name;
    document.querySelector(".title").textContent = data.sidebar.title;
    document.querySelector("[data-show-contacts]").textContent = data.sidebar.showContactsBtn;
}

/**
 * Configura el evento de clic para el botón que muestra u oculta la barra lateral en vista móvil.
 */
function setSidebarClick() {
    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

export { setSidebar, setSidebarClick };
