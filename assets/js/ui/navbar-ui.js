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

    // Helper function to update active state
    const updateActiveState = (targetPage) => {
        pages.forEach(page => {
            page.classList.toggle("active", page.dataset.page.includes(targetPage));
        });

        navigationLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute('data-page') === targetPage);
        });
    };

    if (activePage) {
        updateActiveState(activePage);
    }

    navigationLinks.forEach(navLink => {
        navLink.addEventListener("click", function () {
            const targetPage = this.getAttribute('data-page');
            updateActiveState(targetPage);
            localStorage.setItem("activePage", targetPage);
            window.scrollTo(0, 0);
        });
    });
}

export { setNavBarData, setEventNavBar };
