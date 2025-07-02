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

        const title = document.createElement("h4");
        title.className = "h4 timeline-item-title";
        
        if (section === 'experience') {
            title.setAttribute("data-lang", `resume.experience.items[${index}].position`);
            title.textContent = item.position;
        } else {
            title.setAttribute("data-lang", `resume.education.items[${index}].institution`);
            title.textContent = item.institution;
        }
        timelineItem.appendChild(title);

        const dates = document.createElement("span");
        dates.setAttribute("data-lang", `resume.${section}.items[${index}].dates`);
        dates.textContent = item.dates;
        timelineItem.appendChild(dates);

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
            timelineItem.appendChild(detailsList);
        } else if (item.description) {
            const description = document.createElement("p");
            description.className = "timeline-text";
            description.setAttribute("data-lang", `resume.education.items[${index}].description`);
            description.textContent = item.description;
            timelineItem.appendChild(description);
        }

        timelineElement.appendChild(timelineItem);
    });
}


/**
 * Rellena dinámicamente la sección de experiencia y educación con datos.
 * @param {object} data - El objeto de datos que contiene la información del currículum.
 * @param {object} data.resume - Contiene los datos del currículum.
 * @param {string} data.resume.title - Título principal de la sección del currículum.
 * @param {object} data.resume.education - Contiene los datos de educación.
 * @param {string} data.resume.education.title - Título de la sección de educación.
 * @param {Array<object>} data.resume.education.items - Lista de elementos de educación.
 * @param {object} data.resume.experience - Contiene los datos de experiencia.
 * @param {string} data.resume.experience.title - Título de la sección de experiencia.
 * @param {Array<object>} data.resume.experience.items - Lista de elementos de experiencia.
 */
function setExperience(data) {
    const experienceTimeline = document.getElementById("experience-timeline");
    const educationTimeline = document.getElementById("education-timeline");

    document.querySelector("[data-lang='resume.title']").textContent = data.resume.title;
    document.querySelector("[data-lang='resume.experience.title']").textContent = data.resume.experience.title;
    document.querySelector("[data-lang='resume.education.title']").textContent = data.resume.education.title;

    populateTimeline(experienceTimeline, data.resume.experience.items, 'experience');
    populateTimeline(educationTimeline, data.resume.education.items, 'education');
}

export { setExperience };
