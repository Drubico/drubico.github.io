function setModal(data) {
    const modal = document.getElementById("project-modal");
    const overlay = modal.querySelector('[data-overlay]');
    const closeButton = modal.querySelector('[data-modal-close-btn]');
    const swiperWrapper = modal.querySelector('.swiper-wrapper');
    const modalTitle = modal.querySelector('[data-modal-title]');
    const modalText = modal.querySelector('[data-modal-text]');
    let swiperInstance = null;

    // Image modal elements
    const imgModal = document.getElementById("image-modal");
    const imgModalSwiperWrapper = imgModal.querySelector('.swiper-wrapper');
    const imgModalClose = imgModal.querySelector(".close");
    let imgModalSwiperInstance = null;

    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.querySelector('.project-img').addEventListener('click', (e) => {
            e.preventDefault();

            // Obtener datos del proyecto correspondiente
            const projectData = data.portfolio.projects[index];

            swiperWrapper.innerHTML = '';

            projectData.images.forEach(imgUrl => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';

                slide.innerHTML = `
                    <figure class="modal-avatar-box">
                        <img class="img-project" src="${imgUrl}" 
                             alt="${projectData.title}" width="100%">
                    </figure>
                `;

                swiperWrapper.appendChild(slide);
            });

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

            const projectTitle = item.querySelector('.project-title').textContent;
            const projectCategory = item.querySelector('.project-category').textContent;
            const projectDescription = item.querySelector('.project-description').innerHTML;

            modalTitle.textContent = projectTitle;
            modalText.innerHTML = `
            <div class="project-container">
                <span class="project-category">${projectCategory}</span>
                <div class="project-links"></div>
            </div>
            <div class="project-description">${projectDescription}</div>
            <h5 class="project-details-title" >${data.portfolio.technologies.title}</h5>
            <div class="project-details"></div>`;

            const modalLinks = modalText.querySelector('.project-links');
            modalLinks.innerHTML = "";
            const links = item.querySelectorAll('.project-link');

            if (links.length > 0) {
                links.forEach(link => {
                    const linkElement = document.createElement("a");
                    linkElement.className = "project-link";
                    linkElement.href = link.href;
                    linkElement.textContent = link.textContent;
                    linkElement.target = "_blank";
                    modalLinks.appendChild(linkElement);
                });
            }

            const modalDetails = modalText.querySelector('.project-details');
            modalDetails.innerHTML = "";

            const languages = item.querySelectorAll('.project-language');
            languages.forEach(language => {
                const languageElement = document.createElement("span");
                languageElement.className = "project-language";
                languageElement.textContent = language.textContent;
                modalDetails.appendChild(languageElement);
            });

            const frameworks = item.querySelectorAll('.project-framework');
            frameworks.forEach(framework => {
                const frameworkElement = document.createElement("span");
                frameworkElement.className = "project-framework";
                frameworkElement.textContent = framework.textContent;
                modalDetails.appendChild(frameworkElement);
            });

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

            // Add click event to images to open in img modal
            modal.querySelectorAll('.img-project').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Detener la propagación del evento
                    imgModal.style.display = "flex";
                    imgModalSwiperWrapper.innerHTML = '';

                    projectData.images.forEach(imgUrl => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide';

                        slide.innerHTML = `
                            <figure class="modal-image-zoom">
                                <img class="img-modal-content" src="${imgUrl}" 
                                     alt="${projectData.title}" width="100%">
                            </figure>
                        `;

                        imgModalSwiperWrapper.appendChild(slide);
                    });

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
        swiperWrapper.innerHTML = ''; // Limpiar el contenido del swiper
        if (swiperInstance) swiperInstance.destroy(); // Destruir la instancia de Swiper
    });

    overlay.addEventListener('click', () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelector('.modal-content').classList.remove('modal-active');
        swiperWrapper.innerHTML = ''; // Limpiar el contenido del swiper
        if (swiperInstance) swiperInstance.destroy(); // Destruir la instancia de Swiper
    });

    imgModalClose.addEventListener('click', () => {
        imgModal.style.display = "none";
        imgModalSwiperWrapper.innerHTML = ''; // Limpiar el contenido del swiper
        if (imgModalSwiperInstance) imgModalSwiperInstance.destroy(); // Destruir la instancia de Swiper
    });

    imgModal.addEventListener('click', (e) => {
        if (e.target === imgModal) {
            imgModal.style.display = "none";
            imgModalSwiperWrapper.innerHTML = ''; // Limpiar el contenido del swiper
            if (imgModalSwiperInstance) imgModalSwiperInstance.destroy(); // Destruir la instancia de Swiper
        }
    });
}

export { setModal };
