/**
 * @file Gestiona la interfaz de usuario para mostrar los proyectos del portafolio.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Renderiza la lista de proyectos en el DOM.
 * @param {Array<object>} projects - Una lista de objetos de proyecto para mostrar.
 * @param {string} projects[].img - La URL de la imagen para el proyecto.
 * @param {string} projects[].title - El título del proyecto.
 * @param {object} projects[].category - La categoría del proyecto.
 * @param {string} projects[].category.key - La clave para el filtro de categoría.
 * @param {string} projects[].category.value - El nombre visible de la categoría.
 * @param {string} projects[].description - La descripción del proyecto.
 * @param {object} [projects[].links] - Un objeto que contiene enlaces relacionados con el proyecto.
 * @param {Array<string>} [projects[].languages] - Una lista de lenguajes de programación utilizados.
 * @param {Array<string>} [projects[].frameworks] - Una lista de frameworks utilizados.
 * @param {Array<string>} [projects[].libraries] - Una lista de librerías utilizadas.
 */
function renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    projects.forEach((project, index) => {
        const projectItem = document.createElement("li");
        projectItem.className = "project-item active";
        projectItem.setAttribute("data-filter-item", "");
        projectItem.setAttribute("data-category", project.category.key);

        const projectLink = document.createElement("a");
        projectLink.href = "#";

        const projectFigure = document.createElement("figure");
        projectFigure.className = "project-img";

        const projectIconBox = document.createElement("div");
        projectIconBox.className = "project-item-icon-box";

        const projectIcon = document.createElement("ion-icon");
        projectIcon.setAttribute("name", "eye-outline");

        projectIconBox.appendChild(projectIcon);

        const projectImg = document.createElement("img");
        projectImg.src = `./assets/images/${project.img}`;
        projectImg.alt = project.title;
        projectImg.loading = "lazy";

        projectFigure.appendChild(projectIconBox);
        projectFigure.appendChild(projectImg);

        const projectTitle = document.createElement("h3");
        projectTitle.className = "project-title";
        projectTitle.setAttribute("data-lang", `portfolio.projects[${index}].title`);
        projectTitle.textContent = project.title;

        const projectContainer = document.createElement("div");
        projectContainer.className = "project-container";

        const projectCategory = document.createElement("span");
        projectCategory.className = "project-category";
        projectCategory.setAttribute("data-lang", `portfolio.projects[${index}].category`);
        projectCategory.textContent = project.category.value;

        const projectLinks = document.createElement("div");
        projectLinks.className = "project-links";
        projectLinks.setAttribute("data-lang", `portfolio.projects[${index}].links`);

        if (project.links) {
            Object.keys(project.links).forEach((key) => {
                const link = project.links[key];
                const linkElement = document.createElement("a");
                linkElement.className = "project-link";
                linkElement.href = link.link;
                linkElement.textContent = link.title;
                linkElement.target = "_blank";
                projectLinks.appendChild(linkElement);
            });
        }
        projectContainer.appendChild(projectCategory);
        projectContainer.appendChild(projectLinks);

        const projectDetails = document.createElement("div");
        projectDetails.className = "project-details hidden";
        projectDetails.setAttribute("data-lang", `portfolio.projects[${index}].details`);

        if (project.languages) {
            project.languages.forEach((language) => {
                const languageElement = document.createElement("span");
                languageElement.className = "project-language";
                languageElement.textContent = language;
                projectDetails.appendChild(languageElement);
            });
        }

        if (project.frameworks) {
            project.frameworks.forEach((framework) => {
                const frameworkElement = document.createElement("span");
                frameworkElement.className = "project-framework";
                frameworkElement.textContent = framework;
                projectDetails.appendChild(frameworkElement);
            });
        }

        if (project.libraries) {
            project.libraries.forEach((library) => {
                const libraryElement = document.createElement("span");
                libraryElement.className = "project-library";
                libraryElement.textContent = library;
                projectDetails.appendChild(libraryElement);
            });
        }


        const projectDescription = document.createElement("div");
        projectDescription.className = "project-description";
        projectDescription.setAttribute("data-lang", `portfolio.projects[${index}].description`);
        projectDescription.innerHTML = `<p>${project.description}</p>`;

        projectLink.appendChild(projectFigure);
        projectLink.appendChild(projectTitle);
        projectLink.appendChild(projectContainer);
        projectLink.appendChild(projectDetails);
        projectLink.appendChild(projectDescription);

        projectItem.appendChild(projectLink);
        projectList.appendChild(projectItem);
    });
}

export { renderProjects };
