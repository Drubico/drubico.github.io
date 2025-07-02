
function setNavBarData(data) {
    document.querySelectorAll("[data-nav-link]").forEach((navLink) => {
        const page = navLink.getAttribute("data-page");
        navLink.textContent = data.navbar[page].title;
    });
}

function setEventNavBar() {
    // page navigation variables
    const navigationLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    let activePage = localStorage.getItem("activePage");

    // Set the active page from localStorage if it exists, otherwise set the first page as active
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

    // Add event to all nav links
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

            // Save the active page to localStorage
            localStorage.setItem("activePage", targetPage);

            window.scrollTo(0, 0);
        });
    }
}

export { setNavBarData, setEventNavBar };
