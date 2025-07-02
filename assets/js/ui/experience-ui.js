/**
 * @file Gestiona la interfaz de usuario para la sección de experiencia y educación del currículum.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Rellena dinámicamente la sección de experiencia y educación con datos.
 * Crea y añade elementos de la línea de tiempo para cada elemento de experiencia.
 * También establece los títulos y los detalles de educación de forma estática.
 * @param {object} data - El objeto de datos que contiene la información del currículum.
 * @param {object} data.resume - Contiene los datos del currículum.
 * @param {string} data.resume.title - Título principal de la sección del currículum.
 * @param {object} data.resume.education - Contiene los datos de educación.
 * @param {string} data.resume.education.title - Título de la sección de educación.
 * @param {Array<object>} data.resume.education.items - Lista de elementos de educación.
 * @param {object} data.resume.experience - Contiene los datos de experiencia.
 * @param {string} data.resume.experience.title - Título de la sección de experiencia.
 * @param {Array<object>} data.resume.experience.items - Lista de elementos de experiencia.
 * @param {string} data.resume.experience.items[].position - El cargo en la experiencia.
 * @param {string} data.resume.experience.items[].dates - Las fechas de la experiencia.
 * @param {Array<string>} data.resume.experience.items[].details - Lista de detalles de la experiencia.
 */
function setExperience(data) {
    const timelineList = document.querySelector(".timeline-list");
    timelineList.innerHTML = "";

    data.resume.experience.items.forEach((item, index) => {
        const timelineItem = document.createElement("li");
        timelineItem.className = "timeline-item";

        const position = document.createElement("h4");
        position.className = "h4 timeline-item-title";
        position.setAttribute("data-lang", `resume.experience.items[${index}].position`);
        position.textContent = item.position;
        timelineItem.appendChild(position);

        const dates = document.createElement("span");
        dates.setAttribute("data-lang", `resume.experience.items[${index}].dates`);
        dates.textContent = item.dates;
        timelineItem.appendChild(dates);

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
        timelineList.appendChild(timelineItem);
    });

    document.querySelector("[data-lang='resume.title']").textContent = data.resume.title;

    document.querySelector("[data-lang='resume.education.title']").textContent = data.resume.education.title;
    document.querySelector("[data-lang='resume.education.items[0].institution']").textContent = data.resume.education.items[0].institution;
    document.querySelector("[data-lang='resume.education.items[0].dates']").textContent = data.resume.education.items[0].dates;
    document.querySelector("[data-lang='resume.education.items[0].description']").textContent = data.resume.education.items[0].description;

    document.querySelector("[data-lang='resume.experience.title']").textContent = data.resume.experience.title;

    document.querySelector("[data-lang='resume.experience.items[0].position']").textContent = data.resume.experience.items[0].position;
    document.querySelector("[data-lang='resume.experience.items[0].dates']").textContent = data.resume.experience.items[0].dates;
    data.resume.experience.items[0].details.forEach((detail, index) => {
        document.querySelector(`[data-lang='resume.experience.items[0].details[${index}]']`).textContent = detail;
    });

    document.querySelector("[data-lang='resume.experience.items[1].position']").textContent = data.resume.experience.items[1].position;
    document.querySelector("[data-lang='resume.experience.items[1].dates']").textContent = data.resume.experience.items[1].dates;
    data.resume.experience.items[1].details.forEach((detail, index) => {
        document.querySelector(`[data-lang='resume.experience.items[1].details[${index}]']`).textContent = detail;
    });

    document.querySelector("[data-lang='resume.experience.items[2].position']").textContent = data.resume.experience.items[2].position;
    document.querySelector("[data-lang='resume.experience.items[2].dates']").textContent = data.resume.experience.items[2].dates;
    document.querySelector("[data-lang='resume.experience.items[2].details[0]']").textContent = data.resume.experience.items[2].details[0];
}

export { setExperience };
