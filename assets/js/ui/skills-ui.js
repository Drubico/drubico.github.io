/**
 * @file Gestiona la interfaz de usuario para mostrar las habilidades.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Carga y muestra la lista de habilidades en la interfaz de usuario.
 * @param {object} skillsData - Datos de las habilidades a mostrar.
 * @param {Array<object>} skillsData.skills - Lista de habilidades.
 * @param {string} skillsData.skills[].icon - Ruta del icono de la habilidad.
 * @param {string} skillsData.skills[].alt - Texto alternativo del icono.
 * @param {string} skillsData.skills[].title - Título de la habilidad.
 * @param {Array<string>} skillsData.skills[].languages - Lenguajes asociados a la habilidad.
 * @param {Array<string>} skillsData.skills[].frameworks - Frameworks asociados a la habilidad.
 * @param {Array<string>} skillsData.skills[].libraries - Librerías asociadas a la habilidad.
 */
function loadSkills(skillsData) {
    const skillList = document.querySelector('.skill-list');
    skillList.innerHTML = '';

    skillsData.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.className = 'skill-item';

        let languagesHtml = '';
        if (skill.languages.length > 0) {
            languagesHtml = `<div>${skill.languages.map(lang => `<p class="project-language">${lang}</p>`).join('')}</div>`;
        }

        let frameworksHtml = '';
        if (skill.frameworks.length > 0) {
            frameworksHtml = `<div>${skill.frameworks.map(framework => `<p class="project-framework">${framework}</p>`).join('')}</div>`;
        }

        let librariesHtml = '';
        if (skill.libraries.length > 0) {
            librariesHtml = `<div>${skill.libraries.map(lib => `<p class="project-library">${lib}</p>`).join('')}</div>`;
        }

        skillItem.innerHTML = `
            <div class="skill-icon-box">
                <img src="${skill.icon}" alt="${skill.alt}" width="100" />
            </div>
            <div class="skill-content-box">
                <h4 class="h4 skill-item-title">${skill.title}</h4>
                ${languagesHtml}
                ${frameworksHtml}
                ${librariesHtml}
            </div>
        `;
        skillList.appendChild(skillItem);
    });
}

export { loadSkills };
