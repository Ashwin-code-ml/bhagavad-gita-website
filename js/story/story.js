let currentLanguage = "hindi";
let storyData = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch("../../data/story/story_all.json")
        .then(res => res.json())
        .then(data => {
            storyData = data;
            renderStory();
            setupLanguageToggle();
        })
        .catch(err => {
            console.error("Error loading story_all.json:", err);
        });
});

function renderStory() {
    const container = document.getElementById("story-container");
    container.innerHTML = "";

    const chapters = storyData[currentLanguage];

    chapters.forEach(chapter => {
        const section = document.createElement("section");
        section.className = "chapter-section";

        section.innerHTML = `
            <h2 class="chapter-title">Chapter ${chapter.chapter}</h2>
            <div class="chapter-name">${chapter.name}</div>

            <div class="chapter-story">
                ${chapter.story.map(p => `<p>${p.paragraph}</p>`).join("")}
            </div>

            <div class="chapter-explanation">
                <h4>Explanation</h4>
                ${chapter.explanation.map(e => `<p>${e}</p>`).join("")}
            </div>

            <div class="chapter-modern">
                <h4>Modern Insight</h4>
                ${chapter.modern_insight.map(m => `<p>${m}</p>`).join("")}
            </div>
        `;

        container.appendChild(section);
    });
}

function setupLanguageToggle() {
    const buttons = document.querySelectorAll(".lang-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentLanguage = btn.dataset.lang;
            renderStory();

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}

