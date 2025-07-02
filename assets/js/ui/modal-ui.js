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
function setModal(langData, staticData) {
    const modal = document.getElementById("project-modal");
    const overlay = modal.querySelector('[data-overlay]');
    const closeButton = modal.querySelector('[data-modal-close-btn]');
    const swiperWrapper = modal.querySelector('.swiper-wrapper');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const modalText = modal.querySelector('[data-modal-text]');
    let swiperInstance = null;

    const imgModal = document.getElementById("image-modal");
    const imgModalSwiperWrapper = imgModal.querySelector('.swiper-wrapper');
    const imgModalClose = imgModal.querySelector(".close");
    let imgModalSwiperInstance = null;

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const projectId = item.getAttribute('data-id');
            if (!projectId) return;

            const projectLang = langData.portfolio.projects.find(p => p.id === projectId);
            const projectData = staticData.projects.find(p => p.id === projectId);

            if (!projectLang || !projectData) return;

            swiperWrapper.innerHTML = '';

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
                observeParents: true
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

            if (links) {
                Object.entries(links).forEach(([key, value]) => {
                    const linkElement = document.createElement("a");
                    linkElement.className = "project-link";
                    linkElement.href = value;
                    linkElement.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                    linkElement.target = "_blank";
                    modalLinks.appendChild(linkElement);
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

            modal.querySelectorAll('.img-project').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    imgModal.style.display = "flex";
                    imgModalSwiperWrapper.innerHTML = '';

                    if (projectData.images && Array.isArray(projectData.images)) {
                        projectData.images.forEach(imgUrl => {
                            const slide = document.createElement('div');
                            slide.className = 'swiper-slide';

                            slide.innerHTML = `
                                <figure class="modal-image-zoom">
                                    <img class="img-modal-content" src="${imgUrl}" 
                                         alt="${projectLang.title}" width="100%">
                                </figure>
                            `;

                            imgModalSwiperWrapper.appendChild(slide);
                        });
                    }

                    if (imgModalSwiperInstance) imgModalSwiperInstance.destroy();

                    imgModalSwiperInstance = new Swiper(imgModal.querySelector('.swiper-container'), {
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
                        observeParents: true
                    });
                    imgModalSwiperInstance.update();
                });
            });
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
        swiperWrapper.innerHTML = '';
        if (swiperInstance) swiperInstance.destroy();
    });

    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
        swiperWrapper.innerHTML = '';
        if (swiperInstance) swiperInstance.destroy();
    });

    imgModalClose.addEventListener('click', () => {
        imgModal.style.display = "none";
        imgModalSwiperWrapper.innerHTML = '';
        if (imgModalSwiperInstance) imgModalSwiperInstance.destroy();
    });

    imgModal.addEventListener('click', (e) => {
        if (e.target === imgModal) {
            imgModal.style.display = "none";
            imgModalSwiperWrapper.innerHTML = '';
            if (imgModalSwiperInstance) imgModalSwiperInstance.destroy();
        }
    });
}

export { setModal };
