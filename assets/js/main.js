

document.addEventListener("DOMContentLoaded", async () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const content = document.getElementById("content");
    const navlinks = document.querySelectorAll("[data-section]");

    const initialSection = location.hash ? location.hash.substring(1) : "intro";
    await switchSection(initialSection);

    navlinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const sectionName = link.dataset.section;
            if (sectionName) {
                history.pushState({ sectionName }, "", `#${sectionName}`);
                await switchSection(sectionName);
            }
        });
    });

    window.addEventListener("popstate", async () => {
        const sectionName = location.hash ? location.hash.substring(1) : "intro";
        await switchSection(sectionName, false);
    });

    async function switchSection(sectionName, animate = true) {
        if (!content) return;

        if (animate) {
            content.classList.remove("fade-enter");
            content.classList.add("fade-exit");
            await new Promise((resolve) => setTimeout(resolve, 300));
        }

        try {
            const sectionHTML = await window.Sections.loadSections(sectionName);
            content.innerHTML = sectionHTML;
        } catch (error) {
            content.innerHTML = `<p>Error loading section: ${error.message}</p>`;
        }

        if (animate) {
            content.classList.remove("fade-exit");
            void content.offsetWidth;
            content.classList.add("fade-enter");
        }
    }
});
