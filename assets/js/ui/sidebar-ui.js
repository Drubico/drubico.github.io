/**
 * @file Gestiona la interfaz de usuario de la barra lateral (sidebar).
 * @author Diego Rubi
 * @copyright 2025
 */

import { calculateAge } from '../services/utils.js';

/**
 * Rellena la barra lateral con la información de contacto y personal.
 * @param {object} data - Objeto que contiene los datos de la barra lateral.
 * @param {object} staticData - Objeto que contiene los datos estáticos.
 * @param {HTMLElement} contactsListEl - Elemento del DOM para la lista de contactos.
 * @param {HTMLElement} nameEl - Elemento del DOM para el nombre.
 * @param {HTMLElement} titleEl - Elemento del DOM para el título/rol.
 * @param {HTMLElement} showContactsBtnEl - Elemento del DOM para el botón de mostrar contactos.
 */
function setSidebar(data, staticData, contactsListEl, nameEl, titleEl, showContactsBtnEl) {
    contactsListEl.innerHTML = "";

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

        contactsListEl.appendChild(contactItem);
    });

    nameEl.textContent = data.sidebar.name;
    titleEl.textContent = data.sidebar.title;
    showContactsBtnEl.textContent = data.sidebar.showContactsBtn;
}

/**
 * Configura el evento de clic para el botón que muestra u oculta la barra lateral en vista móvil.
 * @param {HTMLElement} sidebarEl - Elemento del DOM de la barra lateral.
 * @param {HTMLElement} sidebarBtnEl - Elemento del DOM del botón de la barra lateral.
 */
function setSidebarClick(sidebarEl, sidebarBtnEl) {
    const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }
    sidebarBtnEl.addEventListener("click", function () { elementToggleFunc(sidebarEl); });
}

export { setSidebar, setSidebarClick };
