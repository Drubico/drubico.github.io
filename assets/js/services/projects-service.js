
function setTextProject(data) {
    const filterItems = [
        { category: 'all', lang: 'portfolio.filter.all', text: data.portfolio.filter.all, active: true },
        { category: 'applications', lang: 'portfolio.filter.applications', text: data.portfolio.filter.applications, active: false },
        { category: 'webDevelopment', lang: 'portfolio.filter.webDevelopment', text: data.portfolio.filter.webDevelopment, active: false },
    ];
    document.querySelector("[data-lang='portfolio.title']").textContent = data.portfolio.title;
    return filterItems;
}

export { setTextProject };
