function setContacts(langData, staticData) {
    // Set contact section
    document.querySelector("[data-lang='contact.title']").textContent = langData.contact.title;
    document.querySelector("[data-lang='contact.formTitle']").textContent = langData.contact.formTitle;

    const contactList = document.querySelector('.contact-me-list');
    contactList.innerHTML = ''; // Clear existing items

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
