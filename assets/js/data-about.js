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
    document.querySelector("[data-android-title]").textContent = data.about.skills.android.title;
    document.querySelector("[data-android-progress]").textContent = data.about.skills.android.progress;
    document.querySelector("[data-flutter-title]").textContent = data.about.skills.flutter.title;
    document.querySelector("[data-flutter-progress]").textContent = data.about.skills.flutter.progress;
    document.querySelector("[data-backend-title]").textContent = data.about.skills.backend.title;
    document.querySelector("[data-backend-progress]").textContent = data.about.skills.backend.progress;
    document.querySelector("[data-wordpress-title]").textContent = data.about.skills.wordpress.title;
    document.querySelector("[data-wordpress-progress]").textContent = data.about.skills.wordpress.progress;
}
export { setAbout };