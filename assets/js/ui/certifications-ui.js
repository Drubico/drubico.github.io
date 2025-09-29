/**
 * @file UI para la sección de licencias y certificaciones.
 */

/**
 * Formatea una fecha ISO (YYYY-MM-DD) a "mes abreviado año" según el idioma del documento.
 * @param {string} isoDate
 */
function formatIssuedDate(isoDate) {
    try {
        const lang = document.documentElement.getAttribute('lang') || navigator.language || 'es';
        const d = new Date(isoDate);
        if (Number.isNaN(d.getTime())) return isoDate;
        return d.toLocaleDateString(lang, { month: 'short', year: 'numeric' });
    } catch (_) {
        return isoDate;
    }
}

/**
 * Renderiza la lista de certificaciones.
 * @param {object} langData - JSON de idioma
 * @param {object} staticData - JSON estático (data.json)
 * @param {HTMLElement} titleEl - Elemento H3 del título de la sección
 * @param {HTMLElement} listEl - Lista OL donde se insertarán los ítems
 */
function setCertifications(langData, staticData, titleEl, listEl) {
    if (!langData?.resume?.certifications || !Array.isArray(staticData?.certifications)) return;

    // Título
    titleEl.textContent = langData.resume.certifications.title;

    // Índice por id para textos
    const textsById = {};
    (langData.resume.certifications.items || []).forEach((it) => {
        if (it?.id) textsById[it.id] = it;
    });

    // Ordenar por fecha descendente
    const items = [...staticData.certifications].sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));

    // Limpiar
    listEl.innerHTML = '';

    items.forEach((cert, idx) => {
        const t = textsById[cert.id] || {};

        const li = document.createElement('li');
        li.className = 'cert-card';

        const header = document.createElement('div');
        header.className = 'cert-card-header';
        // Logo a la izquierda (si disponible). Prioriza cert.logo, luego intenta por providerId
        const logoSrc = cert.logo || (cert.providerId ? `./assets/images/${cert.providerId}.svg` : null);
        if (logoSrc) {
            const logoImg = document.createElement('img');
            logoImg.className = 'cert-logo';
            logoImg.src = logoSrc;
            logoImg.alt = (t.provider || cert.providerId || cert.id) + ' logo';
            header.appendChild(logoImg);
        }
        const heading = document.createElement('div');
        heading.className = 'cert-heading';
        const h4 = document.createElement('h4');
        h4.className = 'h4 cert-title';
        h4.setAttribute('data-lang', `resume.certifications.items[${idx}].title`);
        h4.textContent = t.title || cert.id;
        heading.appendChild(h4);
        if (t.provider) {
            const prov = document.createElement('span');
            prov.className = 'cert-provider';
            prov.setAttribute('data-lang', `resume.certifications.items[${idx}].provider`);
            prov.textContent = t.provider;
            heading.appendChild(prov);
        }
        header.appendChild(heading);
        li.appendChild(header);

        const body = document.createElement('div');
        body.className = 'cert-card-body';

        const meta = document.createElement('div');
        meta.className = 'cert-meta';
        const issued = document.createElement('span');
        issued.className = 'cert-issued';
        const issuedLabel = document.createElement('strong');
        issuedLabel.setAttribute('data-lang', 'resume.certifications.labels.issued');
        issuedLabel.textContent = langData.resume.certifications.labels.issued;
        issued.appendChild(issuedLabel);
        issued.appendChild(document.createTextNode(' ' + formatIssuedDate(cert.issuedAt)));
        meta.appendChild(issued);
        if (cert.credentialId) {
            const cred = document.createElement('span');
            cred.className = 'cert-credential';
            const credLabel = document.createElement('strong');
            credLabel.setAttribute('data-lang', 'resume.certifications.labels.credentialId');
            credLabel.textContent = langData.resume.certifications.labels.credentialId;
            cred.appendChild(credLabel);
            cred.appendChild(document.createTextNode(' ' + cert.credentialId));
            meta.appendChild(cred);
        }
        body.appendChild(meta);

        if (cert.url) {
            const actions = document.createElement('div');
            actions.className = 'cert-actions';
            const link = document.createElement('a');
            link.href = cert.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'btn btn-outline cert-link';
            link.setAttribute('data-lang', 'resume.certifications.labels.showCredential');
            link.textContent = langData.resume.certifications.labels.showCredential;
            actions.appendChild(link);
            body.appendChild(actions);
        }

        li.appendChild(body);
        listEl.appendChild(li);
    });
}

export { setCertifications };
