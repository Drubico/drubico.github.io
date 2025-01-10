function setContacts(data) {
    // Set contact section
    document.querySelector("[data-lang='contact.title']").textContent = data.contact.title;
    document.querySelector("[data-lang='contact.formTitle']").textContent = data.contact.formTitle;
    document.querySelector("[data-lang='contact.linkedinProfile']").textContent = data.contact.linkedinProfile;
    document.querySelector("[data-lang='contact.githubProfile']").textContent = data.contact.githubProfile;
    document.querySelector("[data-lang='contact.playStoreProfile']").textContent = data.contact.playStoreProfile;
}
export { setContacts };