function loadLinkedin() {
    const linkedinScript = document.createElement('script');
    linkedinScript.src = 'https://platform.linkedin.com/badges/js/profile.js';
    linkedinScript.async = true;
    linkedinScript.defer = true;

    // Mostrar el badge de LinkedIn cuando el script haya terminado de cargar
    linkedinScript.onload = function () {
        const placeholder = document.getElementById('linkedin-placeholder');
        const profileBadge = document.querySelector('.LI-profile-badge');

        if (placeholder && profileBadge) {
            // Ocultar marcador y mostrar perfil
            placeholder.style.display = 'none';
            profileBadge.style.display = 'block';
        }
    };

    // Insertar el script en el DOM
    document.body.appendChild(linkedinScript);
    linkedinScript.onerror = function () {
        const placeholder = document.getElementById('linkedin-placeholder');
        if (placeholder) {
            placeholder.innerHTML = '<p>Error al cargar el perfil de LinkedIn. Por favor, inténtalo más tarde.</p>';
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}

export { loadLinkedin };