async function loadSections(sectionName) {
    const response = await fetch(`sections/${sectionName}.html`);
    if (!response.ok) {
        throw new Error(`Failed to load section: ${sectionName}`);
    }
    return await response.text();
}

window.Sections = { loadSections };