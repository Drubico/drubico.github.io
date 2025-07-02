/**
 * @file Gestiona la interfaz de usuario y la lógica para los filtros de proyectos.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Genera el HTML para los elementos de filtro a partir de una lista de ítems.
 * @param {Array<object>} items - Lista de objetos de filtro.
 * @param {boolean} items[].active - Indica si el filtro está activo.
 * @param {string} items[].category - La categoría del filtro.
 * @param {string} items[].lang - La clave de idioma para el texto del filtro.
 * @param {string} items[].text - El texto a mostrar en el botón de filtro.
 * @returns {string} Una cadena de HTML con los elementos de la lista de filtros.
 */
function generateFilterItems(items) {
    return items.map(item => `
      <li class="filter-item ${item.active ? 'active' : ''}">
        <button data-filter-btn data-category="${item.category}" data-lang="${item.lang}">${item.text}</button>
      </li>
    `).join('');
}

/**
 * Filtra los elementos del portafolio en el DOM basados en la categoría seleccionada.
 * @param {string} selectedCategory - La categoría por la cual filtrar. 'all' para mostrar todos.
 */
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

/**
 * Configura los filtros en la interfaz de usuario.
 * Genera los botones de filtro y les asigna los eventos de clic para activar el filtrado.
 * @param {Array<object>} filterItems - Lista de objetos de filtro para generar los botones.
 */
function setFilters(filterItems) {
    const filterList = document.querySelectorAll('.filter-list');
    filterList.forEach(list => {
        list.innerHTML = generateFilterItems(filterItems);
    });
    const filterButtons = document.querySelectorAll("[data-filter-btn]");
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

/**
 * Establece el valor de filtro predeterminado al cargar la página.
 * Encuentra el filtro activo y lo aplica, actualizando la interfaz de usuario correspondiente.
 * @param {Array<object>} filterItems - Lista de objetos de filtro para encontrar el valor predeterminado.
 */
function setFilterDefaultValue(filterItems) {
    const defaultCategory = filterItems.find(item => item.active).category?.toString() || 'all';
    const defaultFilterItem = filterItems.find(item => item.category === defaultCategory);
    if (defaultFilterItem) {
        const filterSelectValue = document.querySelector('.select-value');
        filterSelectValue.textContent = defaultFilterItem.text;
        filterSelectValue.setAttribute('data-category', defaultFilterItem.category);
        filterFunc(defaultCategory);
    }
    const filterButtons = document.querySelectorAll('[data-filter-btn]');

    filterButtons.forEach(button => {
        const buttonCategory = button.getAttribute('data-category');
        if (buttonCategory === defaultCategory) {
            button.classList.add('active');
        }

    });
}

/**
 * Configura la funcionalidad del cuadro de selección de filtros (para vistas móviles).
 * Asigna eventos para mostrar/ocultar la lista de filtros y para manejar la selección de un filtro.
 */
function setFilterBox() {
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
