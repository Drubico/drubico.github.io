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

    const imgModal = imageModalEl;
    const imgModalSwiperWrapper = imgModal.querySelector('.swiper-wrapper');
    const imgModalClose = imgModal.querySelector(".close");
    let imgModalSwiperInstance = null;
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

            modal.querySelectorAll('.img-project').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    imgModal.style.display = "flex";
                    imgModalSwiperWrapper.innerHTML = '';

                    if (currentProjectImages && Array.isArray(currentProjectImages)) {
                        currentProjectImages.forEach(imgUrl => {
                            const slide = document.createElement('div');
                            slide.className = 'swiper-slide';

                            slide.innerHTML = `
                                <div class="swiper-zoom-container">
                                    <figure class="modal-image-zoom">
                                        <img class="img-modal-content zoomable-image" src="${imgUrl}" 
                                             alt="${projectLang.title}" width="100%">
                                    </figure>
                                </div>
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
                        observeParents: true,
                        initialSlide: currentSlideIndex,
                        speed: 400,
                        cubeEffect: {
                            slideShadows: true,
                            shadow: true,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        },
                        // Habilitar zoom con gestos táctiles
                        zoom: {
                            maxRatio: 5,
                            minRatio: 1,
                            toggle: true,
                            containerClass: 'swiper-zoom-container',
                            zoomedSlideClass: 'swiper-slide-zoomed'
                        },
                        // Deshabilitar navegación táctil pero permitir zoom
                        touchRatio: 0,
                        simulateTouch: false,
                        allowTouchMove: false
                    });
                    imgModalSwiperInstance.update();

                    // Configurar zoom manual con botones
                    setupZoomControls(imgModal, imgModalSwiperInstance);
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

/**
 * Configura los controles de zoom para el modal de imagen
 * @param {HTMLElement} imgModal - El elemento del modal de imagen
 * @param {Object} swiperInstance - La instancia de Swiper
 */
function setupZoomControls(imgModal, swiperInstance) {
    // Crear botones de zoom si no existen
    let zoomControls = imgModal.querySelector('.zoom-controls');
    if (!zoomControls) {
        zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button class="zoom-btn zoom-in" title="Acercar">+</button>
            <button class="zoom-btn zoom-out" title="Alejar">−</button>
            <button class="zoom-btn zoom-reset" title="Restablecer">⌂</button>
        `;
        imgModal.appendChild(zoomControls);
    }

    // Crear info de zoom si no existe
    let zoomInfo = imgModal.querySelector('.zoom-info');
    if (!zoomInfo) {
        zoomInfo = document.createElement('div');
        zoomInfo.className = 'zoom-info';
        zoomInfo.textContent = '100%';
        imgModal.appendChild(zoomInfo);
    }

    const zoomInBtn = zoomControls.querySelector('.zoom-in');
    const zoomOutBtn = zoomControls.querySelector('.zoom-out');
    const zoomResetBtn = zoomControls.querySelector('.zoom-reset');

    let currentZoom = 1;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let imagePosition = { x: 0, y: 0 };
    const maxZoom = 5;
    const minZoom = 1;
    const zoomStep = 0.3;

    // Función para actualizar el estado de los botones
    function updateButtonStates() {
        zoomInBtn.disabled = currentZoom >= maxZoom;
        zoomOutBtn.disabled = currentZoom <= minZoom;
        zoomInfo.textContent = `${Math.round(currentZoom * 100)}%`;
    }    // Función SIMPLIFICADA para mostrar imágenes al tamaño máximo
    function applyTransform(scale, translateX = 0, translateY = 0) {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const zoomContainer = activeSlide.querySelector('.swiper-zoom-container');
        const img = activeSlide.querySelector('.img-modal-content');

        if (zoomContainer && img) {
            // Solo aplicar el zoom del usuario, sin escala base
            const transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            zoomContainer.style.transform = transform;

            // Actualizar cursor y clase
            if (scale > 1) {
                img.classList.add('zoomed');
                img.style.cursor = isDragging ? 'grabbing' : 'grab';
            } else {
                img.classList.remove('zoomed');
                img.style.cursor = 'grab';
                imagePosition = { x: 0, y: 0 };
            }
        }
    }    // Función para aplicar zoom
    function setZoom(newZoom) {
        currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));

        if (currentZoom === minZoom) {
            imagePosition = { x: 0, y: 0 }; // Resetear posición
        }

        applyTransform(currentZoom, imagePosition.x, imagePosition.y);
        updateButtonStates();
    }

    // Event listeners para los botones
    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setZoom(currentZoom + zoomStep);
    });

    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setZoom(currentZoom - zoomStep);
    });

    zoomResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentZoom = 1;
        imagePosition = { x: 0, y: 0 };
        applyTransform(1, 0, 0);
        updateButtonStates();
    });

    // Funcionalidad de arrastrar mejorada
    function setupDragFunctionality() {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const img = activeSlide.querySelector('.img-modal-content');

        if (!img) return;

        // Limpiar event listeners previos
        img.removeEventListener('mousedown', startDrag);
        img.removeEventListener('touchstart', startDragTouch);

        // Mouse events
        img.addEventListener('mousedown', startDrag);

        // Touch events
        img.addEventListener('touchstart', startDragTouch, { passive: false });

        function startDrag(e) {
            if (currentZoom <= 1) return;
            isDragging = true;
            dragStart.x = e.clientX - imagePosition.x;
            dragStart.y = e.clientY - imagePosition.y;
            img.style.cursor = 'grabbing';

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
            e.preventDefault();
            e.stopPropagation();
        }

        function startDragTouch(e) {
            if (currentZoom <= 1) return;

            // Solo permitir un dedo para arrastrar
            if (e.touches.length !== 1) return;

            isDragging = true;
            const touch = e.touches[0];
            dragStart.x = touch.clientX - imagePosition.x;
            dragStart.y = touch.clientY - imagePosition.y;

            document.addEventListener('touchmove', dragTouch, { passive: false });
            document.addEventListener('touchend', endDrag);
            e.preventDefault();
            e.stopPropagation();
        }

        function drag(e) {
            if (!isDragging || currentZoom <= 1) return;

            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;

            // Límites de arrastre más amplios basados en el zoom
            const maxMoveX = Math.min(window.innerWidth * 0.4, 150 * currentZoom);
            const maxMoveY = Math.min(window.innerHeight * 0.4, 150 * currentZoom);

            imagePosition.x = Math.max(-maxMoveX, Math.min(maxMoveX, newX));
            imagePosition.y = Math.max(-maxMoveY, Math.min(maxMoveY, newY));

            applyTransform(currentZoom, imagePosition.x, imagePosition.y);
            e.preventDefault();
            e.stopPropagation();
        }

        function dragTouch(e) {
            if (!isDragging || currentZoom <= 1 || e.touches.length !== 1) return;

            const touch = e.touches[0];
            const newX = touch.clientX - dragStart.x;
            const newY = touch.clientY - dragStart.y;

            // Límites de arrastre más amplios basados en el zoom
            const maxMoveX = Math.min(window.innerWidth * 0.4, 150 * currentZoom);
            const maxMoveY = Math.min(window.innerHeight * 0.4, 150 * currentZoom);

            imagePosition.x = Math.max(-maxMoveX, Math.min(maxMoveX, newX));
            imagePosition.y = Math.max(-maxMoveY, Math.min(maxMoveY, newY));

            applyTransform(currentZoom, imagePosition.x, imagePosition.y);
            e.preventDefault();
            e.stopPropagation();
        }

        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;

            const img = document.querySelector('.img-modal-content.zoomed');
            if (img) {
                img.style.cursor = 'grab';
            }

            // Limpiar event listeners
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', dragTouch);
            document.removeEventListener('touchend', endDrag);

            if (e) {
                e.stopPropagation();
            }
        }
    }    // Doble tap DESHABILITADO - solo gestos táctiles permitidos
    imgModal.addEventListener('wheel', (e) => {
        if (e.target.classList.contains('img-modal-content') || e.target.closest('.swiper-zoom-container')) {
            e.preventDefault();
            e.stopPropagation();
            const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
            setZoom(currentZoom + delta);
        }
    }, { passive: false });

    // Resetear al cambiar de slide
    swiperInstance.on('slideChange', () => {
        currentZoom = 1;
        imagePosition = { x: 0, y: 0 };
        applyTransform(1, 0, 0);
        updateButtonStates();

        // Reconfigurar funcionalidad de arrastrar para el nuevo slide
        setTimeout(setupDragFunctionality, 100);
    });

    // Configurar funcionalidad inicial
    updateButtonStates();
    setTimeout(setupDragFunctionality, 100);
}

export { setModal };
