const tbody = document.getElementById("guidance-body");

fetch("../../data/guidance/guidance.json")
    .then(res => res.json())
    .then(data => renderTable(data))
    .catch(err => {
        console.error(err);
        tbody.innerHTML = "<tr><td colspan='3'>Failed to load guidance.</td></tr>";
    });

function renderTable(data) {
    data.forEach(item => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.problem_statement.english}</td>
            <td>${item.problem_statement.hindi}</td>
            <td><button class="open-btn">Open</button></td>
        `;

        const expandRow = document.createElement("tr");
        expandRow.className = "expand-row";
        expandRow.style.display = "none";

        expandRow.innerHTML = `
            <td colspan="3">
                <div class="expand-content">

                    <h4>Category</h4>
                    <p>${item.category.english} / ${item.category.hindi}</p>

                    <h4>Context</h4>
                    <p>${item.context.english}</p>
                    <p>${item.context.hindi}</p>

                    <h4>Gita Guidance</h4>
                    <p>${item.gita_guidance.summary.english}</p>
                    <p>${item.gita_guidance.summary.hindi}</p>

                    ${item.gita_guidance.shlokas.map(s => `
                        <p><strong>Bhagavad Gita ${s.chapter}.${s.shloka}</strong></p>
                        <p>${s.english}</p>
                        <p>${s.hindi}</p>
                    `).join("")}

                    <h4>Reflection</h4>
                    <ul>
                        ${item.reflection_flow.english.map(r => `<li>${r}</li>`).join("")}
                    </ul>
                    <ul>
                        ${item.reflection_flow.hindi.map(r => `<li>${r}</li>`).join("")}
                    </ul>

                    <h4>Self Questions</h4>
                    <ul>
                        ${item.self_questions.english.map(q => `<li>${q}</li>`).join("")}
                    </ul>
                    <ul>
                        ${item.self_questions.hindi.map(q => `<li>${q}</li>`).join("")}
                    </ul>

                    <h4>Closing Note</h4>
                    <p>${item.closing_note.english}</p>
                    <p>${item.closing_note.hindi}</p>

                </div>
            </td>
        `;

        const button = row.querySelector(".open-btn");

        button.addEventListener("click", () => {
            const isOpen = expandRow.style.display === "table-row";

            // Close all other open sections (optional but premium UX)
            document.querySelectorAll(".expand-row").forEach(r => {
                r.style.display = "none";
            });
            document.querySelectorAll(".open-btn").forEach(b => {
                b.textContent = "Open";
            });

            if (!isOpen) {
                expandRow.style.display = "table-row";
                button.textContent = "Close";
            } else {
                expandRow.style.display = "none";
                button.textContent = "Open";
            }
        });


        tbody.appendChild(row);
        tbody.appendChild(expandRow);
    });
}

