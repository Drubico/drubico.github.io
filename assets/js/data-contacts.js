function setContacts(data) {
    // Set contact section
    document.querySelector("[data-lang='contact.title']").textContent = data.contact.title;
    document.querySelector("[data-lang='contact.formTitle']").textContent = data.contact.formTitle;
    // Linkedin
    document.querySelector("[data-lang='contact.linkedinProfileTitle']").textContent = data.contact.linkedinProfile.title;
    document.querySelector("[data-lang='contact.linkedinProfileDescription']").textContent = data.contact.linkedinProfile.description;
    document.querySelector("[data-lang='contact.linkedinProfileUrl']").textContent = data.contact.linkedinProfile.urlTitle;
    document.querySelector("[data-lang='contact.linkedinProfileUrl']").href = data.contact.linkedinProfile.link;
    // Github
    document.querySelector("[data-lang='contact.githubProfileTitle']").textContent = data.contact.githubProfile.title;
    document.querySelector("[data-lang='contact.githubProfileDescription']").textContent = data.contact.githubProfile.description;
    document.querySelector("[data-lang='contact.githubProfileUrl']").textContent = data.contact.githubProfile.urlTitle;
    document.querySelector("[data-lang='contact.githubProfileUrl']").href = data.contact.githubProfile.link;

    // whatsapp
    document.querySelector("[data-lang='contact.whatsappProfileTitle']").textContent = data.contact.whatsappProfile.title;
    document.querySelector("[data-lang='contact.whatsappProfileDescription']").textContent = data.contact.whatsappProfile.description;
    document.querySelector("[data-lang='contact.whatsappProfileUrl']").textContent = data.contact.whatsappProfile.urlTitle;
    document.querySelector("[data-lang='contact.whatsappProfileUrl']").href = data.contact.whatsappProfile.link;

    // play store
    document.querySelector("[data-lang='contact.playStoreProfileTitle']").textContent = data.contact.playStoreProfile.title;
    document.querySelector("[data-lang='contact.playStoreProfileDescription']").textContent = data.contact.playStoreProfile.description;
    document.querySelector("[data-lang='contact.playStoreProfileUrl']").textContent = data.contact.playStoreProfile.urlTitle;
    document.querySelector("[data-lang='contact.playStoreProfileUrl']").href = data.contact.playStoreProfile.link;
}
export { setContacts };