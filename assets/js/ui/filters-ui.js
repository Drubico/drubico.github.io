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
 * @param {NodeListOf<HTMLElement>} filterItemsElements - Nodelist de los elementos a filtrar.
 */
const filterFunc = function (selectedCategory, filterItemsElements) {
    filterItemsElements.forEach(item => {
        item.classList.toggle("active", 
            selectedCategory === "all" || selectedCategory === item.dataset.category
        );
    });
}

/**
 * Configura los filtros en la interfaz de usuario.
 * Genera los botones de filtro y les asigna los eventos de clic para activar el filtrado.
 * @param {Array<object>} filterItems - Lista de objetos de filtro para generar los botones.
 * @param {NodeListOf<HTMLElement>} filterListElements - Nodelist de los elementos de la lista de filtros.
 * @param {NodeListOf<HTMLElement>} filterButtonsElements - Nodelist de los botones de filtro.
 * @param {NodeListOf<HTMLElement>} filterItemsToFilter - Nodelist de los elementos del portafolio a filtrar.
 */
function setFilters(filterItems, filterListElements, filterButtonsElements, filterItemsToFilter) {
    filterListElements.forEach(list => {
        list.innerHTML = generateFilterItems(filterItems);
    });

    // Re-query filterButtonsElements after they have been rendered
    const buttons = document.querySelectorAll("[data-filter-btn]");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedCategory = this.getAttribute('data-category');

            // Update active state on all buttons
            buttons.forEach(btn => {
                btn.classList.toggle("active", btn === this);
            });

            filterFunc(selectedCategory, filterItemsToFilter);
        });
    });
}

/**
 * Establece el valor de filtro predeterminado al cargar la página.
 * Encuentra el filtro activo y lo aplica, actualizando la interfaz de usuario correspondiente.
 * @param {Array<object>} filterItems - Lista de objetos de filtro para encontrar el valor predeterminado.
 * @param {HTMLElement} filterSelectValueEl - Elemento del DOM para el valor seleccionado del filtro.
 * @param {NodeListOf<HTMLElement>} filterButtonsElements - Nodelist de los botones de filtro.
 * @param {NodeListOf<HTMLElement>} filterItemsToFilter - Nodelist de los elementos del portafolio a filtrar.
 */
function setFilterDefaultValue(filterItems, filterSelectValueEl, filterButtonsElements, filterItemsToFilter) {
    // Re-query filterButtonsElements to ensure it's up-to-date
    filterButtonsElements = document.querySelectorAll("[data-filter-btn]");

    const defaultCategory = filterItems.find(item => item.active).category?.toString() || 'all';
    const defaultFilterItem = filterItems.find(item => item.category === defaultCategory);
    if (defaultFilterItem) {
        filterSelectValueEl.textContent = defaultFilterItem.text;
        filterSelectValueEl.setAttribute('data-category', defaultFilterItem.category);
        filterFunc(defaultCategory, filterItemsToFilter);
    }

    filterButtonsElements.forEach(button => {
        const buttonCategory = button.getAttribute('data-category');
        if (buttonCategory === defaultCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active'); // Ensure other buttons are not active
        }
    });
}

/**
 * Configura la funcionalidad del cuadro de selección de filtros (para vistas móviles).
 * Asigna eventos para mostrar/ocultar la lista de filtros y para manejar la selección de un filtro.
 * @param {HTMLElement} filterSelectBoxEl - Elemento del DOM del cuadro de selección de filtros.
 * @param {NodeListOf<HTMLElement>} filterButtonsElements - Nodelist de los botones de filtro.
 * @param {NodeListOf<HTMLElement>} filterItemsToFilter - Nodelist de los elementos del portafolio a filtrar.
 */
function setFilterBox(filterSelectBoxEl, filterButtonsElements, filterItemsToFilter) {
    if (!filterSelectBoxEl) return;

    const filterSelectButton = filterSelectBoxEl.querySelector('.filter-select');
    const filterSelectValue = filterSelectBoxEl.querySelector('.select-value');
    const currentFilterList = filterSelectBoxEl.querySelector('.filter-list');

    if (!filterSelectButton || !filterSelectValue || !currentFilterList) return;

    filterSelectButton.addEventListener('click', function () {
        currentFilterList.classList.toggle('active');
    });

    currentFilterList.addEventListener('click', function (event) {
        if (!event.target.matches('[data-filter-btn]')) return;

        const selectedCategory = event.target.getAttribute('data-category');
        filterSelectValue.textContent = event.target.textContent;
        filterSelectValue.setAttribute('data-category', selectedCategory);
        currentFilterList.classList.remove('active');

        // Update active class on buttons - use cached buttons
        const allButtons = document.querySelectorAll('[data-filter-btn]');
        allButtons.forEach(btn => {
            btn.classList.toggle("active", btn === event.target);
        });

        filterFunc(selectedCategory, filterItemsToFilter);
    });
}

export { setFilters, setFilterBox, setFilterDefaultValue };


