const seriesId = localStorage.getItem("selectedSeries");
const series = SERIES.find(s => s.id === seriesId);

const videoWrap = document.getElementById("videoWrap");
const videoTitle = document.getElementById("videoTitle");
const videoDesc = document.getElementById("videoDesc");
const episodesList = document.getElementById("episodesList");

function loadEpisode(ep) {
    videoWrap.innerHTML = `
        <video controls src="${ep.src}" preload="metadata"></video>
    `;
    videoTitle.textContent = `${series.title} — ${ep.title}`;
    videoDesc.textContent = ep.desc;
}

function renderEpisodes() {
    series.episodes.forEach(ep => {
        const div = document.createElement("div");
        div.className = "ep";
        div.innerHTML = `
            <div class="ep-title">${ep.title}</div>
            <div class="ep-sub">${ep.duration} • ${ep.desc}</div>
        `;
        div.onclick = () => loadEpisode(ep);
        episodesList.appendChild(div);
    });
}

renderEpisodes();
if (series.episodes.length) loadEpisode(series.episodes[0]);