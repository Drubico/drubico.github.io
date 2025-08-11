/**
 * @file Gestiona la interfaz de usuario de los modales para los detalles del proyecto y la visualización de imágenes.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Configura los modales para mostrar los detalles del proyecto y ampliar las imágenes.
 * Inicializa los listeners de eventos para cada proyecto, gestionando la apertura y cierre de los modales,
 * y la inicialización y destrucción de las instancias de Swiper para las galerías de imágenes.
 * @param {object} data - El objeto principal de datos que contiene la información del portafolio.
 * @param {object} data.portfolio - Contiene los datos del portafolio.
 * @param {Array<object>} data.portfolio.projects - Lista de proyectos a mostrar.
 * @param {object} data.portfolio.technologies - Textos relacionados con las tecnologías.
 */
function setModal(langData, staticData, projectModalEl, imageModalEl) {
    const modal = projectModalEl;
    const overlay = modal.querySelector('[data-overlay]');
    const closeButton = modal.querySelector('[data-modal-close-btn]');
    const swiperWrapper = modal.querySelector('.swiper-wrapper');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const modalText = modal.querySelector('[data-modal-text]');
    let swiperInstance = null;
    let currentSlideIndex = 0; // Guardar el índice actual del slide

    // Modal de imagen eliminado a solicitud. No se usará imageModalEl
    let currentProjectImages = []; // Guardar las imágenes del proyecto actual

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const projectId = item.getAttribute('data-id');
            if (!projectId) return;

            const projectLang = langData.portfolio.projects.find(p => p.id === projectId);
            const projectData = staticData.projects.find(p => p.id === projectId);

            if (!projectLang || !projectData) return;

            swiperWrapper.innerHTML = '';
            currentProjectImages = projectData.images || []; // Guardar las imágenes

            if (projectData.images && Array.isArray(projectData.images)) {
                projectData.images.forEach(imgUrl => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';

                    slide.innerHTML = `
                        <figure class="modal-avatar-box">
                            <img class="img-project" src="${imgUrl}" 
                                 alt="${projectLang.title}" width="100%">
                        </figure>
                    `;

                    swiperWrapper.appendChild(slide);
                });
            }

            if (swiperInstance) swiperInstance.destroy();

            swiperInstance = new Swiper(modal.querySelector('.swiper'), {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'cube',
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                observer: true,
                observeParents: true,
                on: {
                    slideChange: function () {
                        currentSlideIndex = this.activeIndex; // Actualizar el índice actual
                    }
                }
            });
            swiperInstance.update();

            modalTitle.textContent = projectLang.title;
            modalText.innerHTML = `
            <div class="project-container">
                <span class="project-category">${projectLang.category.value}</span>
                <div class="project-links"></div>
            </div>
            <div class="project-description">${projectLang.description}</div>
            <h5 class="project-details-title" >${langData.portfolio.technologies.title}</h5>
            <div class="project-details"></div>`;

            const modalLinks = modalText.querySelector('.project-links');
            modalLinks.innerHTML = "";
            const links = projectData.links;
            const langLinks = projectLang.links;

            if (links && langLinks) {
                Object.keys(langLinks).forEach((key) => {
                    const linkInfo = langLinks[key];
                    const linkUrl = links[key];
                    if (linkInfo && linkUrl) {
                        const linkElement = document.createElement("a");
                        linkElement.className = "project-link";
                        linkElement.href = linkUrl;
                        linkElement.textContent = linkInfo.title;
                        linkElement.target = "_blank";
                        linkElement.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        modalLinks.appendChild(linkElement);
                    }
                });
            }

            const modalDetails = modalText.querySelector('.project-details');
            modalDetails.innerHTML = "";

            const languages = projectData.languages;
            if (languages && Array.isArray(languages)) {
                languages.forEach(language => {
                    const languageElement = document.createElement("span");
                    languageElement.className = "project-language";
                    languageElement.textContent = language;
                    modalDetails.appendChild(languageElement);
                });
            }

            const frameworks = projectData.frameworks;
            if (frameworks && Array.isArray(frameworks)) {
                frameworks.forEach(framework => {
                    const frameworkElement = document.createElement("span");
                    frameworkElement.className = "project-framework";
                    frameworkElement.textContent = framework;
                    modalDetails.appendChild(frameworkElement);
                });
            }

            const libraries = projectData.libraries;
            if (libraries && Array.isArray(libraries)) {
                libraries.forEach(library => {
                    const libraryElement = document.createElement("span");
                    libraryElement.className = "project-library";
                    libraryElement.textContent = library;
                    modalDetails.appendChild(libraryElement);
                });
            }

            modal.classList.add('active');
            overlay.classList.add('active');
            document.querySelector('.modal-content').classList.add('modal-active');

            // La imagen dentro del modal de proyectos ya no abre un modal de zoom
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
        swiperWrapper.innerHTML = '';
        if (swiperInstance) swiperInstance.destroy();
        currentSlideIndex = 0; // Resetear el índice
    });

    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
        swiperWrapper.innerHTML = '';
        if (swiperInstance) swiperInstance.destroy();
        currentSlideIndex = 0; // Resetear el índice
    });

    // Modal de imagen eliminado, no hay listeners
}

export { setModal };
