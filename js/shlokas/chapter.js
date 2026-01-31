// Get chapter number from URL
const params = new URLSearchParams(window.location.search);
const chapterNumber = params.get("chapter");

// DOM elements
const titleEl = document.getElementById("chapter-title");
const subtitleEl = document.getElementById("chapter-subtitle");
const container = document.getElementById("shlokas-container");

// Basic validation
if (!chapterNumber) {
    titleEl.textContent = "Chapter not found";
    throw new Error("Chapter number missing in URL");
}

// Fetch JSON
fetch(`../../data/shlokas/chapter${chapterNumber}.json`)
    .then(res => res.json())
    .then(data => {
        // Set header
        titleEl.textContent = `Chapter ${data.chapter}`;
        subtitleEl.textContent = data.name;

        // Render shlokas
        data.shlokas.forEach(shloka => {
            const div = document.createElement("div");
            div.className = "shloka";

            div.innerHTML = `
                <div class="shloka-number">Shloka ${shloka.number}</div>
                <div class="sanskrit">${shloka.sanskrit}</div>
                <div class="hindi"><strong>Hindi:</strong> ${shloka.hindi}</div>
                <div class="english"><strong>English:</strong> ${shloka.english}</div>
            `;

            container.appendChild(div);
        });
    })
    .catch(err => {
        titleEl.textContent = "Error loading chapter";
        console.error(err);
    });

    function goBack() {
    window.history.back();

}
