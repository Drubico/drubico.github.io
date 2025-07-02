/**
 * @file Gestiona la interfaz de usuario para la sección de contacto.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Rellena la sección de contacto con datos estáticos y de idioma.
 * Limpia los elementos de contacto existentes y genera dinámicamente nuevos elementos
 * basados en los datos proporcionados, traduciendo los textos según el idioma actual.
 * @param {object} langData - Objeto con los textos traducidos.
 * @param {object} langData.contact - Textos específicos para la sección de contacto.
 * @param {object} staticData - Objeto con los datos estáticos de los elementos de contacto.
 * @param {Array<object>} staticData.contactItems - Lista de elementos de contacto.
 * @param {string} staticData.contactItems[].icon - URL del icono.
 * @param {string} staticData.contactItems[].alt - Texto alternativo del icono.
 * @param {boolean} staticData.contactItems[].isRounded - Define si el icono tiene fondo redondeado.
 * @param {string} staticData.contactItems[].titleLangKey - Clave de idioma para el título.
 * @param {string} staticData.contactItems[].descriptionLangKey - Clave de idioma para la descripción.
 * @param {string} staticData.contactItems[].urlTitleLangKey - Clave de idioma para el texto del enlace.
 * @param {string} staticData.contactItems[].link - URL del enlace.
 */
function setContacts(langData, staticData) {
    document.querySelector("[data-lang='contact.title']").textContent = langData.contact.title;
    document.querySelector("[data-lang='contact.formTitle']").textContent = langData.contact.formTitle;

    const contactList = document.querySelector('.contact-me-list');
    contactList.innerHTML = '';

    if (staticData.contactItems) {
        staticData.contactItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'contact-me-item';

            let titleText = item.titleLangKey.split('.').reduce((o, i) => o[i], langData);
            let descriptionText = item.descriptionLangKey.split('.').reduce((o, i) => o[i], langData);
            let urlTitleText = item.urlTitleLangKey.split('.').reduce((o, i) => o[i], langData);

            listItem.innerHTML = `
                <div class="contact-me-icon-box">
                    <img src="${item.icon}" alt="${item.alt}" width="100" class="${item.isRounded ? 'rounded-background' : ''}" />
                </div>
                <div class="contact-me-content-box">
                    <h4 class="h4 contact-me-item-title">${titleText}</h4>
                    <div>
                        <p class="contact-me-item-description">${descriptionText}</p>
                    </div>
                    <div>
                        <a class="project-link" href="${item.link}" target="_blank">${urlTitleText}</a>
                    </div>
                </div>
            `;
            contactList.appendChild(listItem);
        });
    }
}

export { setContacts };
