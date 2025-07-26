/**
 * @file Gestiona la interfaz de usuario y los eventos de la barra de navegación.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Establece el texto de los enlaces de navegación a partir de un objeto de datos.
 * @param {object} data - El objeto que contiene los datos de la barra de navegación.
 * @param {Array<HTMLElement>} navigationLinks - Nodelist de los enlaces de navegación.
 */
function setNavBarData(data, navigationLinks) {
    navigationLinks.forEach((navLink) => {
        const page = navLink.getAttribute("data-page");
        navLink.textContent = data.navbar[page].title;
    });
}

/**
 * Configura los eventos de clic para la navegación de la página.
 * Gestiona la página activa utilizando localStorage para mantener el estado entre cargas.
 * Al cargar, establece la página activa desde localStorage o la primera como predeterminada.
 * Asigna eventos de clic a los enlaces de navegación para cambiar entre páginas.
 * @param {Array<HTMLElement>} navigationLinks - Nodelist de los enlaces de navegación.
 * @param {Array<HTMLElement>} pages - Nodelist de las secciones de la página.
 */
function setEventNavBar(navigationLinks, pages) {
    let activePage = localStorage.getItem("activePage");

    if (!activePage && navigationLinks.length > 0) {
        activePage = navigationLinks[0].getAttribute('data-page');
        localStorage.setItem("activePage", activePage);
    }

    if (activePage) {
        for (let j = 0; j < pages.length; j++) {
            if (pages[j].dataset.page.includes(activePage)) {
                pages[j].classList.add("active");
            } else {
                pages[j].classList.remove("active");
            }
        }

        for (let k = 0; k < navigationLinks.length; k++) {
            if (navigationLinks[k].getAttribute('data-page') === activePage) {
                navigationLinks[k].classList.add("active");
            } else {
                navigationLinks[k].classList.remove("active");
            }
        }
    }

    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener("click", function () {
            const targetPage = this.getAttribute('data-page');

            for (let j = 0; j < pages.length; j++) {
                if (pages[j].dataset.page.includes(targetPage)) {
                    pages[j].classList.add("active");
                } else {
                    pages[j].classList.remove("active");
                }
            }

            for (let k = 0; k < navigationLinks.length; k++) {
                if (navigationLinks[k].getAttribute('data-page') === targetPage) {
                    navigationLinks[k].classList.add("active");
                } else {
                    navigationLinks[k].classList.remove("active");
                }
            }

            localStorage.setItem("activePage", targetPage);

            window.scrollTo(0, 0);
        });
    }
}

export { setNavBarData, setEventNavBar };
