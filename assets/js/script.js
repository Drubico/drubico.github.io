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
        document.querySelector("[data-lang='portfolio.title']").textContent = data.portfolio.title;
        document.querySelectorAll("[data-lang='portfolio.filter.all']").forEach((el) => {
          el.textContent = data.portfolio.filter.all;
        });
        document.querySelectorAll("[data-lang='portfolio.filter.applications']").forEach((el) => {
          el.textContent = data.portfolio.filter.applications;
        });
        document.querySelectorAll("[data-lang='portfolio.filter.webDevelopment']").forEach((el) => {
          el.textContent = data.portfolio.filter.webDevelopment;
        });
        data.portfolio.projects.forEach((project, index) => {
          document.querySelector(`[data-lang='portfolio.projects[${index}].title']`).textContent = project.title;
          document.querySelector(`[data-lang='portfolio.projects[${index}].category']`).textContent = project.category;
          document.querySelector(`[data-lang='portfolio.projects[${index}].description']`).innerHTML = project.description;

          const continerLinks = document.querySelector(`[data-lang='portfolio.projects[${index}].links']`);
          continerLinks.innerHTML = ""; // Clear existing items

          if (project.links) {
            Object.keys(project.links).forEach((key) => {
              const link = project.links[key];
              const linkElement = document.createElement("a");
              linkElement.className = "project-link";
              linkElement.href = link.link;
              linkElement.textContent = link.title;
              linkElement.target = "_blank"; // Open link in a new tab
              continerLinks.appendChild(linkElement);
            });
          }

          const continerDetails = document.querySelector(`[data-lang='portfolio.projects[${index}].details']`);
          continerDetails.innerHTML = ""; // Clear existing items

          project.languages.forEach((language) => {
            const languageElement = document.createElement("span");
            languageElement.className = "project-language";
            languageElement.textContent = language;
            continerDetails.appendChild(languageElement);
          });

          project.frameworks.forEach((framework) => {
            const frameworkElement = document.createElement("span");
            frameworkElement.className = "project-framework";
            frameworkElement.textContent = framework;
            continerDetails.appendChild(frameworkElement);
          });

          project.libraries.forEach((library) => {
            const libraryElement = document.createElement("span");
            libraryElement.className = "project-library";
            libraryElement.textContent = library;
            continerDetails.appendChild(libraryElement);
          });
        });

        // Contact Section
        document.querySelector("[data-lang='contact.title']").textContent = data.contact.title;
        document.querySelector("[data-lang='contact.formTitle']").textContent = data.contact.formTitle;
        document.querySelector("[data-lang='contact.linkedinProfile']").textContent = data.contact.linkedinProfile;
        document.querySelector("[data-lang='contact.githubProfile']").textContent = data.contact.githubProfile;
        document.querySelector("[data-lang='contact.playStoreProfile']").textContent = data.contact.playStoreProfile;

        // Modal
        document.querySelectorAll('.project-item').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
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



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterButtons = document.querySelectorAll("[data-filter-btn]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event to all filter buttons
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    const selectedValue = this.getAttribute('data-category');

    for (let j = 0; j < filterButtons.length; j++) {
      if (filterButtons[j] === this) {
        filterButtons[j].classList.add("active");
      } else {
        filterButtons[j].classList.remove("active");
      }
    }

    filterFunc(selectedValue);
  });
}

// Filter select box functionality
const filterSelectBox = document.querySelector('.filter-select-box');
const filterSelectButton = filterSelectBox.querySelector('.filter-select');
const filterSelectValue = filterSelectBox.querySelector('.select-value');
const filterList = filterSelectBox.querySelector('.filter-list');

filterSelectButton.addEventListener('click', function () {
  filterList.classList.toggle('active');
});

filterList.addEventListener('click', function (event) {
  if (event.target.matches('[data-filter-btn]')) {
    const selectedValue = event.target.getAttribute('data-category');
    filterSelectValue.textContent = event.target.textContent;
    filterList.classList.remove('active');

    // Update active class on buttons
    for (let i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i] === event.target) {
        filterButtons[i].classList.add('active');
      } else {
        filterButtons[i].classList.remove('active');
      }
    }

    filterFunc(selectedValue);
  }
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



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
