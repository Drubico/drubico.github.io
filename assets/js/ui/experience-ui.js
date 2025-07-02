function setExperience(data) {
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
}

export { setExperience };
