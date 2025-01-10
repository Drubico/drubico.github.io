function setModal(data) {
    const modal = document.getElementById("project-modal");
    const overlay = modal.querySelector('[data-overlay]');
    const closeButton = modal.querySelector('[data-modal-close-btn]');
    const modalImg = modal.querySelector('[data-modal-img]');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const modalText = modal.querySelector('[data-modal-text]');
    // Modal
    document.querySelectorAll('.project-item').forEach(item => {
        item.querySelector('.project-img').addEventListener('click', (e) => {
            e.stopPropagation();
            const projectImg = item.querySelector('img').src;
            const projectTitle = item.querySelector('.project-title').textContent;
            const projectCategory = item.querySelector('.project-category').textContent;
            const projectDescription = item.querySelector('.project-description').innerHTML;

            modalImg.src = projectImg;
            modalTitle.textContent = projectTitle;
            modalText.innerHTML = `
            <div class="project-container">
                <span class="project-category">${projectCategory}</span>
                <div class="project-links"></div>
            </div>
            <div class="project-description">${projectDescription}</div>
            <h4 class="project-title" >${data.portfolio.technologies.title}</h4>
            <div class="project-details"></div>`;

            // Add links
            const modalLinks = modalText.querySelector('.project-links');
            modalLinks.innerHTML = "";
            const links = item.querySelectorAll('.project-link');

            if (links.length > 0) {
                links.forEach(link => {
                    const linkElement = document.createElement("a");
                    linkElement.className = "project-link";
                    linkElement.href = link.href;
                    linkElement.textContent = link.textContent;
                    linkElement.target = "_blank"; // Open link in a new tab
                    modalLinks.appendChild(linkElement);
                });
            }

            const modalDetails = modalText.querySelector('.project-details');
            modalDetails.innerHTML = "";

            // Add languages
            const languages = item.querySelectorAll('.project-language');
            languages.forEach(language => {
                const languageElement = document.createElement("span");
                languageElement.className = "project-language";
                languageElement.textContent = language.textContent;
                modalDetails.appendChild(languageElement);
            });

            // Add frameworks
            const frameworks = item.querySelectorAll('.project-framework');
            frameworks.forEach(framework => {
                const frameworkElement = document.createElement("span");
                frameworkElement.className = "project-framework";
                frameworkElement.textContent = framework.textContent;
                modalDetails.appendChild(frameworkElement);
            });

            // Add libraries
            const libraries = item.querySelectorAll('.project-library');
            libraries.forEach(library => {
                const libraryElement = document.createElement("span");
                libraryElement.className = "project-library";
                libraryElement.textContent = library.textContent;
                modalDetails.appendChild(libraryElement);
            });
            modal.classList.add('active');
            overlay.classList.add('active');
            document.querySelector('.modal-content').classList.add('modal-active');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
    });

    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
    });
}

export { setModal };