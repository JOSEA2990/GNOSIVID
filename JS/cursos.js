const seriesGrid = document.getElementById("seriesGrid");
const cats = document.querySelectorAll(".cat-item");

function renderSeries(cat = "all") {
    seriesGrid.innerHTML = "";

    const list = (cat === "all") ? SERIES : SERIES.filter(s => s.category === cat);

    list.forEach(s => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="https://placehold.co/600x360?text=${encodeURIComponent(s.title)}">
            <h4>${s.title}</h4>
            <p>${s.description}</p>
        `;
        card.onclick = () => {
            localStorage.setItem("selectedSeries", s.id);
            location.href = "episodios.html";
        };
        seriesGrid.appendChild(card);
    });
}

cats.forEach(c => {
    c.onclick = () => {
        cats.forEach(x => x.classList.remove("active"));
        c.classList.add("active");
        renderSeries(c.dataset.cat);
    };
});

// Cargar por defecto
renderSeries();