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
function loadSkills(skillsData, skillListEl) {
    skillListEl.innerHTML = '';
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    skillsData.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.className = 'skill-item';

        // Helper function to build tech tags HTML
        const buildTechHtml = (items, className) => {
            if (!items || items.length === 0) return '';
            return `<div>${items.map(item => `<p class="${className}">${item}</p>`).join('')}</div>`;
        };

        skillItem.innerHTML = `
            <div class="skill-icon-box">
                <img src="${skill.icon}" alt="${skill.alt}" width="100" />
            </div>
            <div class="skill-content-box">
                <h4 class="h4 skill-item-title">${skill.title}</h4>
                ${buildTechHtml(skill.languages, 'project-language')}
                ${buildTechHtml(skill.frameworks, 'project-framework')}
                ${buildTechHtml(skill.libraries, 'project-library')}
            </div>
        `;
        fragment.appendChild(skillItem);
    });
    
    // Single DOM operation
    skillListEl.appendChild(fragment);
}

export { loadSkills };
