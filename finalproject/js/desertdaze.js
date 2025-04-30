function getFestival() {
    let allStages = [];
    let stages = [];
    let currentIndex = 0;

    fetch("festivals.json")
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            const festival = data.find(f => f.festival === "Desert Daze 2022");
            if (!festival) {
                document.getElementById("stageName").textContent = "Festival not found";
                return;
            }

            allStages = festival.stages;
            setDay("Friday");
            document.querySelector('.dayBtn[data-day="Friday"]').classList.add("active");
            updateFavoriteButtonVisibility();
        });

    function setDay(day) {
        stages = allStages
            .map(stage => {
                const dayData = stage.days?.find(d => d.day === day);
                if (!dayData) return null;
                return {
                    name: stage.name,
                    media: dayData.media || [],
                    day: dayData.day
                };
            })
            .filter(Boolean);

        currentIndex = 0;

        if (stages.length > 0) {
            showStage(currentIndex);
        } else {
            document.getElementById("stageName").textContent = "No stages for " + day;
            document.getElementById("stageContainer").innerHTML = "";
        }
    }

    function showStage(i) {
        const stage = stages[i];
        const container = document.getElementById("stageContainer");

        container.innerHTML = `<h2 id="stageName">${stage.name}</h2>`;

        const mediaDiv = document.createElement("div");
        mediaDiv.className = "media-grid";

        stage.media.forEach(file => {
            if (file.endsWith(".mp4")) {
                const video = document.createElement("video");
                video.src = file;
                video.controls = true;
                video.loop = true;
                video.muted = true;
                video.width = 300;
                mediaDiv.appendChild(video);
            } else {
                const img = document.createElement("img");
                img.src = file;
                img.alt = stage.name;
                img.width = 300;
                mediaDiv.appendChild(img);
            }
        });

        container.appendChild(mediaDiv);
        container.appendChild(document.getElementById("favoriteBtn"));
    }

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showStage(currentIndex);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentIndex < stages.length - 1) {
            currentIndex++;
            showStage(currentIndex);
        }
    });

    document.querySelectorAll(".dayBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            setDay(btn.getAttribute("data-day"));
        });
    });

    document.getElementById("favoriteBtn").addEventListener("click", () => {
        const stageName = document.getElementById("stageName").textContent;

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (!favorites.includes(stageName)) {
            favorites.push(stageName);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(stageName + " added to favorites");
        } else {
            alert(stageName + " is already in your favorites");
        }
    });

    function updateFavoriteButtonVisibility() {
        const favoriteBtn = document.getElementById("favoriteBtn");
        if (localStorage.getItem("loggedIn") === "true") {
            favoriteBtn.style.display = "inline-block";
        } else {
            favoriteBtn.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", getFestival);
