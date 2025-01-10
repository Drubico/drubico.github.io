
// Function to generate filter items HTML
function generateFilterItems(items) {
    return items.map(item => `
      <li class="filter-item ${item.active ? 'active' : ''}">
        <button data-filter-btn data-category="${item.category}" data-lang="${item.lang}">${item.text}</button>
      </li>
    `).join('');
}

const filterFunc = function (selectedCategory) {
    const filterItemsElements = document.querySelectorAll("[data-filter-item]");
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

function setFilters(filterItems) {
    // Get the container elements
    const filterList = document.querySelectorAll('.filter-list');
    // Generate and append the filter items
    filterList.forEach(list => {
        list.innerHTML = generateFilterItems(filterItems);
    });
    // Add filtering functionality
    const filterButtons = document.querySelectorAll("[data-filter-btn]");
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
}

function setFilterDefaultValue(filterItems) {
    // Set default filter value
    const defaultCategory = filterItems.find(item => item.active).category?.toString() || 'all';
    const defaultFilterItem = filterItems.find(item => item.category === defaultCategory);
    if (defaultFilterItem) {
        const filterSelectValue = document.querySelector('.select-value');
        filterSelectValue.textContent = defaultFilterItem.text;
        filterSelectValue.setAttribute('data-category', defaultFilterItem.category);
        filterFunc(defaultCategory);
    }
    // Obtener todos los botones de filtro
    const filterButtons = document.querySelectorAll('[data-filter-btn]');

    filterButtons.forEach(button => {
        const buttonCategory = button.getAttribute('data-category');
        if (buttonCategory === defaultCategory) {
            button.classList.add('active');
        }

    });
}


function setFilterBox() {
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
}

export { setFilters, setFilterBox, setFilterDefaultValue };