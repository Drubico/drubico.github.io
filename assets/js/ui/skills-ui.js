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
