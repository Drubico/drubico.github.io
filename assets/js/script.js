'use strict';



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

document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById("project-modal");
  const overlay = modal.querySelector('[data-overlay]');
  const closeButton = modal.querySelector('[data-modal-close-btn]');
  const modalImg = modal.querySelector('[data-modal-img]');
  const modalTitle = modal.querySelector('[data-modal-title]');
  const modalText = modal.querySelector('[data-modal-text]');

  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const projectImg = item.querySelector('img').src;
      const projectTitle = item.querySelector('.project-title').textContent;
      const projectCategory = item.querySelector('.project-category').textContent;
      const projectDescription = item.querySelector('.project-description').innerHTML;

      modalImg.src = projectImg;
      modalTitle.textContent = projectTitle;
      modalText.innerHTML = `<p>${projectCategory}</p>`;
      modalText.innerHTML += `<div class="project-description">${projectDescription}</div>`;
      modal.classList.add('active');
      overlay.classList.add('active');
      document.querySelector('.modal-content').classList.add('modal-active');
    });
  });

  closeButton.onclick = function () {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.modal-content').classList.remove('modal-active');
  }

  overlay.onclick = function () {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.querySelector('.modal-content').classList.remove('modal-active');
  }
});