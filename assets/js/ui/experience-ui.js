/**
 * @file Gestiona la interfaz de usuario para la sección de experiencia y educación del currículum.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Rellena una lista de la línea de tiempo con los elementos proporcionados.
 * @param {HTMLElement} timelineElement - El elemento de la lista de la línea de tiempo a rellenar.
 * @param {Array<object>} items - La lista de elementos a mostrar.
 * @param {string} section - El nombre de la sección ('experience' o 'education').
 */
function populateTimeline(timelineElement, items, section) {
    timelineElement.innerHTML = "";

    items.forEach((item, index) => {
        const timelineItem = document.createElement("li");
        timelineItem.className = "timeline-item";


        // Contenedor para la columna izquierda (logo, título y fechas)
        const leftCol = document.createElement("div");
        leftCol.className = "timeline-col timeline-col-left";

        // Logo de empresa o institución si existe
        if (item.logo) {
            const logo = document.createElement("img");
            logo.src = item.logo;
            if (section === 'experience') {
                logo.alt = item.company ? item.company + ' logo' : 'Logo empresa';
            } else {
                logo.alt = item.institution ? item.institution + ' logo' : 'Logo institución';
            }
            logo.className = "timeline-logo";
            leftCol.appendChild(logo);
        }

        // Contenedor para la columna derecha (detalles o descripción)

        const rightCol = document.createElement("div");
        rightCol.className = "timeline-col timeline-col-right";
        const title = document.createElement("h4");
        title.className = "h4 timeline-item-title";
        if (section === 'experience') {
            title.setAttribute("data-lang", `resume.experience.items[${index}].position`);
            title.textContent = item.position;
        } else {
            title.setAttribute("data-lang", `resume.education.items[${index}].institution`);
            title.textContent = item.institution;
        }
        rightCol.appendChild(title);

        const dates = document.createElement("span");
        dates.setAttribute("data-lang", `resume.${section}.items[${index}].dates`);
        dates.textContent = item.dates;
        rightCol.appendChild(dates);

        if (item.details) {
            const detailsList = document.createElement("ul");
            detailsList.className = "timeline-details";
            item.details.forEach((detail, detailIndex) => {
                const detailItem = document.createElement("li");
                detailItem.className = "timeline-text";
                detailItem.setAttribute("data-lang", `resume.experience.items[${index}].details[${detailIndex}]`);
                detailItem.textContent = detail;
                detailsList.appendChild(detailItem);
            });
            rightCol.appendChild(detailsList);
        } else if (item.description) {
            const description = document.createElement("p");
            description.className = "timeline-text";
            description.setAttribute("data-lang", `resume.education.items[${index}].description`);
            description.textContent = item.description;
            rightCol.appendChild(description);
        }

        timelineItem.appendChild(leftCol);
        timelineItem.appendChild(rightCol);
        timelineElement.appendChild(timelineItem);
    });
}


/**
 * Rellena dinámicamente la sección de experiencia y educación con datos.
 * @param {object} data - El objeto de datos que contiene la información del currículum.
 * @param {HTMLElement} resumeTitleEl - Elemento del DOM para el título principal del currículum.
 * @param {HTMLElement} experienceTitleEl - Elemento del DOM para el título de experiencia.
 * @param {HTMLElement} educationTitleEl - Elemento del DOM para el título de educación.
 * @param {HTMLElement} experienceTimelineEl - Elemento del DOM para la línea de tiempo de experiencia.
 * @param {HTMLElement} educationTimelineEl - Elemento del DOM para la línea de tiempo de educación.
 */
function setExperience(data, resumeTitleEl, experienceTitleEl, educationTitleEl, experienceTimelineEl, educationTimelineEl) {
    resumeTitleEl.textContent = data.resume.title;
    experienceTitleEl.textContent = data.resume.experience.title;
    educationTitleEl.textContent = data.resume.education.title;

    populateTimeline(experienceTimelineEl, data.resume.experience.items, 'experience');
    populateTimeline(educationTimelineEl, data.resume.education.items, 'education');
}

export { setExperience };

