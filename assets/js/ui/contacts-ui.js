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
 * @param {object} staticData - Objeto con los datos estáticos de los elementos de contacto.
 * @param {HTMLElement} contactTitleEl - Elemento del DOM para el título de contacto.
 * @param {HTMLElement} formTitleEl - Elemento del DOM para el título del formulario.
 * @param {HTMLElement} contactListEl - Elemento del DOM para la lista de contactos.
 */
function setContacts(langData, staticData, contactTitleEl, formTitleEl, contactListEl) {
    contactTitleEl.textContent = langData.contact.title;
    formTitleEl.textContent = langData.contact.formTitle;

    contactListEl.innerHTML = '';

    if (!staticData.contactItems) return;
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    staticData.contactItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'contact-me-item';

        const titleText = item.titleLangKey.split('.').reduce((o, i) => o[i], langData);
        const descriptionText = item.descriptionLangKey.split('.').reduce((o, i) => o[i], langData);
        const urlTitleText = item.urlTitleLangKey.split('.').reduce((o, i) => o[i], langData);

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
        fragment.appendChild(listItem);
    });
    
    // Single DOM operation
    contactListEl.appendChild(fragment);
}

export { setContacts };
