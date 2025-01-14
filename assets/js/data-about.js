function setAbout(data) {
    document.querySelector("[data-about-title]").textContent = data.about.title;
    document.querySelector("[data-about-intro]").textContent = data.about.intro;
    document.querySelector("[data-about-description]").textContent = data.about.description;
    document.querySelector("[data-service-title]").textContent = data.about.services.title;
    document.querySelector("[data-mobile-app-title]").textContent = data.about.services.mobileApps.title;
    document.querySelector("[data-mobile-app-description]").textContent = data.about.services.mobileApps.description;
    document.querySelector("[data-web-dev-title]").textContent = data.about.services.webDevelopment.title;
    document.querySelector("[data-web-dev-description]").textContent = data.about.services.webDevelopment.description;
    document.querySelector("[data-skills-title]").textContent = data.about.skills.title;
}
export { setAbout };