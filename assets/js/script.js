'use strict';

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve currentLang and currentJsonPath from localStorage or set defaults
  let currentLang = localStorage.getItem("currentLang") || "es";
  let currentJsonPath = localStorage.getItem("jsonPath") || "assets/lang-es.json";
  let langToggleSrc = localStorage.getItem("langToggleSrc") || "assets/images/usa.svg";
  let langToggleAlt = localStorage.getItem("langToggleAlt") || "English";
  const langToggle = document.getElementById("lang-toggle");
  langToggle.src = langToggleSrc;
  langToggle.alt = langToggleAlt;
  // modal 

  const modal = document.getElementById("project-modal");
  const overlay = modal.querySelector('[data-overlay]');
  const closeButton = modal.querySelector('[data-modal-close-btn]');
  const modalImg = modal.querySelector('[data-modal-img]');
  const modalTitle = modal.querySelector('[data-modal-title]');
  const modalText = modal.querySelector('[data-modal-text]');

  // Function to set current language and save to localStorage
  function setCurrentLang(lang, jsonPath, imgSrc, imgAlt) {
    currentLang = lang;
    currentJsonPath = jsonPath;
    langToggleSrc = imgSrc;
    langToggleAlt = imgAlt;
    langToggle.src = imgSrc;
    langToggle.alt = imgAlt;
    localStorage.setItem("currentLang", currentLang);
    localStorage.setItem("jsonPath", currentJsonPath);
    localStorage.setItem("langToggleSrc", langToggleSrc);
    localStorage.setItem("langToggleAlt", langToggleAlt);
  }
  function renderProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = ""; // Clear existing items

    projects.forEach((project, index) => {
      const projectItem = document.createElement("li");
      projectItem.className = "project-item active";
      projectItem.setAttribute("data-filter-item", "");
      projectItem.setAttribute("data-category", project.category.key);

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
      projectImg.src = `./assets/images/${project.img}`;
      projectImg.alt = project.title;
      projectImg.loading = "lazy";

      projectFigure.appendChild(projectIconBox);
      projectFigure.appendChild(projectImg);

      const projectTitle = document.createElement("h3");
      projectTitle.className = "project-title";
      projectTitle.setAttribute("data-lang", `portfolio.projects[${index}].title`);
      projectTitle.textContent = project.title;

      const projectCategory = document.createElement("span");
      projectCategory.className = "project-category";
      projectCategory.setAttribute("data-lang", `portfolio.projects[${index}].category`);
      projectCategory.textContent = project.category.value;


      const projectLinks = document.createElement("div");
      projectLinks.className = "project-links";
      projectLinks.setAttribute("data-lang", `portfolio.projects[${index}].links`);

      if (project.links) {
        Object.keys(project.links).forEach((key) => {
          const link = project.links[key];
          const linkElement = document.createElement("a");
          linkElement.className = "project-link";
          linkElement.href = link.link;
          linkElement.textContent = link.title;
          linkElement.target = "_blank"; // Open link in a new tab
          projectLinks.appendChild(linkElement);
        });
      }


      const projectDetails = document.createElement("div");
      projectDetails.className = "project-details hidden";
      projectDetails.setAttribute("data-lang", `portfolio.projects[${index}].details`);

      if (project.languages) {
        project.languages.forEach((language) => {
          const languageElement = document.createElement("span");
          languageElement.className = "project-language";
          languageElement.textContent = language;
          projectDetails.appendChild(languageElement);
        });
      }

      if (project.frameworks) {
        project.frameworks.forEach((framework) => {
          const frameworkElement = document.createElement("span");
          frameworkElement.className = "project-framework";
          frameworkElement.textContent = framework;
          projectDetails.appendChild(frameworkElement);
        });
      }

      if (project.libraries) {
        project.libraries.forEach((library) => {
          const libraryElement = document.createElement("span");
          libraryElement.className = "project-library";
          libraryElement.textContent = library;
          projectDetails.appendChild(libraryElement);
        });
      }


      const projectDescription = document.createElement("div");
      projectDescription.className = "project-description";
      projectDescription.setAttribute("data-lang", `portfolio.projects[${index}].description`);
      projectDescription.innerHTML = `<p>${project.description}</p>`;

      projectLink.appendChild(projectFigure);
      projectLink.appendChild(projectTitle);
      projectLink.appendChild(projectCategory);
      projectLink.appendChild(projectLinks);
      projectLink.appendChild(projectDetails);
      projectLink.appendChild(projectDescription);

      projectItem.appendChild(projectLink);
      projectList.appendChild(projectItem);
    });
  }
  // Function to load language file
  function loadLanguage(langFile) {
    fetch(langFile)
      .then((response) => response.json())
      .then((data) => {
        // Experience Section
        const timelineList = document.querySelector(".timeline-list");
        timelineList.innerHTML = ""; // Clear existing items

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
        // Sidebar
        document.querySelector(".name").textContent = data.sidebar.name;
        document.querySelector(".title").textContent = data.sidebar.title;
        document.querySelector("[data-show-contacts]").textContent = data.sidebar.showContactsBtn;

        // Contacts
        document.querySelector('[data-contact-title="email"]').textContent = data.sidebar.contacts.email.title;
        const emailLink = document.querySelector('[data-contact-link="email"]');
        emailLink.textContent = data.sidebar.contacts.email.linkText;
        emailLink.href = data.sidebar.contacts.email.linkHref;

        document.querySelector('[data-contact-title="phone"]').textContent = data.sidebar.contacts.phone.title;
        const phoneLink = document.querySelector('[data-contact-link="phone"]');
        phoneLink.textContent = data.sidebar.contacts.phone.linkText;
        phoneLink.href = data.sidebar.contacts.phone.linkHref;

        document.querySelector('[data-contact-title="birthday"]').textContent = data.sidebar.contacts.birthday.title;
        document.querySelector("[data-birthday-date]").textContent = data.sidebar.contacts.birthday.date;
        document.querySelector("[data-birthday-date]").setAttribute("datetime", data.sidebar.contacts.birthday.datetime);

        document.querySelector('[data-contact-title="location"]').textContent = data.sidebar.contacts.location.title;
        document.querySelector("[data-location-address]").textContent = data.sidebar.contacts.location.address;

        document.querySelector('[data-contact-title="linkedin"]').textContent = data.sidebar.contacts.linkedin.title;
        const linkedinLink = document.querySelector('[data-contact-link="linkedin"]');
        linkedinLink.textContent = data.sidebar.contacts.linkedin.linkText;
        linkedinLink.href = data.sidebar.contacts.linkedin.linkHref;

        // Navbar
        document.querySelectorAll("[data-nav-link]").forEach((navLink) => {
          const page = navLink.getAttribute("data-page");
          navLink.textContent = data.navbar[page];
        });

        // Sección About
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

        // Resume Title
        document.querySelector("[data-lang='resume.title']").textContent = data.resume.title;

        // Education Section
        document.querySelector("[data-lang='resume.education.title']").textContent = data.resume.education.title;
        document.querySelector("[data-lang='resume.education.items[0].institution']").textContent = data.resume.education.items[0].institution;
        document.querySelector("[data-lang='resume.education.items[0].dates']").textContent = data.resume.education.items[0].dates;
        document.querySelector("[data-lang='resume.education.items[0].description']").textContent = data.resume.education.items[0].description;

        // Experience Section
        document.querySelector("[data-lang='resume.experience.title']").textContent = data.resume.experience.title;

        // First experience item
        document.querySelector("[data-lang='resume.experience.items[0].position']").textContent = data.resume.experience.items[0].position;
        document.querySelector("[data-lang='resume.experience.items[0].dates']").textContent = data.resume.experience.items[0].dates;
        data.resume.experience.items[0].details.forEach((detail, index) => {
          document.querySelector(`[data-lang='resume.experience.items[0].details[${index}]']`).textContent = detail;
        });

        // Second experience item
        document.querySelector("[data-lang='resume.experience.items[1].position']").textContent = data.resume.experience.items[1].position;
        document.querySelector("[data-lang='resume.experience.items[1].dates']").textContent = data.resume.experience.items[1].dates;
        data.resume.experience.items[1].details.forEach((detail, index) => {
          document.querySelector(`[data-lang='resume.experience.items[1].details[${index}]']`).textContent = detail;
        });

        // Third experience item
        document.querySelector("[data-lang='resume.experience.items[2].position']").textContent = data.resume.experience.items[2].position;
        document.querySelector("[data-lang='resume.experience.items[2].dates']").textContent = data.resume.experience.items[2].dates;
        document.querySelector("[data-lang='resume.experience.items[2].details[0]']").textContent = data.resume.experience.items[2].details[0];

        // Portfolio Section
        renderProjects(data.portfolio.projects);


        // Contact Section
        document.querySelector("[data-lang='contact.title']").textContent = data.contact.title;
        document.querySelector("[data-lang='contact.formTitle']").textContent = data.contact.formTitle;
        document.querySelector("[data-lang='contact.linkedinProfile']").textContent = data.contact.linkedinProfile;
        document.querySelector("[data-lang='contact.githubProfile']").textContent = data.contact.githubProfile;
        document.querySelector("[data-lang='contact.playStoreProfile']").textContent = data.contact.playStoreProfile;

        // Modal
        document.querySelectorAll('.project-item').forEach(item => {
          item.querySelector('.project-img').addEventListener('click', (e) => {
            e.stopPropagation();
            const projectImg = item.querySelector('img').src;
            const projectTitle = item.querySelector('.project-title').textContent;
            const projectCategory = item.querySelector('.project-category').textContent;
            const projectDescription = item.querySelector('.project-description').innerHTML;

            modalImg.src = projectImg;
            modalTitle.textContent = projectTitle;
            modalText.innerHTML = `<span class="project-category">${projectCategory}</span>`;
            modalText.innerHTML += `<div class="project-links"></div>`;
            modalText.innerHTML += `<div class="project-description">${projectDescription}</div>`;
            modalText.innerHTML += `<h4 class="project-title" >${data.portfolio.technologies.title}</h4>`;
            modalText.innerHTML += `<div class="project-details"></div>`;

            // Add links
            const modalLinks = modalText.querySelector('.project-links');
            modalLinks.innerHTML = "";
            const links = item.querySelectorAll('.project-link');

            if (links.length > 0) {
              links.forEach(link => {
                const linkElement = document.createElement("a");
                linkElement.className = "project-link";
                linkElement.href = link.href;
                linkElement.textContent = link.textContent;
                linkElement.target = "_blank"; // Open link in a new tab
                modalLinks.appendChild(linkElement);
              });
            }

            const modalDetails = modalText.querySelector('.project-details');
            modalDetails.innerHTML = "";

            // Add languages
            const languages = item.querySelectorAll('.project-language');
            languages.forEach(language => {
              const languageElement = document.createElement("span");
              languageElement.className = "project-language";
              languageElement.textContent = language.textContent;
              modalDetails.appendChild(languageElement);
            });

            // Add frameworks
            const frameworks = item.querySelectorAll('.project-framework');
            frameworks.forEach(framework => {
              const frameworkElement = document.createElement("span");
              frameworkElement.className = "project-framework";
              frameworkElement.textContent = framework.textContent;
              modalDetails.appendChild(frameworkElement);
            });

            // Add libraries
            const libraries = item.querySelectorAll('.project-library');
            libraries.forEach(library => {
              const libraryElement = document.createElement("span");
              libraryElement.className = "project-library";
              libraryElement.textContent = library.textContent;
              modalDetails.appendChild(libraryElement);
            });
            modal.classList.add('active');
            overlay.classList.add('active');
            document.querySelector('.modal-content').classList.add('modal-active');
          });
        });

        const filterItems = [
          { category: 'all', lang: 'portfolio.filter.all', text: data.portfolio.filter.all, active: true },
          { category: 'applications', lang: 'portfolio.filter.applications', text: data.portfolio.filter.applications, active: false },
          { category: 'webDevelopment', lang: 'portfolio.filter.webDevelopment', text: data.portfolio.filter.webDevelopment, active: false },
        ];

        // Function to generate filter items HTML
        function generateFilterItems(items) {
          return items.map(item => `
            <li class="filter-item ${item.active ? 'active' : ''}">
              <button data-filter-btn data-category="${item.category}" data-lang="${item.lang}">${item.text}</button>
            </li>
          `).join('');
        }

        // Get the container elements
        const filterList = document.querySelectorAll('.filter-list');

        // Generate and append the filter items
        filterList.forEach(list => {
          list.innerHTML = generateFilterItems(filterItems);
        });

        // Add filtering functionality
        const filterItemsElements = document.querySelectorAll("[data-filter-item]");
        const filterButtons = document.querySelectorAll("[data-filter-btn]");

        const filterFunc = function (selectedCategory) {
          for (let i = 0; i < filterItemsElements.length; i++) {
            if (selectedCategory === "all") {
              filterItemsElements[i].classList.add("active");
            } else if (selectedCategory === filterItemsElements[i].dataset.category) {
              filterItemsElements[i].classList.add("active");
            } else {
              filterItemsElements[i].classList.remove("active");
            }
          }
        }

        // Add event to all filter buttons
        for (let i = 0; i < filterButtons.length; i++) {
          filterButtons[i].addEventListener("click", function () {
            const selectedCategory = this.getAttribute('data-category');

            for (let j = 0; j < filterButtons.length; j++) {
              if (filterButtons[j] === this) {
                filterButtons[j].classList.add("active");
              } else {
                filterButtons[j].classList.remove("active");
              }
            }

            filterFunc(selectedCategory);
          });
        }

        // Set "all" filter as active by default
        document.querySelector('[data-category="all"]').classList.add('active');
        filterFunc("all");

      })
      .catch((error) => console.error("Error al cargar el archivo de idioma:", error));
  }


  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.modal-content').classList.remove('modal-active');
  });

  overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.modal-content').classList.remove('modal-active');
  });

  // Load the language file based on currentJsonPath
  loadLanguage(currentJsonPath);

  // Add event listener to language toggle button
  document.getElementById("lang-toggle").addEventListener("click", () => {
    if (currentLang === "en") {
      loadLanguage("assets/lang-es.json");
      setCurrentLang("es", "assets/lang-es.json", "assets/images/usa.svg", "English");
    } else {
      loadLanguage("assets/lang.json");
      setCurrentLang("en", "assets/lang.json", "assets/images/spain.svg", "Español");
    }
  });
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.getAttribute('data-page');

    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page.includes(targetPage)) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k].getAttribute('data-page') === targetPage) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }

    window.scrollTo(0, 0);
  });
}