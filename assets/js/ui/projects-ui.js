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
function renderProjects(projects, data, projectListEl) {
    projectListEl.innerHTML = "";
    
    // Use DocumentFragment for better performance when adding multiple elements
    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
        const projectData = data.projects.find(p => p.id === project.id);
        if (!projectData) return;

        const projectItem = document.createElement("li");
        projectItem.className = "project-item active";
        projectItem.setAttribute("data-filter-item", "");
        projectItem.setAttribute("data-category", project.category.key);
        projectItem.setAttribute("data-id", project.id);

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
        projectImg.src = `./assets/images/${projectData.img}`;
        projectImg.alt = project.title;
        projectImg.loading = "lazy";

        projectFigure.appendChild(projectIconBox);
        projectFigure.appendChild(projectImg);

        const projectTitle = document.createElement("h3");
        projectTitle.className = "project-title";
        projectTitle.textContent = project.title;

        const projectContainer = document.createElement("div");
        projectContainer.className = "project-container";

        const projectCategory = document.createElement("span");
        projectCategory.className = "project-category";
        projectCategory.textContent = project.category.value;

        const projectLinks = document.createElement("div");
        projectLinks.className = "project-links";

        if (project.links && projectData.links) {
            Object.keys(project.links).forEach((key) => {
                const linkInfo = project.links[key];
                const linkUrl = projectData.links[key];
                if (linkInfo && linkUrl) {
                    const linkElement = document.createElement("a");
                    linkElement.className = "project-link";
                    linkElement.href = linkUrl;
                    linkElement.textContent = linkInfo.title;
                    linkElement.target = "_blank";
                    linkElement.addEventListener('click', (e) => {
                        e.stopPropagation();
                    });
                    projectLinks.appendChild(linkElement);
                }
            });
        }
        projectContainer.appendChild(projectCategory);
        projectContainer.appendChild(projectLinks);

        const projectDetails = document.createElement("div");
        projectDetails.className = "project-details hidden";

        // Helper function to create and append spans
        const appendSpans = (items, className) => {
            if (!items) return;
            items.forEach((text) => {
                const span = document.createElement("span");
                span.className = className;
                span.textContent = text;
                projectDetails.appendChild(span);
            });
        };

        appendSpans(projectData.languages, "project-language");
        appendSpans(projectData.frameworks, "project-framework");
        appendSpans(projectData.libraries, "project-library");

        const projectDescription = document.createElement("div");
        projectDescription.className = "project-description";
        projectDescription.innerHTML = `<p>${project.description}</p>`;

        projectLink.appendChild(projectFigure);
        projectLink.appendChild(projectTitle);
        projectLink.appendChild(projectContainer);
        projectLink.appendChild(projectDetails);
        projectLink.appendChild(projectDescription);

        projectItem.appendChild(projectLink);
        fragment.appendChild(projectItem);
    });
    
    // Single DOM operation instead of multiple appends
    projectListEl.appendChild(fragment);
}

export { renderProjects };
