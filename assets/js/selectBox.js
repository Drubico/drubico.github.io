// Filter select box functionality
const filterSelectBox = document.querySelector('.filter-select-box');
if (filterSelectBox) {
  const filterSelectButton = filterSelectBox.querySelector('.filter-select');
  const filterSelectValue = filterSelectBox.querySelector('.select-value');
  const currentFilterList = filterSelectBox.querySelector('.filter-list');

  if (filterSelectButton && filterSelectValue && currentFilterList) {
    filterSelectButton.addEventListener('click', function () {
      console.log('click');
      currentFilterList.classList.toggle('active');
    });

    currentFilterList.addEventListener('click', function (event) {
      if (event.target.matches('[data-filter-btn]')) {
        const selectedCategory = event.target.getAttribute('data-category');
        filterSelectValue.textContent = event.target.textContent;
        filterSelectValue.setAttribute('data-category', selectedCategory);
        currentFilterList.classList.remove('active');

        // Update active class on buttons
        for (let i = 0; i < filterButtons.length; i++) {
          if (filterButtons[i] === event.target) {
            filterButtons[i].classList.add('active');
          } else {
            filterButtons[i].classList.remove('active');
          }
        }

        filterFunc(selectedCategory);
      }
    });
  }
}