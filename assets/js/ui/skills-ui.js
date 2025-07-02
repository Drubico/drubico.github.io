const skillsData = {
    "skills": [
        {
            "icon": "./assets/images/android.svg",
            "alt": "android",
            "title": "Android",
            "languages": ["Java", "Kotlin"],
            "frameworks": ["Jetpack compose"],
            "libraries": ["Firebase", "Room", "Retrofit", "Hilt", "Koin", "Ktor", "Google Services"]
        },
        {
            "icon": "./assets/images/flutter.svg",
            "alt": "flutter",
            "title": "Flutter",
            "languages": ["Dart"],
            "frameworks": ["Provider", "Bloc"],
            "libraries": ["Firebase"]
        },
        {
            "icon": "./assets/images/nodejs.svg",
            "alt": "nodejs",
            "title": "Node JS",
            "languages": ["Javascript", "Typescript"],
            "frameworks": ["Express.js"],
            "libraries": ["Axios", "Sequalize"]
        },
        {
            "icon": "./assets/images/postgres.svg",
            "alt": "postgres",
            "title": "Postgres",
            "languages": ["PL/pgSQL"],
            "frameworks": [],
            "libraries": ["Sequalize"]
        },
        {
            "icon": "./assets/images/firebase.svg",
            "alt": "firebase",
            "title": "Firebase",
            "languages": [],
            "frameworks": [],
            "libraries": ["Crashlytics", "Firestone"]
        },
        {
            "icon": "./assets/images/html_css_js.png",
            "alt": "html_css_js",
            "title": "Html,Css,JS",
            "languages": [],
            "frameworks": ["Axios"],
            "libraries": ["Tailwind", "Sass"]
        }
    ]
};

function loadSkills() {
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
