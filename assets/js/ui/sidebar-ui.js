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
 * @param {Array<object>} data.sidebar.contacts - Información de contacto.
 * @param {string} data.sidebar.name - Nombre del titular del portafolio.
 * @param {string} data.sidebar.title - Título o rol profesional.
 * @param {string} data.sidebar.showContactsBtn - Texto para el botón de mostrar contactos.
 * @param {object} staticData - Objeto que contiene los datos estáticos.
 * @param {Array<object>} staticData.sidebarContacts - Información de contacto de la barra lateral.
 */
function setSidebar(data, staticData) {
    const contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = "";

    staticData.sidebarContacts.forEach(contact => {
        const contactItem = document.createElement("li");
        contactItem.className = "contact-item";

        const iconBox = document.createElement("div");
        iconBox.className = "icon-box";
        const icon = document.createElement("ion-icon");
        icon.name = contact.icon;
        iconBox.appendChild(icon);

        const contactInfo = document.createElement("div");
        contactInfo.className = "contact-info";

        const contactTitle = document.createElement("p");
        contactTitle.className = "contact-title";
        contactTitle.textContent = data.sidebar.contacts[contact.type].title;

        let contactLink;
        if (contact.type === 'age') {
            contactLink = document.createElement("time");
            contactLink.textContent = calculateAge(new Date(contact.datetime)) + " " + data.sidebar.contacts.age.unit;
            contactLink.setAttribute("datetime", contact.datetime);
        } else if (contact.type === 'address') {
            contactLink = document.createElement("address");
            contactLink.textContent = contact.text;
        } else {
            contactLink = document.createElement("a");
            contactLink.href = contact.link;
            contactLink.textContent = contact.text;
            if (contact.type === 'linkedin') contactLink.target = "_blank";
        }
        contactLink.className = "contact-link";

        contactInfo.appendChild(contactTitle);
        contactInfo.appendChild(contactLink);

        contactItem.appendChild(iconBox);
        contactItem.appendChild(contactInfo);

        contactsList.appendChild(contactItem);
    });

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
